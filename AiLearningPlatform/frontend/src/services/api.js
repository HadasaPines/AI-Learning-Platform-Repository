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
  API.get(`subcategories/category/${categoryId}`);

export const submitPrompt = async (data) => {
  try {
    const response = await API.post("/prompts/", data);
    return response.data;
  } catch (error) {
    console.error("Failed to submit prompt", error);
    throw error;
  }
};

export const getUserPrompts = async (userId) => {
  try {
    const response = await API.get(`/prompts/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch prompts", error);
    throw error;
  }
};
export const getAllUsers = () => API.get("/admin/users");
export const getAllPrompts = () => API.get("/admin/prompts");