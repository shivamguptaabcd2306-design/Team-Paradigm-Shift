import { GoogleGenAI } from "@google/genai";

let client = null;

function getClient() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set. Add your GEMINI_API_KEY in backend/.env.");
  }
  if (!client) {
    client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return client;
}

/**
 * Calls the Google Gemini API and returns the generated text content.
 * @param {string} systemPrompt
 * @param {{role: 'user'|'assistant', content: string}[]} messages
 * @returns {Promise<string>}
 */
export async function callGemini(systemPrompt, messages) {
  const ai = getClient();
  const model = process.env.GEMINI_MODEL || "gemini-flash-lite-latest";

  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const response = await ai.models.generateContent({
    model,
    contents,
    config: {
      systemInstruction: systemPrompt,
    },
  });

  const text = response.text ? response.text.trim() : "";

  if (!text) throw new Error("Empty response from Gemini AI service");
  return text;
}
