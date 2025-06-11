import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

export const register = (data) => API.post("/users/", data);
export const login = (data) => API.post("/users/login", data);