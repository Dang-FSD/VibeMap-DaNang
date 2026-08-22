import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config({ path: '../backend/.env' });

const apiKey = process.env.GROQ_API;
if (!apiKey) { console.error('No GROQ_API key found'); process.exit(1); }

const openai = new OpenAI({ apiKey, baseURL: 'https://api.groq.com/openai/v1' });

async function checkModel(modelName) {
  try {
    const res = await openai.chat.completions.create({
      model: modelName,
      messages: [{ role: "user", content: "Hi" }],
      max_tokens: 10,
    });
    console.log(`Success with model ${modelName}:`, res.choices[0].message.content);
  } catch (err) {
    console.error(`Error with model ${modelName}:`, err.message);
  }
}

async function run() {
  await checkModel('openai/gpt-oss-20b');
  await checkModel('openai/gpt-oss-120b');
}
run();
