import { GoogleGenAI } from "@google/genai";

// Check if Vite is reading the .env file
console.log("Entire env:", import.meta.env);
console.log("Gemini Key:", import.meta.env.VITE_GEMINI_API_KEY);

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Create AI only if API key exists
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
    })
  : null;

export async function generatePlan(tasks) {
  // Prevent app crash if API key is missing
  if (!ai) {
    return "⚠ Gemini API Key is not loaded. Please check your .env file.";
  }

  try {
    const prompt = `
You are an AI productivity coach.

These are the user's tasks:

${JSON.stringify(tasks, null, 2)}

Analyze the tasks and provide:

1. Which task should be completed first.
2. Which deadlines are close.
3. A smart work schedule.
4. A short motivational message.

Keep the response simple and easy to read.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "❌ Unable to generate AI suggestions.";
  }
}