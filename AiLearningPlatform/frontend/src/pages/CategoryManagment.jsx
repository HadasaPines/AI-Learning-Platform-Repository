import React, { useEffect, useState } from "react";
import {
  getCategories,
  getSubCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../services/api";
import { useNavigate } from 'react-router-dom';

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [subCategoriesMap, setSubCategoriesMap] = useState({});
  const [loading, setLoading] = useState(true);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSubCategoryNames, setNewSubCategoryNames] = useState({});

  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  const [editingSubId, setEditingSubId] = useState(null);
  const [editSubName, setEditSubName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      const allCategories = res.data || res;
      setCategories(allCategories);

      const subMap = {};
      for (const cat of allCategories) {
        const subRes = await getSubCategories(cat.id);
        subMap[cat.id] = subRes.data || subRes;
      }
      setSubCategoriesMap(subMap);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
    setLoading(false);
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await createCategory({ name: newCategoryName });
      setNewCategoryName("");
      fetchCategories();
    } catch (err) {
      console.error("Error adding category", err);
    }
  };

  const handleAddSubCategory = async (categoryId, name) => {
    try {
      await createSubCategory({ name, category_id: categoryId });
      setNewSubCategoryNames({ ...newSubCategoryNames, [categoryId]: "" });
      fetchCategories();
    } catch (err) {
      console.error("Error adding subcategory", err);
    }
  };

  const handleEditCategory = (cat) => {
    setEditingCategoryId(cat.id);
    setEditCategoryName(cat.name);
  };

  const handleSaveCategory = async () => {
    try {
      await updateCategory(editingCategoryId, { name: editCategoryName });
      setEditingCategoryId(null);
      fetchCategories();
    } catch (err) {
      console.error("Error updating category", err);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category", err);
    }
  };

  const handleEditSub = (sub) => {
    setEditingSubId(sub.id);
    setEditSubName(sub.name);
  };

  const handleSaveSub = async () => {
    try {
      await updateSubCategory(editingSubId, { name: editSubName });
      setEditingSubId(null);
      fetchCategories();
    } catch (err) {
      console.error("Error updating subcategory", err);
    }
  };

  const handleDeleteSub = async (id) => {
    if (!window.confirm("Delete this subcategory?")) return;
    try {
      await deleteSubCategory(id);
      fetchCategories();
    } catch (err) {
      console.error("Error deleting subcategory", err);
    }
  };

  if (loading) return <div>Loading categories...</div>;

  return (
    <div style={{ width: "100%", maxWidth: "1500px" , margin: "30px auto" }}>
      <button onClick={() => navigate("/admin")} style={{ marginBottom: "20px" }}>
        Return to the admin dashboard
      </button>
      <h2>Categories and Subcategories</h2>

      <form onSubmit={handleAddCategory}>
        <h3>Add New Category</h3>
        <input
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Category name"
          required
        />
        <button type="submit">Add Category</button>
      </form>

      <div style={{ width: "100%", margin: "30px auto" }}>
        {categories.map((cat) => (
          <div key={cat.id} style={{ marginBottom: "40px", border: "1px solid #ccc" }}>
            {editingCategoryId === cat.id ? (
              <>
                <input
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                />
                <button onClick={handleSaveCategory}>💾</button>
                <button onClick={() => setEditingCategoryId(null)}>❌</button>
              </>
            ) : (
              <>
                <strong>{cat.name}</strong>{" "}
                <button onClick={() => handleEditCategory(cat)}>✏️</button>
                <button onClick={() => handleDeleteCategory(cat.id)}>🗑️</button>
              </>
            )}

            <ul>
              {subCategoriesMap[cat.id]?.map((sub) => (
                <li key={sub.id}>
                  {editingSubId === sub.id ? (
                    <>
                      <input
                        value={editSubName}
                        onChange={(e) => setEditSubName(e.target.value)}
                      />
                      <button onClick={handleSaveSub}>💾</button>
                      <button onClick={() => setEditingSubId(null)}>❌</button>
                    </>
                  ) : (
                    <>
                      {sub.name}{" "}
                      <button onClick={() => handleEditSub(sub)}>✏️</button>
                      <button onClick={() => handleDeleteSub(sub.id)}>🗑️</button>
                    </>
                  )}
                </li>
              ))}
            </ul>
            <form
              className="category-form"
              style={{ width: "100%" }}
              onSubmit={(e) => {
                e.preventDefault();
                handleAddSubCategory(cat.id, newSubCategoryNames[cat.id]);
              }}
            >
              <input
                placeholder="New subcategory"
                value={newSubCategoryNames[cat.id] || ""}
                onChange={(e) =>
                  setNewSubCategoryNames({
                    ...newSubCategoryNames,
                    [cat.id]: e.target.value,
                  })
                }
                required
                style={{ flex: 1 }}
              />
              <button type="submit">Add Subcategory</button>
            </form>

          </div>
        ))}
      </div>
    </div>
  );
}
