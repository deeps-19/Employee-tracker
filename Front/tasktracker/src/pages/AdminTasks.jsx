import { useEffect, useState } from "react";
import API from "../api/axios";

export default function AdminTasks() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await API.get("/tasks/all");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">All Tasks (Admin)</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-300">
            <th className="p-2">Title</th>
            <th className="p-2">Assigned To</th>
            <th className="p-2">Status</th>
            <th className="p-2">Priority</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((t) => (
            <tr key={t._id} className="border">
              <td className="p-2">{t.title}</td>
              <td className="p-2">{t.assigneeId?.name || "Unassigned"}</td>
              <td className="p-2">{t.status}</td>
              <td className="p-2">{t.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
