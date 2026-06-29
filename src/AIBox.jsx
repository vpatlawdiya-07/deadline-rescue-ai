import { useState } from "react";
import { generatePlan } from "./gemini";

function AIBox({ tasks }) {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("");

  async function handleGenerate() {
    setLoading(true);

    const result = await generatePlan(tasks);

    setPlan(result);
    setLoading(false);
  }

  return (
    <div className="mt-10">

      {/* Main Card */}
      <div className="rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600">

        {/* Header */}
        <div className="p-8">

          <h2 className="text-5xl font-extrabold text-white flex items-center gap-3">
            🤖 AI Deadline Rescue
          </h2>

          <p className="text-blue-100 text-xl mt-3">
            Your personal AI productivity coach powered by Gemini.
          </p>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-5 mt-8">

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">
              <p className="text-blue-100 text-sm">
                Total Tasks
              </p>

              <h3 className="text-4xl font-bold text-white mt-2">
                {tasks.length}
              </h3>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">
              <p className="text-blue-100 text-sm">
                Pending
              </p>

              <h3 className="text-4xl font-bold text-yellow-300 mt-2">
                {tasks.filter(task => !task.completed).length}
              </h3>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">
              <p className="text-blue-100 text-sm">
                Completed
              </p>

              <h3 className="text-4xl font-bold text-green-300 mt-2">
                {tasks.filter(task => task.completed).length}
              </h3>
            </div>

          </div>

          {/* Button */}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-8 bg-white text-blue-700 font-bold text-lg px-8 py-4 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300"
          >
            {loading ? "⏳ Generating..." : "✨ Generate AI Plan"}
          </button>

        </div>

        {/* AI Output */}

        <div className="px-8 pb-8">

          <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8">

            <div className="flex items-center gap-3">

              <span className="text-4xl">
                🧠
              </span>

              <div>

                <h3 className="text-3xl font-bold text-yellow-300">
                  AI Productivity Coach
                </h3>

                <p className="text-white/80">
                  Personalized suggestions powered by Gemini AI
                </p>

              </div>

            </div>

            {/* Loading */}

            {loading && (

              <div className="mt-10 flex flex-col items-center">

                <div className="w-14 h-14 border-4 border-white border-t-yellow-300 rounded-full animate-spin"></div>

                <p className="mt-6 text-white text-lg">
                  Gemini is thinking...
                </p>

              </div>

            )}

            {/* Empty */}

            {!loading && !plan && (

              <div className="mt-10">

                <div className="rounded-2xl bg-white/10 p-8">

                  <h3 className="text-2xl font-bold text-white">
                    🚀 Ready to boost your productivity?
                  </h3>

                  <p className="mt-4 text-lg text-white/80 leading-8">
                    Click the button above and Gemini will analyze all your
                    tasks, prioritize deadlines, create a smart study schedule,
                    and motivate you to finish on time.
                  </p>

                </div>

              </div>

            )}

            {/* Result */}

            {!loading && plan && (

              <div className="mt-8">

                <div className="rounded-2xl bg-slate-900/40 p-8 max-h-[500px] overflow-y-auto">

                  <pre className="whitespace-pre-wrap text-white text-lg leading-9 font-sans">
                    {plan}
                  </pre>

                </div>

                {/* Footer */}

                <div className="mt-6 flex justify-between items-center text-sm text-white/70">

                  <span>
                    ⚡ Powered by Gemini 2.5 Flash
                  </span>

                  <span>
                    ✓ AI Analysis Completed
                  </span>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default AIBox;