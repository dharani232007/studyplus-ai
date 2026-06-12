const BASE_URL = "http://localhost:5000/api/roadmap";

export const startChat = async (userId) => {
  const res = await fetch(`${BASE_URL}/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId })
  });
  return res.json();
};

export const sendAnswer = async (chatId, answer) => {
  const res = await fetch(`${BASE_URL}/answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chatId, answer })
  });
  return res.json();
};

export const generateRoadmap = async (chatId) => {
  const res = await fetch(`${BASE_URL}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chatId })
  });
  return res.json();
};

export const getDashboard = async (userId) => {
  const res = await fetch(`${BASE_URL}/dashboard/${userId}`);
  return res.json();
};

export const getRoadmaps = async (userId) => {
  const res = await fetch(`${BASE_URL}/user/${userId}`);
  return res.json();
};

export const getRoadmapById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

export const completeTopic = async (data) => {
  const res = await fetch(`${BASE_URL}/topic/complete`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};