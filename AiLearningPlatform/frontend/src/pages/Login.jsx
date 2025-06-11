import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/userContext";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const { loginWithApi } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // איפוס שגיאה לפני ניסיון חדש
    try {
      const result = await loginWithApi(name, phone);

      if (result.success) {
        navigate("/dashboard");
      } else {
        // אם לא הצליח — נעבור לדף הרשמה עם הנתונים שהוזנו
        navigate("/signup", { state: { name, phone } });
      }
    } catch (err) {
      setError("שגיאה בכניסה, אנא נסה שוב.");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
