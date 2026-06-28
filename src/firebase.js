import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1I_P06OS2GYaOcJjVnd_OcJ3jc3VM9s0",
  authDomain: "deadline-rescue-ai-7b490.firebaseapp.com",
  projectId: "deadline-rescue-ai-7b490",
  storageBucket: "deadline-rescue-ai-7b490.firebasestorage.app",
  messagingSenderId: "59264947501",
  appId: "1:59264947501:web:bc906839d98a3ae5f5afa4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);