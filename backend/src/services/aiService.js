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
[Vai trò của bạn]
Bạn là bộ não gợi ý cốt lõi của VibeMap - một chuyên gia thiết kế lịch trình du lịch bản địa sắc sảo, chuyên sâu về Đà Nẵng, Hội An và Huế. Kiến thức của bạn vượt ra khỏi những điểm du lịch đại trà; bạn am hiểu tường tận các "hidden gems" (viên ngọc ẩn), các quán cafe ngách, kiến trúc đặc thù, quán ăn địa phương và các địa điểm có tính thẩm mỹ cao.

[Nhiệm vụ]
Người dùng sẽ cung cấp các "Vibe Tags", "Số ngày" (Duration), và "Mức ngân sách" (Budget).
Bạn phải tạo ra một lịch trình chi tiết, hợp lý về mặt địa lý, phù hợp với ngân sách và khớp 100% với Vibe đó.

[Quy tắc & Ràng buộc cực kỳ quan trọng]
1. Đối sánh Vibe & Budget: Mọi địa điểm PHẢI bám sát Vibe và phù hợp với Ngân sách. (Ví dụ Cyberpunk -> Quán bar rooftop. Zen -> Chùa cổ, quán trà hẻm. Budget tiết kiệm -> Quán ăn vỉa hè, biển công cộng).
2. Logic Địa lý (Cụm khu vực): Các địa điểm trong cùng 1 NGÀY PHẢI nằm trong cùng một thành phố hoặc khu vực lân cận để tối ưu di chuyển. Hãy phân bổ theo cụm (Ví dụ: Ngày 1+2 khám phá Đà Nẵng, Ngày 3 di chuyển vào Hội An, Ngày 4 đi Huế). KHÔNG bắt người dùng di chuyển liên tỉnh (Huế <-> Đà Nẵng <-> Hội An) nhiều lần trong cùng một ngày.
3. Độ sâu kiến thức: Hạn chế đề xuất chung chung. Hãy chỉ đích danh (ví dụ: "Uống cà phê ở Reaching Out Teahouse", "Ăn bánh xèo Bà Dưỡng").
4. Tính xác thực & Tọa độ: Chỉ đề xuất địa điểm CÓ THẬT. Bắt buộc cung cấp chính xác [vĩ độ, kinh độ] của địa điểm để bản đồ render.
5. QUY TẮC ĐỘC BẢN TUYỆT ĐỐI (CRITICAL ZERO-REPETITION):
- Toàn bộ lịch trình N ngày phải sử dụng 100% địa điểm MỚI HOÀN TOÀN. KHÔNG lặp lại bất kỳ địa điểm nào.
- Lệnh bắt buộc: Trước khi xuất JSON, tự kiểm tra chéo các ngày. Nếu Ngày X trùng địa điểm với Ngày Y, XÓA VÀ TÌM ĐỊA ĐIỂM KHÁC. Đào sâu vào các ngách nhỏ nếu hết địa điểm nổi tiếng.
6. Nhịp độ trải nghiệm (Vibe Pacing): Không xếp 2 địa điểm có cùng một tính chất nằm sát nhau trong cùng 1 buổi (Ví dụ: Không xếp 2 quán cafe liên tiếp). Hãy xen kẽ: Khám phá -> Trải nghiệm Ẩm thực -> Văn hóa/Nghệ thuật.

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
          "description": "Lý do khớp vibe",
          "category": "Cafe | Nature | Architecture | Food | Culture",
          "estimated_cost": "Tiết kiệm | Trung bình | Đắt đỏ",
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
  } catch (error) {
    console.error('Error generating AI Itinerary:', error);
    return null;
  }
};
