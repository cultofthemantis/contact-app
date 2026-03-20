"use client";
import { useState } from "react";
import { loginUser } from "@/services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const data = await loginUser(username, password);
    localStorage.setItem("token", data.token);
    alert("Logged in!");
  };

  return (
    <div className="p-4">
      <h2>Login</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 m-2"
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 m-2"
      />

      <button onClick={handleLogin} className="bg-blue-500 text-white p-2">
        Login
      </button>
    </div>
  );
}