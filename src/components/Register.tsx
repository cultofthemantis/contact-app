"use client";
import { useState } from "react";
import { registerUser } from "@/services/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    await registerUser(username, password);
    alert("Registered!");
  };

  return (
    <div className="p-4">
      <h2>Register</h2>

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

      <button onClick={handleRegister} className="bg-green-500 text-white p-2">
        Register
      </button>
    </div>
  );
}