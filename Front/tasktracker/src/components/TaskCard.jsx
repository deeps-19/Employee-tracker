import API from "../api/axios";

export default function TaskCard({ task, reload }) {
  const updateStatus = async (status) => {
    await API.put(`/tasks/status/${task._id}`, { status });
    reload();
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="font-bold text-lg">{task.title}</h3>
      <p className="text-gray-700 text-sm">{task.description}</p>

      <div className="flex gap-2 mt-3 flex-wrap">
        <button onClick={() => updateStatus("Pending")} className="bg-yellow-500 text-white px-2 py-1 rounded">
          Pending
        </button>
        <button onClick={() => updateStatus("In-Progress")} className="bg-blue-500 text-white px-2 py-1 rounded">
          In Progress
        </button>
        <button onClick={() => updateStatus("Done")} className="bg-green-600 text-white px-2 py-1 rounded">
          Done
        </button>
      </div>
    </div>
  );
}
