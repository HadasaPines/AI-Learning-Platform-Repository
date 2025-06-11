import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import  UserContext  from "../contexts/UserContext";
import InputField from "../components/InputField";
import { register } from "../services/api";

const SignUp = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await register({ name, phone }); // ← שימוש בפונקציה שלך
      login(response.data); // שמירת המשתמש בקונטקסט ובלוקאל סטורג'
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "שגיאה בהרשמה");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">הרשמה</h2>
      <form onSubmit={handleSubmit}>
        <InputField label="שם" value={name} onChange={(e) => setName(e.target.value)} />
        <InputField label="טלפון" value={phone} onChange={(e) => setPhone(e.target.value)} />
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          הירשם
        </button>
      </form>
    </div>
  );
};

export default SignUp;
