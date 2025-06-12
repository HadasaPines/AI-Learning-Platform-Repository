import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
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
      const response = await register({ name, phone });
      login(response.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="full-screen-center">
      <div className="login-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: "black" }}>{error}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
