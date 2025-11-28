import { useState, useEffect } from "react";
import API from "../api/axios";

export default function AssignTask() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedTask, setSelectedTask] = useState("");

  useEffect(() => {
    API.get("/tasks").then((res) => setTasks(res.data));
    API.get("/auth/users").then((res) => setUsers(res.data));
  }, []);

  const assign = async () => {
    await API.put(`/tasks/assign/${selectedTask}`, {
      assigneeId: selectedUser,
    });
    alert("Task assigned!");
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Assign Task</h1>

      <select className="border p-2 w-full mb-3"
        onChange={(e) => setSelectedTask(e.target.value)}
      >
        <option>Select Task</option>
        {tasks.map((t) => (
          <option value={t._id} key={t._id}>{t.title}</option>
        ))}
      </select>

      <select className="border p-2 w-full mb-3"
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option>Select User</option>
        {users.map((u) => (
          <option value={u._id} key={u._id}>{u.name}</option>
        ))}
      </select>

      <button className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={assign}
      >
        Assign Task
      </button>
    </div>
  );
}
