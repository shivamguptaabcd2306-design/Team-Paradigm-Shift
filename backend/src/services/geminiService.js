import { GoogleGenAI } from "@google/genai";

let client = null;

function getClient() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set. Add your GEMINI_API_KEY in backend/.env.");
  }
  if (!client) {
    client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});
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

  // Skip leading assistant-only turns (UI intro) so Gemini receives the user's prompt first.
  // Remaining history, including later assistant replies, is preserved for context.
  let start = 0;
  while (start < messages.length && messages[start].role === "assistant") {
    start += 1;
  }
  const usable = messages.slice(start).filter((m) => typeof m.content === "string" && m.content.trim());
  if (!usable.some((m) => m.role === "user")) {
    throw new Error("No user prompt to send to Gemini");
  }

  const contents = [];
  for (const m of usable) {
    const role = m.role === "assistant" ? "model" : "user";
    if (contents.length > 0 && contents[contents.length - 1].role === role) {
      contents[contents.length - 1].parts.push({ text: m.content });
    } else {
      contents.push({
        role,
        parts: [{ text: m.content }],
      });
    }
  }

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
