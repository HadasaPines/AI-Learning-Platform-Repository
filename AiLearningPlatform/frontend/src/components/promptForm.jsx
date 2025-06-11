import { useState } from "react";
import { submitPrompt } from "../services/api";

const PromptForm = ({ category, subCategory, onResponse }) => {
  const [promptText, setPromptText] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState(""); // חדש

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

      console.log("Submitting prompt:", data);

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Enter a question or topic"
        value={promptText}
        onChange={(e) => setPromptText(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
        disabled={loading}
      >
        {loading ? "Sending..." : "Submit"}
      </button>

      {responseText && (
        <div className="bg-gray-100 p-4 rounded border">
          <h3 className="font-bold mb-2">AI Response:</h3>
          <p>{responseText}</p>
        </div>
      )}
    </form>
  );
};

export default PromptForm;
