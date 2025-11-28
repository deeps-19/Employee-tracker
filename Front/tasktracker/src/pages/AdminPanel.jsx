import { useEffect, useState } from "react";
import API from "../api/axios";

export default function AdminPanel() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/tasks/all").then((res) => setTasks(res.data));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">Admin Panel – All Tasks</h1>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Reporter</th>
            <th className="p-2">Assignee</th>
            <th className="p-2">Status</th>
            <th className="p-2">Priority</th>
            <th className="p-2">Due Date</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((t) => (
            <tr className="border" key={t._id}>
              <td className="p-2">{t.title}</td>
              <td className="p-2">{t.reporterId?.name}</td>
              <td className="p-2">{t.assigneeId?.name || "Not Assigned"}</td>
              <td className="p-2">{t.status}</td>
              <td className="p-2">{t.priority}</td>
              <td className="p-2">{t.dueDate?.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
