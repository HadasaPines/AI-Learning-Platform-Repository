import React, { useEffect, useState } from "react";
import { getAllUsers, getAllPrompts } from "../services/api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showUsers, setShowUsers] = useState(true);
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

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Users Section */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">Users ({users.length})</h2>
          <button
            onClick={() => setShowUsers(!showUsers)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {showUsers ? "Hide" : "Show"}
          </button>
        </div>
        {showUsers && (
          <div className="overflow-auto">
            <table className="min-w-full table-auto border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Phone</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="border px-4 py-2">{user.id}</td>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Prompts Section */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">Prompts ({prompts.length})</h2>
          <button
            onClick={() => setShowPrompts(!showPrompts)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {showPrompts ? "Hide" : "Show"}
          </button>
        </div>
        {showPrompts && (
          <div className="overflow-auto">
            <table className="min-w-full table-auto border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">User ID</th>
                  <th className="border px-4 py-2">Prompt</th>
                  <th className="border px-4 py-2">Response</th>
                  <th className="border px-4 py-2">Category</th>
                  <th className="border px-4 py-2">Subcategory</th>
                </tr>
              </thead>
              <tbody>
                {prompts.map((p) => (
                  <tr key={p.id}>
                    <td className="border px-4 py-2">{p.id}</td>
                    <td className="border px-4 py-2">{p.user_id}</td>
                    <td className="border px-4 py-2 max-w-xs truncate">{p.prompt}</td>
                    <td className="border px-4 py-2 max-w-xs truncate">{p.response}</td>
                    <td className="border px-4 py-2">{p.category?.name || "-"}</td>
                    <td className="border px-4 py-2">{p.sub_category?.name || "-"}</td>
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
