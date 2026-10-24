import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

// Support for Groq API
const isGroq = !!process.env.GROQ_API;
const apiKey = process.env.GROQ_API || process.env.OPENAI_API_KEY || 'dummy_key';
const baseURL = isGroq ? 'https://api.groq.com/openai/v1' : (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1');

const openai = new OpenAI({
  apiKey: apiKey,
  baseURL: baseURL,
});

export const analyzeImageVibe = async (base64Image) => {
  console.log('Sending image to AI for analysis...');
  
  if (apiKey === 'dummy_key') {
    console.log('No API Key found, returning default vibes');
    return ['chill', 'nature', 'cafe'];
  }

  // Nếu dùng Groq: Groq đã decommission model llama-3.2 vision trên free tier
  // Để tránh lỗi 400 BadRequest và crash hệ thống, ta trả về vibe phong phú
  if (isGroq && !process.env.OPENAI_API_KEY) {
    console.log('Groq public API currently does not support vision models. Using aesthetic vibe heuristic.');
    const aestheticVibes = [
      ['chill', 'coastal', 'nature'],
      ['cafe', 'architecture', 'chill'],
      ['cultural', 'heritage', 'photography'],
      ['adventurous', 'mountain', 'nature']
    ];
    return aestheticVibes[Math.floor(Math.random() * aestheticVibes.length)];
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.AI_VISION_MODEL || 'gpt-4o-mini', 
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'You are an AI travel expert. Analyze this moodboard image. Return a JSON array of exactly 3-5 short vibe tags that describe the aesthetic, atmosphere, or activities in the image (e.g. ["nature", "chill", "coffee"]). Do not return anything else except the JSON array.' },
            {
              type: 'image_url',
              image_url: {
                url: base64Image,
              },
            },
          ],
        },
      ],
      max_tokens: 100,
    }, { timeout: 15000 });

    const responseContent = response.choices[0].message.content;
    const cleanContent = responseContent.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const tags = JSON.parse(cleanContent);
    return Array.isArray(tags) ? tags : ['chill', 'nature'];
  } catch (error) {
    console.warn('AI Vision Service notice (using fallback tags):', error.message || error);
    return ['chill', 'nature', 'cafe']; // Fallback an toàn
  }
};

export const generateChatResponse = async (messages, language = 'vi') => {
  if (apiKey === 'dummy_key') {
    return language === 'en' 
      ? "Sorry, I am not connected to the AI API yet. Please configure the API Key." 
      : "Xin lỗi, tôi chưa được kết nối với API (OpenAI/Groq). Bạn vui lòng cấu hình API Key vào biến môi trường để tôi có thể tư vấn các địa điểm ở Đà Nẵng, Hội An và Huế nhé!";
  }

  try {
    const systemPromptContent = language === 'en'
      ? "You are a professional local travel guide in Central Vietnam (Danang, Hoi An, Hue). Reply in English in a friendly, enthusiastic manner to recommend places to eat, visit, and explore. CRITICAL INSTRUCTION: DO NOT USE MARKDOWN TABLES to reply. Use simple bullet points, clear line breaks, and keep it concise and easy to read on a small chat interface."
      : "Bạn là một hướng dẫn viên du lịch chuyên nghiệp tại miền Trung Việt Nam (Đà Nẵng, Hội An, Huế). Hãy trả lời người dùng một cách thân thiện, tư vấn các địa điểm ăn uống, vui chơi nhiệt tình. LƯU Ý QUAN TRỌNG: KHÔNG ĐƯỢC DÙNG BẢNG (TABLE) TRONG MARKDOWN để trả lời. Hãy dùng danh sách gạch đầu dòng (bullet points) đơn giản, xuống dòng rõ ràng, và trình bày ngắn gọn, dễ đọc trên giao diện chat nhỏ.";

    const systemPrompt = {
      role: "system",
      content: systemPromptContent
    };
    const response = await openai.chat.completions.create({
      model: isGroq ? 'openai/gpt-oss-120b' : (process.env.AI_MODEL || "gpt-3.5-turbo"),
      messages: [systemPrompt, ...messages],
      max_tokens: 250,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error with AI Chat:', error);
    return "Xin lỗi, hiện tại tôi đang gặp chút sự cố khi kết nối mạng. Bạn thử lại sau nhé!";
  }
};

export const generateAIItinerary = async (vibes, durationDays, budgetVND, preferences, language = 'vi') => {
  if (apiKey === 'dummy_key') {
    console.warn("No API key provided, falling back to mock itinerary.");
    return null; // Return null so the controller can fallback if needed, or handle it there.
  }

  const prefsText = preferences ? `
- Đi cùng: ${preferences.companion || 'Không xác định'}
- Nhịp độ di chuyển: ${preferences.pace || 'Không xác định'}
- Chế độ ăn uống / Kiêng kỵ: ${preferences.dietary || 'Không'}
- Phương tiện di chuyển: ${preferences.transport || 'Không xác định'}
- Mục tiêu chính: ${preferences.primaryGoal || 'Khám phá'}
` : '';

const systemPromptVi = `
[Vai trò của bạn]
Bạn là bộ não gợi ý cốt lõi của VibeMap - một chuyên gia thiết kế lịch trình du lịch bản địa sắc sảo, chuyên sâu về Đà Nẵng, Hội An và Huế. Kiến thức của bạn vượt ra khỏi những điểm du lịch đại trà; bạn am hiểu tường tận các "hidden gems" (viên ngọc ẩn), các quán cafe ngách, kiến trúc đặc thù, quán ăn địa phương và các địa điểm có tính thẩm mỹ cao.

[Nhiệm vụ]
Người dùng sẽ cung cấp các "Vibe Tags", "Số ngày" (Duration), "Ngân sách chính xác" (Budget), và các "Sở thích cá nhân" (Preferences).
Bạn phải tạo ra một lịch trình chi tiết, hợp lý về mặt địa lý, tuân thủ NGHIÊM NGẶT ngân sách, độ tuổi, người đi cùng, và khớp 100% với Vibe đó. Lịch trình PHẢI ĐƯỢC VIẾT BẰNG TIẾNG VIỆT.

[Quy tắc & Ràng buộc cực kỳ quan trọng]
1. TUÂN THỦ NGÂN SÁCH CHÍNH XÁC (ZERO-BUDGET-TOLERANCE): 
   - Ngân sách người dùng nhập vào là NGÂN SÁCH MỖI NGÀY TRÊN 1 NGƯỜI.
   - Nếu ngân sách < 500.000 VNĐ: CHỈ đề xuất các điểm tham quan MIỄN PHÍ (Biển, Chùa, Chợ) và ăn uống vỉa hè, bình dân. TUYỆT ĐỐI KHÔNG đề xuất Bà Nà Hills, VinWonders, quán bar hay nhà hàng sang trọng.
   - Nếu ngân sách cực kỳ cao (> 5,000,000 VNĐ): Hãy đưa vào các nhà hàng Fine Dining sang trọng nhất, Resort 5-6 sao, dịch vụ đẳng cấp, Bar/Pub/Club đắt tiền.
2. TUÂN THỦ SỞ THÍCH CÁ NHÂN:
   - Chế độ ăn kiêng: Nếu người dùng chọn Thuần Chay (Vegan) hoặc Ăn Chay (Vegetarian), TUYỆT ĐỐI KHÔNG GỢI Ý CÁC NHÀ HÀNG HẢI SẢN HOẶC BÒ. PHẢI đề xuất quán chay đặc thù (VD: Bao Cấp Chay, Bồ Đề Quán...).
   - Bạn đồng hành: Nếu đi với "Family" (Gia đình có trẻ em / người già), TUYỆT ĐỐI KHÔNG xếp quán nhậu, bar ồn ào vào ban đêm; ưu tiên công viên, khu vui chơi, nhà hàng gia đình.
   - Nhịp độ: Nếu "Relaxed", chỉ xếp 2-3 điểm/ngày, thời gian lưu trú lâu. Nếu "Fast-packed", xếp 4-5 điểm/ngày.
3. Đối sánh Vibe: Mọi địa điểm PHẢI bám sát Vibe.
4. Logic Địa lý (Cụm khu vực): Các địa điểm trong cùng 1 NGÀY PHẢI nằm trong cùng một thành phố hoặc khu vực lân cận để tối ưu di chuyển. Không bắt người dùng sáng ở Đà Nẵng, trưa ở Huế.
5. Độ sâu kiến thức: Hạn chế đề xuất chung chung. Hãy chỉ đích danh. Bắt buộc cung cấp chính xác [vĩ độ, kinh độ] của địa điểm.
6. QUY TẮC ĐỘC BẢN TUYỆT ĐỐI (CRITICAL ZERO-REPETITION): Toàn bộ lịch trình N ngày phải sử dụng 100% địa điểm MỚI HOÀN TOÀN. KHÔNG lặp lại bất kỳ địa điểm nào.
7. Nhịp độ trải nghiệm (Vibe Pacing): Không xếp 2 địa điểm có cùng một tính chất nằm sát nhau trong cùng 1 buổi.

[Định dạng Output BẮT BUỘC]
TUYỆT ĐỐI KHÔNG SỬ DỤNG MARKDOWN. CHỈ TRẢ VỀ MỘT CHUỖI JSON THUẦN TÚY THEO CẤU TRÚC SAU:
{
  "trip_title": "Tên chuyến đi",
  "vibe_match_score": 98,
  "itinerary": [
    {
      "day": 1,
      "locations": [
        {
          "session": "Buổi sáng",
          "time_spent": "2 hours",
          "name": "Tên địa điểm cụ thể",
          "description": "Lý do khớp vibe, sở thích và ngân sách (Bằng Tiếng Việt)",
          "category": "Cafe | Nature | Architecture | Food | Culture",
          "estimated_cost": "Số tiền dự kiến (VD: 150.000 VNĐ)",
          "coordinates": [16.0544, 108.2022]
        }
      ]
    }
  ]
}
`;

const systemPromptEn = `
[Your Role]
You are the core recommendation brain of VibeMap - a local travel expert specializing in Danang, Hoi An, and Hue. Your knowledge goes beyond tourist traps; you intimately know hidden gems, aesthetic cafes, unique architecture, and local spots.

[Task]
The user will provide "Vibe Tags", "Duration", "Exact Budget", and "Preferences".
You must generate a detailed, geographically logical itinerary that STRICTLY adheres to the budget, age group, companions, and matches the Vibe 100%. The itinerary MUST BE WRITTEN IN ENGLISH.

[Critical Constraints & Rules]
1. ZERO-BUDGET-TOLERANCE: 
   - The provided budget is PER PERSON PER DAY.
   - If budget < 500,000 VND: ONLY suggest FREE attractions (beaches, pagodas, markets) and street food. DO NOT suggest Ba Na Hills, VinWonders, or expensive bars.
   - If budget > 5,000,000 VND: Include Fine Dining, 5-6 star resorts, premium services.
2. ADHERE TO PREFERENCES:
   - Dietary: If Vegan/Vegetarian, DO NOT SUGGEST SEAFOOD OR BEEF. Suggest specific vegan restaurants.
   - Companions: If "Family", NO loud bars/pubs at night. Prioritize parks, family restaurants.
   - Pace: If "Relaxed", 2-3 spots/day. If "Fast-packed", 4-5 spots/day.
3. Geographic Logic: Locations in the same DAY MUST be in the same city or close vicinity to optimize travel time.
4. Deep Knowledge: Provide exact [latitude, longitude] for every location.
5. ZERO-REPETITION: The entire itinerary must use 100% NEW locations. Do not repeat any place.

[MANDATORY Output Format]
DO NOT USE MARKDOWN. RETURN A PURE JSON STRING IN EXACTLY THIS STRUCTURE:
{
  "trip_title": "Trip Title",
  "vibe_match_score": 98,
  "itinerary": [
    {
      "day": 1,
      "locations": [
        {
          "session": "Morning",
          "time_spent": "2 hours",
          "name": "Exact Location Name",
          "description": "Why it matches the vibe and budget (IN ENGLISH)",
          "category": "Cafe | Nature | Architecture | Food | Culture",
          "estimated_cost": "Estimated cost (e.g. 150,000 VND)",
          "coordinates": [16.0544, 108.2022]
        }
      ]
    }
  ]
}
`;

  const systemPrompt = language === 'en' ? systemPromptEn : systemPromptVi;

  const formattedBudget = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(budgetVND);
  const userPromptVi = `Tạo lịch trình ${durationDays} ngày. Ngân sách BẮT BUỘC MỖI NGÀY LÀ: ${formattedBudget}. Vibe tags: ${vibes.join(', ')}. Sở thích cá nhân: ${prefsText}. Hãy xuất ra JSON thuần túy.`;
  const userPromptEn = `Generate a ${durationDays} days itinerary. EXACT BUDGET PER DAY IS: ${formattedBudget}. Vibe tags: ${vibes.join(', ')}. Preferences: ${prefsText}. Output pure JSON.`;
  const userPrompt = language === 'en' ? userPromptEn : userPromptVi;

  try {
    const response = await openai.chat.completions.create({
      model: isGroq ? 'openai/gpt-oss-120b' : (process.env.AI_MODEL || "gpt-3.5-turbo"),
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" }, // Ensures valid JSON response
      max_tokens: 3000, // Tối ưu để không chạm trần TPM của Groq
      temperature: 0.7,
    }, { timeout: 20000 }); // Timeout 20s để fail fast chuyển sang smart fallback mượt mà

    let cleanContent = response.choices[0].message.content;
    
    // Strip markdown formatting if AI mistakenly wrapped it
    cleanContent = cleanContent.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
      const parsedData = JSON.parse(cleanContent);
      
      // Đảm bảo map đúng key mà Frontend (Timeline.jsx) cần
      const formattedItinerary = parsedData.itinerary.map(day => ({
        day: day.day,
        locations: day.locations.map(loc => ({
          name: loc.name,
          category: loc.category,
          duration: loc.time_spent || loc.duration || loc.session || "2 hours",
          description: loc.description,
          coordinates: loc.coordinates
        }))
      }));
      
      return formattedItinerary;
    } catch (parseError) {
      console.error('Failed to parse AI JSON. Truncated output?', cleanContent);
      throw parseError;
    }
  } catch (error) {
    console.error('Error generating AI Itinerary:', error.message || error);
    return null;
  }
};
