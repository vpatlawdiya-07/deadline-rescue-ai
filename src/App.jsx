import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";

function App() {

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      alert(`Welcome ${result.user.displayName}!`);

      console.log(result.user);

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-bold mb-6">
        Deadline Rescue AI 🚀
      </h1>

      <button
        onClick={signIn}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-semibold"
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default App;