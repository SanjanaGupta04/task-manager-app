import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const API = "http://127.0.0.1:5000/tasks";

  // FETCH TASKS
  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }

    fetchTasks();

  }, []);

  // ADD TASK
  const addTask = async () => {

    if (!title) return;

    await axios.post(API, {
      title,
      completed: false,
    });

    setTitle("");
    fetchTasks();
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-white">
          Smart Task Dashboard 🚀
        </h1>

        <button
          onClick={logout}
          className="bg-white text-purple-600 px-5 py-2 rounded-2xl font-bold shadow-lg hover:scale-105 transition"
        >
          Logout
        </button>

      </div>

      {/* TASK BOX */}
      <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl shadow-2xl max-w-2xl mx-auto">

        {/* INPUT */}
        <div className="flex gap-3 mb-6">

          <input
            type="text"
            placeholder="Enter task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-4 rounded-2xl outline-none bg-white text-gray-700"
          />

          <button
            onClick={addTask}
            className="bg-white text-purple-600 px-6 rounded-2xl font-bold hover:scale-105 transition"
          >
            Add
          </button>

        </div>

        {/* TASK LIST */}
        <div className="space-y-4">

          {tasks.length === 0 ? (

            <div className="text-center text-white text-lg">
              No tasks added yet ✨
            </div>

          ) : (

            tasks.map((task) => (

              <div
                key={task._id}
                className="bg-white rounded-2xl p-4 flex justify-between items-center shadow-lg"
              >

                <span className="font-medium text-gray-700">
                  {task.title}
                </span>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

            ))

          )}

        </div>

      </div>
    </div>
  );
}

export default Dashboard;