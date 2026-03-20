"use client";

import { useEffect, useState } from "react";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "@/services/api";

type Contact = {
  id: number;
  name: string;
};

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newName, setNewName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // 🔄 Load contacts
  const loadContacts = async () => {
    if (!token) return;
    const data = await getContacts(token);
    setContacts(data);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  // ➕ Create
  const handleCreate = async () => {
    if (!newName || !token) return;
    await createContact(newName, token);
    setNewName("");
    loadContacts();
  };

  // ✏️ Update
  const handleUpdate = async (id: number) => {
    if (!editName || !token) return;
    await updateContact(id, editName, token);
    setEditId(null);
    setEditName("");
    loadContacts();
  };

  // ❌ Delete
  const handleDelete = async (id: number) => {
    if (!token) return;
    await deleteContact(id, token);
    loadContacts();
  };

  return (
    <div className="flex flex-col gap-4">
      
      {/* CREATE */}
      <div className="flex gap-2">
        <input
          className="flex-1 p-2 rounded bg-gray-600 border border-gray-500"
          placeholder="New contact name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button
          onClick={handleCreate}
          className="bg-green-500 px-4 rounded"
        >
          Add
        </button>
      </div>

      <ul className="flex flex-col gap-2">
        {contacts.map((c) => (
          <li
            key={c.id}
            className="flex justify-between items-center bg-gray-700 p-2 rounded"
          >
            {editId === c.id ? (
              <>
                <input
                  className="p-1 rounded bg-gray-600 border border-gray-500"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(c.id)}
                    className="bg-blue-500 px-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-500 px-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <span>{c.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditId(c.id);
                      setEditName(c.name);
                    }}
                    className="bg-yellow-500 px-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="bg-red-500 px-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}