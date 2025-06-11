
import React, { useState, useEffect } from 'react';
import CategorySelector from '../components/categorySelector';
import PromptForm from '../components/promptForm';
// import ResponseViewer from '../components/ResponseViewer';
// import HistoryList from '../components/HistoryList';

export default function Dashboard() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [response, setResponse] = useState(null);
    const [history, setHistory] = useState([]);

    //   const fetchHistory = async () => {
    //     const res = await fetch(`/api/prompts/user`);
    //     const data = await res.json();
    //     setHistory(data);
    //   };

    //   useEffect(() => {
    //     fetchHistory();
    //   }, []);

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
                   // fetchHistory(); 
                }}
            />


            {/* {response && <ResponseViewer response={response} />}
      <HistoryList history={history} /> */}
        </div>
    );
}
