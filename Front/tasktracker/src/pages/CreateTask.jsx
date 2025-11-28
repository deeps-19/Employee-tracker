import { useState, useEffect } from "react";
import API from "../api/axios";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [assignee, setAssignee] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("auth/allusers").then((res) => setUsers(res.data));
  }, []);

  const createTask = async (e) => {
    e.preventDefault();

    await API.post("/tasks", {
      title,
      description,
      priority,
      dueDate,
      assigneeId: assignee,
    });

    alert("Task Created!");
  };

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Create New Task</h1>

      <form onSubmit={createTask} className="bg-white p-5 shadow rounded space-y-4">

        <input
          className="w-full border p-3 rounded"
          placeholder="Task Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-3 rounded"
          placeholder="Task Description"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <select
          className="w-full border p-3 rounded"
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          type="date"
          className="w-full border p-3 rounded"
          onChange={(e) => setDueDate(e.target.value)}
        />

        <select
          className="w-full border p-3 rounded"
          onChange={(e) => setAssignee(e.target.value)}
        >
          <option value="">Assign To (Optional)</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Create Task
        </button>
      </form>
    </div>
  );
}
