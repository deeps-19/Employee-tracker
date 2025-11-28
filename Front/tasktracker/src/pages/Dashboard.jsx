import { useEffect, useState } from "react";
import API from "../api/axios";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null); // for modal

  const role = localStorage.getItem("role");

  const loadTasks = async () => {
    try {
      let res;
      if (role === "admin") {
        res = await API.get("/tasks/all");
      } else {
        res = await API.get("/tasks/my");
      }
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const getByStatus = (status) => {
    return tasks.filter((t) => t.status === status);
  };

  if (loading) return <p className="p-5">Loading tasks...</p>;

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">
        {role === "admin" ? "All Tasks" : "My Tasks"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div>
          <h2 className="text-xl font-semibold mb-3">Pending</h2>
          {getByStatus("Pending").map((task) => (
            <TaskCard key={task._id} task={task} reload={loadTasks} onClick={setSelectedTask} />
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">In Progress</h2>
          {getByStatus("In-Progress").map((task) => (
            <TaskCard key={task._id} task={task} reload={loadTasks} onClick={setSelectedTask} />
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Done</h2>
          {getByStatus("Done").map((task) => (
            <TaskCard key={task._id} task={task} reload={loadTasks} onClick={setSelectedTask} />
          ))}
        </div>

      </div>

      {/* -------- Modal (Task Details) -------- */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          
          <div className="bg-white p-6 w-96 rounded shadow-lg relative">

            <button
              onClick={() => setSelectedTask(null)}
              className="absolute top-2 right-2 text-gray-600 text-xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-4">{selectedTask.title}</h2>

            <p><strong>Status:</strong> {selectedTask.status}</p>
            <p><strong>Description:</strong> {selectedTask.description || "No description"}</p>
            <p><strong>Reporter:</strong> {selectedTask.reporterId?.name}</p>
            <p><strong>Assignee:</strong> {selectedTask.assigneeId?.name}</p>

            <p className="mt-2 text-gray-500 text-sm">
              Created: {new Date(selectedTask.createdAt).toLocaleString()}
            </p>

          </div>

        </div>
      )}

    </div>
  );
}
