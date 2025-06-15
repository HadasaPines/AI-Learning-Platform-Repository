import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySelector from '../components/categorySelector';
import PromptForm from '../components/promptForm';
import UserPromptHistory from '../components/userPromptHistory';
import UserContext from '../contexts/UserContext';
import '../css/dashboard.css';

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [response, setResponse] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <div className="logout-wrapper">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">AI Learning Dashboard</h1>

        </div>

        <section className="category-selector-section">
          <CategorySelector
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
          />
        </section>

        <section className="prompt-form-section">
          <PromptForm
            category={selectedCategory}
            subCategory={selectedSubCategory}
            onResponse={(res) => setResponse(res)}
          />
        </section>

        <div className="text-center">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="history-toggle-button"
          >
            {showHistory ? "Hide History" : "Show History"}
          </button>
        </div>

        {showHistory && (
          <section className="user-prompt-history-section mt-8">
            <UserPromptHistory />
          </section>
        )}
      </div>
    </div>
  );
}
