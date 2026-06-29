import { useState } from "react";
import { generatePlan } from "./gemini";

function AIBox({ tasks }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function handleGenerate() {
    setLoading(true);
    const aiResult = await generatePlan(tasks);
    setResult(aiResult);
    setLoading(false);
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-6 shadow-xl mt-10">
      <h2 className="text-3xl font-bold">🤖 AI Deadline Rescue</h2>

      <p className="mt-4 text-lg">
        Your AI assistant will analyze your deadlines and generate a smart productivity plan.
      </p>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-6 bg-white text-slate-900 font-bold px-5 py-3 rounded-xl hover:bg-slate-100 disabled:opacity-60"
      >
        {loading ? "Generating..." : "✨ Generate AI Plan"}
      </button>

      <div className="mt-6 bg-white/10 rounded-xl p-5 whitespace-pre-wrap">
        <p className="text-yellow-300 font-bold">⚠ AI Analysis</p>

        <p className="mt-3">
          {loading
            ? "Gemini is analyzing your tasks..."
            : result || "Click 'Generate AI Plan' to get AI suggestions."}
        </p>
      </div>
    </div>
  );
}

export default AIBox;
