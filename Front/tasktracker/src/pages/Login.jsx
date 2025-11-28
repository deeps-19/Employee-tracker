import { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });
      console.log(res);
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", res.data.user.role);

      navigate("/dashboard");
    } catch (err) {
      alert("Invalid login!");
      
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <form className="w-full max-w-md bg-white p-8 rounded shadow" onSubmit={loginUser}>
        <h1 className="text-3xl font-bold text-center mb-4">Login</h1>

        <input className="w-full p-3 mb-3 border rounded" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input className="w-full p-3 mb-3 border rounded" placeholder="Password" type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white p-3 rounded">Login</button>

        <p className="text-center mt-3">
          Don't have an account? <Link className="text-blue-600" to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}
