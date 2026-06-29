import { GoogleGenAI } from "@google/genai";

// Temporary debug version
console.log("Gemini Test Started");

const ai = new GoogleGenAI({
  apiKey: "AQ.Ab8RN6LtX99_jUQSaEDZGtvDR9Z2wxG9ljx9rNdR-PHiqk9HQQ",
});

export async function generatePlan(tasks) {
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