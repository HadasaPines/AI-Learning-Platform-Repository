import { useState } from "react";
import { submitPrompt } from "../services/api";
import "../css/promptForm.css";

const PromptForm = ({ category, subCategory, onResponse }) => {
  const [promptText, setPromptText] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!category?.id) {
        alert("Please select a category before submitting");
        setLoading(false);
        return;
      }

      const data = {
        user_id: user?.id,
        prompt: promptText,
        category_id: Number(category.id),
        sub_category_id: subCategory?.id ? Number(subCategory.id) : null,
      };

      const response = await submitPrompt(data);

      onResponse(response);
      setResponseText(response?.response || "No response received");
      setPromptText("");
    } catch (error) {
      console.error("Error submitting prompt", error);
      setResponseText("Error retrieving response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prompt-form-container">
      <form onSubmit={handleSubmit} className="form">
        <textarea
          placeholder="Enter a question or topic"
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          required
          rows={4}
          className="textarea"
        />

        <button
          type="submit"
          disabled={loading}
          className="submit-button"
        >
          {loading ? "Sending..." : "Submit"}
        </button>

        {responseText && (
          <div className="response-box">
            <h3 className="response-title">AI Response:</h3>
            <p className="response-text">{responseText}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default PromptForm;
