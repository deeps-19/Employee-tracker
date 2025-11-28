import { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    await API.post("/auth/signup", { name, email, password });
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <form className="w-full max-w-md bg-white p-8 rounded shadow" onSubmit={register}>
        <h1 className="text-3xl font-bold text-center mb-4">Signup</h1>

        <input className="w-full p-3 mb-3 border rounded" placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input className="w-full p-3 mb-3 border rounded" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input className="w-full p-3 mb-3 border rounded" placeholder="Password" type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white p-3 rounded">Signup</button>

        <p className="text-center mt-3">
          Already have an account? <Link className="text-blue-600" to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
