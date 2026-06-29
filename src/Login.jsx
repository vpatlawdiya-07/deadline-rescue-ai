import { login } from "./auth";

function Login() {
  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center">
      <div className="bg-slate-900 p-10 rounded-xl shadow-lg text-center w-[400px]">

        <h1 className="text-4xl font-bold text-blue-400 mb-4">
          🚀 Deadline Rescue AI
        </h1>

        <p className="text-slate-400 mb-8">
          AI-powered productivity companion
        </p>

        <button
          onClick={login}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
        >
          Sign in with Google
        </button>

      </div>
    </div>
  );
}

export default Login;