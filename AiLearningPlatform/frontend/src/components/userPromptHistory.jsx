import { useEffect, useState } from "react";
import { getUserPrompts } from "../services/api";

const UserPromptHistory = () => {
    const [prompts, setPrompts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrompts = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user?.id) return;

                const response = await getUserPrompts(user.id); // קורא ל-API
                setPrompts(response);
            } catch (error) {
                console.error("Error fetching prompts", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrompts();
    }, []);

    if (loading) return <p>Loading prompt history...</p>;

    if (!prompts.length) return <p>No prompts found.</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Prompt History</h2>
            <ul className="space-y-2">
                {prompts.map((item) => (
                    <li key={item.id} className="border p-3 rounded shadow-sm">
                        <div>
                            <strong>Prompt:</strong> {item.prompt}
                        </div>
                        <div>
                            <strong>Response:</strong> {item.response || <em>No response</em>}
                        </div>
                        <div className="text-sm text-gray-500">
                            <strong>Date:</strong> {new Date(item.created_at).toLocaleString()}
                        </div>
                        <div>
                            <strong>Category:</strong> {item.category?.name || <em>Unknown</em>}
                        </div>
                        <div>
                            <strong>Sub-Category:</strong> {item.sub_category?.name || <em>None</em>}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserPromptHistory;
