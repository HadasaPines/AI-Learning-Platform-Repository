import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import "../css/login.css";
const LoginPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const { loginWithApi } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await loginWithApi(name, phone);

      if (result.success) {
        if (name.toLowerCase() === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        navigate("/signup", { state: { name, phone } });
      }
    } catch (err) {
      setError("Login failed, please try again.");
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-background">
      <div className="login-header">
        <h1>Welcome To AI Learning Platform</h1>
        <p>Login to continue</p>
      </div>
      <div className="login-container">
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
    </div>
    </div>


  );
};

export default LoginPage;
