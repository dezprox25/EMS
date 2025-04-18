// src/utils/api.ts

const API_BASE = "http://localhost:5000/api";

export async function login(username: string, password: string) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // if your backend uses cookies
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error((await response.json()).message || "Login failed");
  }
  return response.json();
}

export async function register(username: string, password: string, role: string) {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password, role }),
  });
  if (!response.ok) {
    throw new Error((await response.json()).message || "Registration failed");
  }
  return response.json();
}

// Add more API functions as needed