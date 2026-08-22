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
      model: isGroq ? 'llama3-70b-8192' : (process.env.AI_MODEL || "gpt-3.5-turbo"),
      messages: [systemPrompt, ...messages],
      max_tokens: 250,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error with AI Chat:', error);
    return "Xin lỗi, hiện tại tôi đang gặp chút sự cố khi kết nối mạng. Bạn thử lại sau nhé!";
  }
};

export const generateAIItinerary = async (vibes, durationDays, budgetVND, preferences) => {
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

  const systemPrompt = `
[Vai trò của bạn]
Bạn là bộ não gợi ý cốt lõi của VibeMap - một chuyên gia thiết kế lịch trình du lịch bản địa sắc sảo, chuyên sâu về Đà Nẵng, Hội An và Huế. Kiến thức của bạn vượt ra khỏi những điểm du lịch đại trà; bạn am hiểu tường tận các "hidden gems" (viên ngọc ẩn), các quán cafe ngách, kiến trúc đặc thù, quán ăn địa phương và các địa điểm có tính thẩm mỹ cao.

[Nhiệm vụ]
Người dùng sẽ cung cấp các "Vibe Tags", "Số ngày" (Duration), "Ngân sách chính xác" (Budget), và các "Sở thích cá nhân" (Preferences).
Bạn phải tạo ra một lịch trình chi tiết, hợp lý về mặt địa lý, tuân thủ NGHIÊM NGẶT ngân sách, độ tuổi, người đi cùng, và khớp 100% với Vibe đó.

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
          "description": "Lý do khớp vibe, sở thích và ngân sách",
          "category": "Cafe | Nature | Architecture | Food | Culture",
          "estimated_cost": "Số tiền dự kiến (VD: 150.000 VNĐ)",
          "coordinates": [16.0544, 108.2022]
        }
      ]
    }
  ]
}
`;

  const formattedBudget = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(budgetVND);
  const userPrompt = `Tạo lịch trình ${durationDays} ngày. Ngân sách BẮT BUỘC MỖI NGÀY LÀ: ${formattedBudget}. Vibe tags: ${vibes.join(', ')}. Sở thích cá nhân: ${prefsText}. Hãy xuất ra JSON thuần túy.`;

  try {
    const response = await openai.chat.completions.create({
      model: isGroq ? 'llama3-70b-8192' : (process.env.AI_MODEL || "gpt-3.5-turbo"),
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" }, // Ensures valid JSON response
      max_tokens: 8000,
      temperature: 0.7,
    });

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
