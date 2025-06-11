import React, { useState, useEffect } from "react";
import { getCategories, getSubCategories } from "../services/api.js";

export default function CategorySelector({
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
}) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory?.id) {
      setSubCategories([]);
      setSelectedSubCategory(null);
      return;
    }

    const fetchSubCategories = async () => {
      try {
        const { data } = await getSubCategories(selectedCategory.id);
        setSubCategories(data);
      } catch (err) {
        console.error("Failed to load sub-categories", err);
      }
    };

    fetchSubCategories();
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    const selected = categories.find((cat) => String(cat.id) === e.target.value);
    setSelectedCategory(selected || null);
    setSelectedSubCategory(null);
  };

  const handleSubCategoryChange = (e) => {
    const selected = subCategories.find((sub) => String(sub.id) === e.target.value);
    setSelectedSubCategory(selected || null);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium">Choose Category:</label>
        <select
          className="border p-2 rounded w-full"
          value={selectedCategory?.id || ""}
          onChange={handleCategoryChange}
        >
          <option value="">-- Select --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCategory && (
        <div>
          <label className="block font-medium">Choose Sub-Category:</label>
          <select
            className="border p-2 rounded w-full"
            value={selectedSubCategory?.id || ""}
            onChange={handleSubCategoryChange}
          >
            <option value="">-- Select --</option>
            {subCategories.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
