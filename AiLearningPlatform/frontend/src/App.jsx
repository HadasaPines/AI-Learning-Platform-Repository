import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"; 
import Signup from "./pages/SignUp";
import Dashboard from "./pages/Dashboard"; 
import LoginPage from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/UserManagment"
import CategoryManager from "./pages/CategoryManagment";
import PromptList from "./pages/PromptList";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/usermanagment" element={<ManageUsers />} />
        <Route path="/categorymanagment" element={<CategoryManager />} />
        <Route path="/promptlist" element={<PromptList />} />
        




      </Routes>
    </BrowserRouter>
  );
}

export default App;
