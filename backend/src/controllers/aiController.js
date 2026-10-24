import { analyzeImageVibe, generateChatResponse, generateAIItinerary } from '../services/aiService.js';
import { generateItinerary as generateMockItinerary } from '../services/matchingService.js';
import { securityLog } from '../middleware/securityLogger.js';

// Base64 Data URI pattern (Chống SSRF - OWASP A10)
const BASE64_IMAGE_REGEX = /^data:image\/(png|jpeg|jpg|webp);base64,[A-Za-z0-9+/=]+$/;

export const analyzeImage = async (req, res) => {
  try {
    const { image, duration, durationDays, budgetVND, mood, preferences, language } = req.body;
    
    // Đảm bảo kiểu số hợp lệ (Chống DoS / Overflow)
    const finalDuration = Math.min(Math.max(parseInt(durationDays || duration || 3, 10), 1), 30);
    const finalBudget = Math.min(Math.max(parseInt(budgetVND || 1500000, 10), 0), 100000000);

    // 1. Phân tích Vibe với kiểm tra chống SSRF
    let vibes = [];
    if (image && typeof image === 'string') {
      // Chỉ cho phép base64 data URI chuẩn, cấm tuyệt đối URL http/https để chống SSRF
      if (BASE64_IMAGE_REGEX.test(image)) {
        try {
          vibes = await analyzeImageVibe(image);
        } catch (e) {
          console.warn('Vibe analysis failed, using mood:', e.message);
        }
      } else {
        securityLog('SSRF_ATTEMPT_OR_INVALID_IMAGE_URL', req, { preview: image.substring(0, 50) });
        console.warn('Invalid image format detected (SSRF protection activated). Discarding image.');
      }
    }
    
    // Nếu có chọn mood thủ công, đưa lên đầu ưu tiên
    if (mood && typeof mood === 'string') {
      const sanitizedMood = mood.toLowerCase().replace(/[^a-z]/g, '');
      if (sanitizedMood && !vibes.includes(sanitizedMood)) {
        vibes.unshift(sanitizedMood);
      }
    }
    
    if (vibes.length === 0) {
      vibes = ['chill']; // Fallback cơ bản
    }
    
    // 2. Thử tạo lịch trình bằng LLM AI
    let itinerary = null;
    try {
      itinerary = await generateAIItinerary(vibes, finalDuration, finalBudget, preferences, language || 'vi');
    } catch (aiErr) {
      console.warn("AI generation failed, fallback engine will handle it:", aiErr.message);
    }
    
    // 3. Nếu AI quá tải / 429 / timeout -> Tự động chuyển giao sang thuật toán phân tích địa phương
    if (!itinerary || !Array.isArray(itinerary) || itinerary.length === 0) {
      console.log("Using smart local itinerary matching engine for vibes:", vibes);
      itinerary = await generateMockItinerary(vibes, finalDuration, finalBudget);
    }

    res.json({ vibes, itinerary });
  } catch (error) {
    console.error('Critical Error in analyzeImage (recovering with smart local engine):', error);
    try {
      const fallback = await generateMockItinerary(['chill'], 3, 1500000);
      return res.json({ vibes: ['chill'], itinerary: fallback });
    } catch (finalError) {
      res.status(500).json({ message: 'Không thể tạo lịch trình vào lúc này' });
    }
  }
};

// OWASP A03 (Injection) & A04 (Insecure Design) Protection for AI Chat
export const chat = async (req, res) => {
  try {
    const { messages, language } = req.body;

    // Input Validation
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: 'Danh sách tin nhắn không hợp lệ' });
    }

    // Giới hạn tối đa 20 tin nhắn trong lịch sử chat để tránh cạn kiệt bộ nhớ / token
    const sanitizedMessages = messages.slice(-20).map(m => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content || '').substring(0, 1000) // Tối đa 1000 ký tự mỗi tin nhắn
    })).filter(m => m.content.trim().length > 0);

    if (sanitizedMessages.length === 0) {
      return res.status(400).json({ message: 'Nội dung tin nhắn không được để trống' });
    }

    const safeLang = (language === 'en') ? 'en' : 'vi';

    const reply = await generateChatResponse(sanitizedMessages, safeLang);
    res.json({ reply });
  } catch (error) {
    console.error('Error in chat:', error);
    res.status(500).json({ message: 'Xin lỗi, không thể xử lý tin nhắn lúc này' });
  }
};
