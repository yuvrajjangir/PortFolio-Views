import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file for styles

function Dashboard() {
    const [viewCount, setViewCount] = useState(0);

    useEffect(() => {
        // Function to fetch total view count from backend
        const fetchViewCount = async () => {
            try {
                const response = await fetch('https://portfolio-backend-0mu3.onrender.com/views');
                const data = await response.json();
                setViewCount(data.count);
            } catch (err) {
                console.error(err);
            }
        };

        // Fetch initial view count when component mounts
        fetchViewCount();

        // Fetch view count every 10 seconds
        const interval = setInterval(fetchViewCount, 10000);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);

    // CSS animation for counting up
    const countUpAnimation = {
        animation: 'countUp 1s ease-out'
    };

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">PortFolio Dashboard</h1>
            <div className="dashboard-content">
                <p className="dashboard-info">Total Views:</p>
                <p className="dashboard-count" style={countUpAnimation}>
                    {viewCount}
                </p>
            </div>
        </div>
    );
}

export default Dashboard;
