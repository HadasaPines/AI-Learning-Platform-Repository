import React, { useState } from 'react';
import CategorySelector from '../components/categorySelector';
import PromptForm from '../components/promptForm';
import UserPromptHistory from '../components/userPromptHistory';

export default function Dashboard() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [response, setResponse] = useState(null);
    const [showHistory, setShowHistory] = useState(false); 

    return (
        <div className="p-6 space-y-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold">AI Learning Dashboard</h1>

            <CategorySelector
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSubCategory={selectedSubCategory}
                setSelectedSubCategory={setSelectedSubCategory}
            />

            <PromptForm
                category={selectedCategory}
                subCategory={selectedSubCategory}
                onResponse={(res) => {
                    setResponse(res);
                }}
            />

            
            <button
                onClick={() => setShowHistory(!showHistory)}
                className="bg-gray-200 px-4 py-2 rounded border"
            >
                {showHistory ? "Hide History" : "Show History"}
            </button>

            
            {showHistory && <UserPromptHistory />}
        </div>
    );
}
