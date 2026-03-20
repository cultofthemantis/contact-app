const API = process.env.NEXT_PUBLIC_API_URL;
console.log(API);
export const registerUser = async (username: string, password: string) => {
  await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
};

export const loginUser = async (username: string, password: string) => {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  return res.json();
};

export const getContacts = async (token: string) => {
  const res = await fetch(`${API}/contact`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const createContact = async (name: string, token: string) => {
  await fetch(`${API}/contact`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name })
  });
};

export const updateContact = async (id: number, name: string, token: string) => {
  await fetch(`${API}/contact/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name })
  });
};

export const deleteContact = async (id: number, token: string) => {
  await fetch(`${API}/contact/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
};