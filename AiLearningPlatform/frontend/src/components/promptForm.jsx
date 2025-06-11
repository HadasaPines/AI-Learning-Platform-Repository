import { useState } from "react";
import { submitPrompt } from "../services/api";

const PromptForm = ({ category, subCategory, onResponse }) => {
  const [promptText, setPromptText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      // בדיקה שחובה לבחור קטגוריה
      if (!category?.id) {
        alert("יש לבחור קטגוריה לפני שליחה");
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
      setPromptText("");
    } catch (error) {
      console.error("Error submitting prompt", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        className="w-full border p-2 rounded"
        placeholder="הכנס שאלה או נושא ללמידה"
        value={promptText}
        onChange={(e) => setPromptText(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
        disabled={loading}
      >
        {loading ? "שולח..." : "שלח"}
      </button>
    </form>
  );
};

export default PromptForm;
