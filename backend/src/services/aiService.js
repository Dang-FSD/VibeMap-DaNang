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

  try {
    const response = await openai.chat.completions.create({
      model: isGroq ? 'llama-3.2-11b-vision-preview' : (process.env.AI_MODEL || 'gpt-4o'), 
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
    });

    const responseContent = response.choices[0].message.content;
    const cleanContent = responseContent.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const tags = JSON.parse(cleanContent);
    return Array.isArray(tags) ? tags : ['chill', 'nature'];
  } catch (error) {
    console.error('AI Service Error:', error);
    return ['chill', 'nature', 'cafe']; // Fallback
  }
};

export const generateChatResponse = async (messages) => {
  if (apiKey === 'dummy_key') {
    return "Xin lỗi, tôi chưa được kết nối với API (OpenAI/Groq). Bạn vui lòng cấu hình API Key vào biến môi trường để tôi có thể tư vấn các địa điểm ở Đà Nẵng, Hội An và Huế nhé!";
  }

  try {
    const systemPrompt = {
      role: "system",
      content: "Bạn là một hướng dẫn viên du lịch chuyên nghiệp tại miền Trung Việt Nam. Chuyên tư vấn du lịch Đà Nẵng, Hội An (Quảng Nam), và Thừa Thiên Huế. Trả lời ngắn gọn, thân thiện, súc tích bằng tiếng Việt."
    };
    const response = await openai.chat.completions.create({
      model: isGroq ? 'llama-3.3-70b-versatile' : (process.env.AI_MODEL || "gpt-3.5-turbo"),
      messages: [systemPrompt, ...messages],
      max_tokens: 250,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error with AI Chat:', error);
    return "Xin lỗi, hiện tại tôi đang gặp chút sự cố khi kết nối mạng. Bạn thử lại sau nhé!";
  }
};

export const generateAIItinerary = async (vibes, durationDays, budgetLevel) => {
  if (apiKey === 'dummy_key') {
    console.warn("No API key provided, falling back to mock itinerary.");
    return null; // Return null so the controller can fallback if needed, or handle it there.
  }

  const systemPrompt = `
Bạn là bộ não gợi ý cốt lõi của VibeMap - một chuyên gia thiết kế lịch trình du lịch bản địa sắc sảo, chuyên sâu về Đà Nẵng, Hội An và Huế. Kiến thức của bạn vượt ra khỏi những điểm du lịch đại trà; bạn am hiểu tường tận các "hidden gems" (viên ngọc ẩn), các quán cafe ngách, kiến trúc đặc thù, quán ăn địa phương và các địa điểm có tính thẩm mỹ cao.

[Nhiệm vụ]
Người dùng sẽ cung cấp các "Vibe Tags", số ngày (Duration), và mức ngân sách (Budget).
Bạn phải tạo ra một lịch trình chi tiết, hợp lý về mặt địa lý và khớp 100% với Vibe đó.

[Quy tắc & Ràng buộc cực kỳ quan trọng]
1. Đối sánh Vibe: Mọi địa điểm PHẢI bám sát Vibe. (Ví dụ Cyberpunk/Neon -> Cầu lên đèn, quán bar rooftop. Zen/Historic -> Lăng tẩm, chùa cổ, quán trà hẻm).
2. Logic Địa lý: Các địa điểm trong cùng 1 buổi/ngày PHẢI nằm gần nhau. Không đề xuất sáng Sơn Trà, trưa Hội An, chiều đèo Hải Vân.
3. Độ sâu kiến thức: Hạn chế đề xuất chung chung. Hãy chỉ đích danh (ví dụ: "Uống cà phê ở Reaching Out Teahouse").
4. Tính xác thực: Chỉ đề xuất địa điểm CÓ THẬT tại Đà Nẵng, Hội An, Huế.
5. Toạ độ (Coordinates): AI phải ước lượng hoặc cung cấp chính xác [vĩ độ, kinh độ] của địa điểm để bản đồ render.

[Định dạng Output BẮT BUỘC (Chỉ trả về JSON, không Markdown, không giải thích)]
{
  "trip_title": "Tên chuyến đi",
  "vibe_match_score": 98,
  "itinerary": [
    {
      "day": 1,
      "locations": [
        {
          "duration": "Buổi sáng",
          "name": "Tên địa điểm cụ thể",
          "description": "Lý do khớp vibe",
          "category": "Cafe | Nature | Architecture | Food",
          "coordinates": [16.0544, 108.2022]
        }
      ]
    }
  ]
}
`;

  const userPrompt = `Tạo lịch trình ${durationDays} ngày. Ngân sách: Mức ${budgetLevel} (1=Tiết kiệm, 2=Trung bình, 3=Sang chảnh). Vibe tags: ${vibes.join(', ')}. Hãy xuất ra JSON.`;

  try {
    const response = await openai.chat.completions.create({
      model: isGroq ? 'llama-3.3-70b-versatile' : (process.env.AI_MODEL || "gpt-3.5-turbo"),
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" }, // Ensures valid JSON response
      max_tokens: 2000,
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;
    const parsedData = JSON.parse(content);
    return parsedData.itinerary;
  } catch (error) {
    console.error('Error generating AI Itinerary:', error);
    return null;
  }
};
