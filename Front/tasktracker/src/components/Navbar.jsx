import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // "admin" or "user"

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Task Tracker</h1>

      <div className="flex gap-6">

        {/* Always visible for all users */}
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/my-tasks">My Tasks</Link>

        {/* Admin Only Links */}
        {role === "admin" && (
          <>
            <Link to="/admin/create">Create Task</Link>
            <Link to="/admin/tasks">Admin Panel</Link>
          </>
        )}

        <button
          className="bg-red-500 px-3 py-1 rounded"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
