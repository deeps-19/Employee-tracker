import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AdminTasks from "./pages/AdminTasks";
import AssignTask from "./pages/AssignTask";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import AdminRoute from "./components/AdminRoute";
import CreateTask from "./pages/CreateTask";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />

        <Route
          path="/admin/tasks"
          element={<ProtectedRoute><AdminTasks /></ProtectedRoute>}
        />

        <Route
          path="/admin/assign"
          element={<ProtectedRoute><AssignTask /></ProtectedRoute>}
        />
        <Route
  path="/admin/create"
  element={
    <AdminRoute>
      <CreateTask />
    </AdminRoute>
  }
/>

<Route
  path="/admin/panel"
  element={
    <AdminRoute>
      <AdminPanel />
    </AdminRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
