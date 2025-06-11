import React, { useState } from 'react';
import CategorySelector from '../components/categorySelector';
import PromptForm from '../components/promptForm';
import UserPromptHistory from '../components/userPromptHistory';
import '../css/dashboard.css';

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [response, setResponse] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="dashboard-container space-y-8 p-6 max-w-3xl mx-auto">
      <h1 className="dashboard-title text-3xl font-bold text-center mb-6">AI Learning Dashboard</h1>

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
  );
}
