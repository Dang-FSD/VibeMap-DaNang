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
      model: isGroq ? 'llama-3.2-90b-vision-preview' : (process.env.AI_MODEL || 'gpt-4o'), 
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
      model: isGroq ? 'llama3-8b-8192' : (process.env.AI_MODEL || "gpt-3.5-turbo"),
      messages: [systemPrompt, ...messages],
      max_tokens: 250,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error with AI Chat:', error);
    return "Xin lỗi, hiện tại tôi đang gặp chút sự cố khi kết nối mạng. Bạn thử lại sau nhé!";
  }
};
