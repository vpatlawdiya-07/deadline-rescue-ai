import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("High");
  const [deadline, setDeadline] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load Tasks
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

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add Task
  async function addTask() {
    if (!title || !deadline) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "tasks"), {
        title,
        priority,
        deadline,
        completed: false,
      });

      alert("Task Added Successfully ✅");

      setTitle("");
      setPriority("High");
      setDeadline("");

      fetchTasks();

    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold text-center text-blue-400">
          🚀 Deadline Rescue AI
        </h1>

        <p className="text-center text-slate-400 mt-2 mb-10">
          Never miss another deadline.
        </p>

        {/* Add Task */}

        <div className="bg-slate-900 rounded-xl p-6 shadow-lg">

          <h2 className="text-2xl font-bold mb-6">
            ➕ Add New Task
          </h2>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
            />

            <button
              onClick={addTask}
              className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-bold"
            >
              ➕ Add Task
            </button>

          </div>

        </div>

        {/* Task List */}

        <div className="bg-slate-900 rounded-xl p-6 shadow-lg mt-10">

          <h2 className="text-2xl font-bold mb-6">
            📋 Your Tasks
          </h2>

          {tasks.length === 0 ? (
            <p className="text-slate-400">
              No tasks found.
            </p>
          ) : (
            <div className="space-y-4">

              {tasks.map((task) => (

                <div
                  key={task.id}
                  className="bg-slate-800 rounded-lg p-5 border border-slate-700"
                >

                  <h3 className="text-xl font-bold">
                    {task.title}
                  </h3>

                  <p className="mt-2">
                    Priority: <b>{task.priority}</b>
                  </p>

                  <p>
                    Deadline: <b>{task.deadline}</b>
                  </p>

                  <p>
                    Status:{" "}
                    <span
                      className={
                        task.completed
                          ? "text-green-400"
                          : "text-yellow-400"
                      }
                    >
                      {task.completed ? "Completed" : "Pending"}
                    </span>
                  </p>

                </div>

              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default App;