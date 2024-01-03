require("dotenv").config();
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.GEMINI_KEY;

async function runGemini(str) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.8,
    topK: 1,
    topP: 0.5,
    maxOutputTokens: 64,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ];

  const parts = [
    {
      text:
        `consider a message conversation between two people A and B. Predict what B's next message will be. Limit your response to just one line of text.\n\nConversation:\nA: Hi\nA: hello??\nQuestion: Predict what B will say\nAnswer: Hello there! sorry, I was busy \n\nConversation:\nA: hey, did you see the movie I recommended you?\nB: Nope, will definitely see it tomorrow though\nQuestion: Predict what B will say\nAnswer: Or maybe next Sunday\n\nConversation:\n: hey \nB: hello?\nB: You wanna reply back?\nQuestion: Predict what B will say\nAnswer: Yo, you ignoring me or something?\n\nConversation:\n${str}`,
    },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;
  return response.text();
}

module.exports = { runGemini };
