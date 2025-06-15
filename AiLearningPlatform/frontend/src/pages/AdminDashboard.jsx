import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../css/AdminDashboard.css";

export default function AdminDashboard() {
  const [page, setPage] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    if (page === "users") {
      navigate("/usermanagment");
    } else if (page === "categories") {
      navigate("/categorymanagment");
    } else if (page === "prompts") {
      navigate("/promptlist");
    }
  }, [page, navigate]);

  const renderPage = () => {
    if (page === "home") {
      return (
        <div>
          <h1>Admin Dashboard</h1>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <button onClick={() => setPage("users")}>Manage Users</button>
            <button onClick={() => setPage("categories")}>Manage Categories</button>
            <button onClick={() => setPage("prompts")}>View Prompts</button>
          </div>
        </div>
      );
    }
    return null;
  };

  return <div className="dashboard-container">{renderPage()}</div>;
}
