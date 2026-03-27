"use client";

import { useEffect, useState } from "react";
import {
  registerUser,
  loginUser,
  getContacts,
  createContact,
  updateContact,
  deleteContact
} from "../services/api";

type Contact = {
  id: number;
  name: string;
};

export default function ContactsApp() {
  const [token, setToken] = useState<string | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  const [loading, setLoading] = useState(false);

  // Load token on mount
  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) setToken(saved);
  }, []);

  // Fetch contacts
  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getContacts(token);
        setContacts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleLogin = async () => {
    const data = await loginUser(username, password);
    setToken(data.token);
    localStorage.setItem("token", data.token);
  };

  const handleRegister = async () => {
    await registerUser(username, password);
    alert("Registered! Now login.");
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const refreshContacts = async () => {
    if (!token) return;
    const data = await getContacts(token);
    setContacts(data);
  };

  const handleAdd = async () => {
    if (!token || !newName) return;
    await createContact(newName, token);
    setNewName("");
    refreshContacts();
  };

  const handleUpdate = async (id: number) => {
    if (!token) return;
    await updateContact(id, editingName, token);
    setEditingId(null);
    refreshContacts();
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    await deleteContact(id, token);
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      {!token ? (
        <>
          <h2>Auth</h2>

          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>

          <h2>Contacts</h2>

          <input
            placeholder="New contact"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={handleAdd}>Add</button>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {contacts.map((c) => (
                <li key={c.id}>
                  {editingId === c.id ? (
                    <>
                      <input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                      />
                      <button onClick={() => handleUpdate(c.id)}>
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      {c.name}
                      <button
                        onClick={() => {
                          setEditingId(c.id);
                          setEditingName(c.name);
                        }}
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDelete(c.id)}>
                        Delete
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}