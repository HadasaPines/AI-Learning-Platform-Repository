import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"; // נניח שיש לך קובץ CSS
import Signup from "./pages/SignUp";
import Dashboard from "./pages/Dashboard"; 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} /> 

      </Routes>
    </BrowserRouter>
  );
}

export default App;
