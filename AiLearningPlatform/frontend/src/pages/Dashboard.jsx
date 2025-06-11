import React, { useEffect, useState } from "react";

function Dashboard() {
  const [history, setHistory] = useState([]);

  // כאן אפשר לטעון את היסטוריית השיעורים (בפועל תחליף לקריאה ל-API)
  useEffect(() => {
    // דוגמה לנתונים סטטיים - יש להחליף ב-fetch או axios בעתיד
    const savedHistory = [
      { id: 1, topic: "למידת מכונה בסיסית", date: "2025-06-10" },
      { id: 2, topic: "רשתות נוירונים", date: "2025-06-11" },
    ];
    setHistory(savedHistory);
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>דשבורד למידה</h1>

      <section>
        <h2>היסטוריית שיעורים</h2>
        {history.length === 0 ? (
          <p>אין היסטוריה להצגה.</p>
        ) : (
          <ul>
            {history.map((item) => (
              <li key={item.id}>
                {item.topic} - {item.date}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>התחל שיעור חדש</h2>
        <button
          onClick={() => alert("כאן תוכל ליישם התחלת שיעור חדש")}
          style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}
        >
          התחלת שיעור
        </button>
      </section>
    </div>
  );
}

export default Dashboard;
