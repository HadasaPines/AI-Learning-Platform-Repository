import React, { useEffect, useState } from "react";
import { getAllUsers, updateUser, deleteUser, register } from "../services/api";
import { useNavigate } from 'react-router-dom';
import "../css/adminDashboard.css";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", phone: "" });
  const [editForm, setEditForm] = useState({ name: "", phone: "" });

  const navigate = useNavigate();
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
    setLoading(false);
  };

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditForm({ name: user.name, phone: user.phone });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(editingUserId, editForm);
      setEditingUserId(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      window.alert("Error deleting user: " + error);
    }
  };

  const handleNewUserChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await register(newUser);
      setNewUser({ name: "", phone: "" });
      fetchUsers();
    } catch (error) {
      console.error("Error adding user", error);
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div>
      <button onClick={() => navigate("/admin")} style={{ marginBottom: "20px" }}>
        Return to the admin dashboard
      </button>
      <h2>Manage Users</h2>

      <form onSubmit={handleAddUser}>
        <h3>Add New User</h3>
        <input
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleNewUserChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={newUser.phone}
          onChange={handleNewUserChange}
          required
        />
        <button type="submit">Add User</button>
      </form>

      <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            editingUserId === user.id ? (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    name="phone"
                    value={editForm.phone}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <button className="icon-button" onClick={handleEditSubmit} title="Save">
                    💾
                  </button>
                  <button className="icon-button" onClick={() => setEditingUserId(null)} title="Cancel">
                    ❌
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>
                  <button
                    className="icon-button"
                    onClick={() => handleEditClick(user)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    className="icon-button"
                    onClick={() => handleDelete(user.id)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>

      </table>
    </div>
  );
}
