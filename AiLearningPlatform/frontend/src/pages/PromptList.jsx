import React, { useEffect, useState } from "react";
import { getAllPrompts, deletePrompt } from "../services/api";
import { useNavigate } from 'react-router-dom';
import "../css/adminDashboard.css";
export default function PromptList() {
    const [prompts, setPrompts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchPrompts();
    }, []);

    const fetchPrompts = async () => {
        setLoading(true);
        try {
            const res = await getAllPrompts();
            setPrompts(res.data);
        } catch (error) {
            console.error("Error fetching prompts", error);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this prompt?")) return;
        try {
            await deletePrompt(id);
            fetchPrompts();
        } catch (error) {
            console.error("Error deleting prompt", error);
        }
    };

    if (loading) return <div className="dashboard-container">Loading prompts...</div>;

    return (
        <div >
            <button onClick={() => navigate("/admin")} style={{ marginBottom: "20px" }}>
                Return to the admin dashboard
            </button>
            <h2>Prompts</h2>
            {prompts.length === 0 ? (
                <p>No prompts found.</p>
            ) : (
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Prompt</th>
                            <th>Response</th>
                            <th>Category</th>
                            <th>Subcategory</th>
                            <th>User</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prompts.map((prompt) => (
                            <tr key={prompt.id}>
                                <td>{prompt.id}</td>
                                <td>{prompt.prompt}</td>
                                <td>{prompt.response}</td>
                                <td>{prompt.category_name || prompt.category_id}</td>
                                <td>{prompt.sub_category_name || prompt.sub_category_id}</td>
                                <td>{prompt.user_name || prompt.user_id}</td>
                                <td>
                                    <button className="delete-button"onClick={() => handleDelete(prompt.id)} title="Delete" >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
