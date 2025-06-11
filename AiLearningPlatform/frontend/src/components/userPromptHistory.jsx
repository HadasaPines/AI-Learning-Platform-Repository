import { useEffect, useState } from "react";
import { getUserPrompts } from "../services/api";
import "../css/userPromptHistory.css"; 

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
        <div className="prompt-history-container">
          <h2 className="prompt-history-title">Prompt History</h2>
          <ul className="prompt-history-list">
            {prompts.map((item) => (
              <li key={item.id} className="prompt-history-item">
                <div>
                  <strong>Prompt:</strong> {item.prompt}
                </div>
                <div>
                  <strong>Response:</strong> {item.response || <em>No response</em>}
                </div>
                <div className="date">
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
