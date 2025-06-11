import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"; 
import Signup from "./pages/SignUp";
import Dashboard from "./pages/Dashboard"; 
import LoginPage from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/admin" element={<AdminDashboard />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
