import React, { useEffect, useState } from "react";
import { getAllUsers, getAllPrompts } from "../services/api";
import "../css/adminDashboard.css";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPrompts, setShowPrompts] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersRes, promptsRes] = await Promise.all([
          getAllUsers(),
          getAllPrompts(),
        ]);

        const fetchedUsers = Array.isArray(usersRes)
          ? usersRes
          : usersRes.users || [];

        const fetchedPrompts = Array.isArray(promptsRes)
          ? promptsRes
          : promptsRes.prompts || [];

        setUsers(usersRes.data);
        setPrompts(promptsRes.data);
      } catch (err) {
        console.error("Admin fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="admin-wrapper">
        <div className="dashboard-container">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    
      <div className="dashboard-container">
        <h1>Admin Dashboard</h1>

        {/* Users Section */}
        <section>
          <div className="section-header">
            <h2>Users ({users.length})</h2>
            <button onClick={() => setShowUsers(!showUsers)}>
              {showUsers ? "Hide" : "Show"}
            </button>
          </div>
          {showUsers && (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Prompts Section */}
        <section>
          <div className="section-header">
            <h2>Prompts ({prompts.length})</h2>
            <button onClick={() => setShowPrompts(!showPrompts)}>
              {showPrompts ? "Hide" : "Show"}
            </button>
          </div>
          {showPrompts && (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User ID</th>
                    <th>Prompt</th>
                    <th>Response</th>
                    <th>Category</th>
                    <th>Subcategory</th>
                  </tr>
                </thead>
                <tbody>
                  {prompts.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.user_id}</td>
                      <td className="truncate">{p.prompt}</td>
                      <td className="truncate">{p.response}</td>
                      <td>{p.category?.name || "-"}</td>
                      <td>{p.sub_category?.name || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    
  );
}
