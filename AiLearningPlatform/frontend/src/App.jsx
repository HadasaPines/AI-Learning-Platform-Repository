import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"; 
import Signup from "./pages/SignUp";
import Dashboard from "./pages/Dashboard"; 
import LoginPage from "./pages/Login";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} /> 

      </Routes>
    </BrowserRouter>
  );
}

export default App;
