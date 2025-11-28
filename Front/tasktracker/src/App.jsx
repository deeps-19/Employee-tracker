import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default route → auto redirect */}
        <Route
          path="/"
          element={
            localStorage.getItem("token")
              ? <Navigate to="/dashboard" />
              : <Navigate to="/login" />
          }
        />

        {/* Public pages (visible only when not logged in) */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected pages (visible only when logged in) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
