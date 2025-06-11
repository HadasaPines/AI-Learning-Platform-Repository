import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import "./App.css"; // נניח שיש לך קובץ CSS


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
