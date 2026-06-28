import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("High");
  const [deadline, setDeadline] = useState("");
  const [tasks, setTasks] = useState([]);

  async function fetchTasks() {
    const snap = await getDocs(collection(db, "tasks"));
    const list = [];
    snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
    setTasks(list);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function addTask() {
    if (!title || !deadline) {
      alert("Please fill all fields");
      return;
    }
    await addDoc(collection(db, "tasks"), {
      title,
      priority,
      deadline,
      completed: false,
    });
    setTitle("");
    setPriority("High");
    setDeadline("");
    fetchTasks();
  }

  async function deleteTask(id) {
    await deleteDoc(doc(db, "tasks", id));
    fetchTasks();
  }

  async function toggleComplete(id, current) {
    await updateDoc(doc(db, "tasks", id), {
      completed: !current,
    });
    fetchTasks();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-blue-400">🚀 Deadline Rescue AI</h1>
        <p className="text-center text-slate-400 mt-2 mb-10">Never miss another deadline.</p>

        <div className="bg-slate-900 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">➕ Add New Task</h2>

          <div className="space-y-5">
            <input className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
              placeholder="Task Title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />

            <select
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
              value={priority}
              onChange={(e)=>setPriority(e.target.value)}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <input
              type="date"
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
              value={deadline}
              onChange={(e)=>setDeadline(e.target.value)}
            />

            <button
              onClick={addTask}
              className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-bold"
            >
              ➕ Add Task
            </button>
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 shadow-lg mt-10">
          <h2 className="text-2xl font-bold mb-6">📋 Your Tasks</h2>

          {tasks.length===0 ? (
            <p className="text-slate-400">No tasks found.</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task)=>(
                <div key={task.id} className="bg-slate-800 rounded-lg p-5 border border-slate-700">
                  <h3 className="text-xl font-bold">{task.title}</h3>
                  <p>Priority: <b>{task.priority}</b></p>
                  <p>Deadline: <b>{task.deadline}</b></p>
                  <p>Status: <span className={task.completed?"text-green-400":"text-yellow-400"}>
                    {task.completed?"Completed":"Pending"}
                  </span></p>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={()=>toggleComplete(task.id, task.completed)}
                      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                    >
                      {task.completed ? "↩ Undo" : "✔ Complete"}
                    </button>

                    <button
                      onClick={()=>deleteTask(task.id)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                    >
                      🗑 Delete
                    </button>
                  </div>
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
