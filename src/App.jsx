import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const taskList = [];

      querySnapshot.forEach((doc) => {
        taskList.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setTasks(taskList);
    }

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">
      <h1 className="text-5xl font-bold mb-8">
        Deadline Rescue AI 🚀
      </h1>

      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-slate-800 p-5 rounded-lg mb-4"
        >
          <h2 className="text-2xl font-bold">{task.title}</h2>
          <p>Priority: {task.priority}</p>
          <p>Deadline: {task.deadline}</p>
          <p>
            Status: {task.completed ? "Completed" : "Pending"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;