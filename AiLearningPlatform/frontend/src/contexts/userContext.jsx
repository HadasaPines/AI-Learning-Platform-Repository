import { createContext, useContext, useState } from "react";
import { loginUser } from "../services/api"; 

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const loginWithApi = async (name, phone) => {
    try {
      const userData = await loginUser(name, phone);
      login(userData);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
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
