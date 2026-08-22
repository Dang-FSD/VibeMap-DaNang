import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config({ path: '../backend/.env' });

const isGroq = !!process.env.GROQ_API;
const apiKey = process.env.GROQ_API || process.env.OPENAI_API_KEY || 'dummy_key';
const baseURL = isGroq ? 'https://api.groq.com/openai/v1' : (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1');

console.log('apiKey length:', apiKey ? apiKey.length : 'undefined', 'isGroq:', isGroq, 'baseURL:', baseURL);

if (apiKey !== 'dummy_key') {
  const openai = new OpenAI({ apiKey, baseURL });
  openai.chat.completions.create({
    model: isGroq ? 'llama-3.3-70b-versatile' : (process.env.AI_MODEL || "gpt-3.5-turbo"),
    messages: [{ role: "user", content: "Hello" }],
    max_tokens: 10,
  }).then(res => console.log('Success:', res.choices[0].message.content))
    .catch(err => console.error('Error:', err.message));
} else {
  console.log('Using dummy_key');
}
