// src/api/index.js

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // או לקרוא מ־.env
  headers: {
    "Content-Type": "application/json",
  },
});

// Register & Login
export const register = (data) => API.post("/users/", data);
export const loginUser = async (name, phone) => {
  try {
    const response = await API.post("/users/login", { name, phone });
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const getCategories = () => API.get("/categories/");
export const getSubCategories = (categoryId) =>
  API.get(`/subcategories`, { params: { category_id: categoryId } });

export const submitPrompt = async (data) => {
  try {
    const response = await API.post("/prompts/", data);
    return response.data;
  } catch (error) {
    console.error("Failed to submit prompt", error);
    throw error;
  }
};

