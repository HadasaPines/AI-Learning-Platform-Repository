import { createContext, useContext, useState } from "react";
import { loginUser } from "../services/api"; 

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const login = (userData) => {
    const isAdmin = userData.name === "admin" || userData.is_admin === true;
  
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("is_admin", isAdmin ? "true" : "false");
  
    setUser(userData);
  };

 const loginWithApi = async (name, phone) => {
  try {
    const userData = await loginUser(name, phone);
    login(userData);
    return { success: true };
  } catch (error) {
    if (error.message.includes("Not found")) {
      return { success: false, reason: "not_found" };
    }
    throw error;
  }
};
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, loginWithApi, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
