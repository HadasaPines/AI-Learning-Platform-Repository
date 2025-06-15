import axios from "axios";
import handleApiError from "./exceptions";


const API = axios.create({
  baseURL: "http://localhost:8000", // או לקרוא מ־.env
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = async (data) => {
  try {
    const response = await API.post("/users/", data);
    return response.data;
  } catch (error) {
    handleApiError(error); 
  }
};


export const loginUser = async (name, phone) => {
  try {
    const response = await API.post("/users/login", { name, phone });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getCategories = () =>{
try{
 return API.get("/categories/");
}
catch(error){
  handleApiError(error);
}
};
export const getSubCategories = (categoryId) =>{
  try{
    return API.get(`/subcategories/category/${categoryId}`);
  }
  catch(error){
    handleApiError(error);
  }
}

export const submitPrompt = async (data) => {
  try {
    const response = await API.post("/prompts/", data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
  
};

export const getUserPrompts = async (userId) => {
  try {
    const response = await API.get(`/prompts/user/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAllUsers = () =>{
  try{ 
    return API.get("/admin/users");
  } catch(error){
    handleApiError(error);
  }
};

export const getAllPrompts = () =>{
  try{
return API.get("/admin/prompts");
  }
  catch(error){
    handleApiError(error);
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await API.put(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await API.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "Unexpected error during deletion";
  }
};
export const createCategory = async (data) => {
  try {
    const response = await API.post("/categories/", data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createSubCategory = async (data) => {
  try {
    const response = await API.post("/subcategories/", data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const deleteSubCategory = async (id) => {
  try {
    const response = await API.delete(`/subcategories/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const updateSubCategory = async (id, data) => {
  try {
    const response = await API.put(`/subcategories/${id}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const deleteCategory = async (id) => {
  try {
    const response = await API.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const updateCategory = async (id, data) => {
  try {
    const response = await API.put(`/categories/${id}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const deletePrompt = async (id) => {
  try {
    const response = await API.delete(`/prompts/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};






