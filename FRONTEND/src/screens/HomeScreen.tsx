import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen = (): React.ReactElement => {
    const navigate = useNavigate();
    const [userSummary, setUserSummary] = useState<any>(null);

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:3000/api/logout");
            navigate("/");
        } catch (err) {
            // Error is caught globally by the toast, but can be silently ignored locally
        }
    };

    async function initSummary() {
        try {
            var response = await axios.get("http://localhost:3000/api/account/summary");
            setUserSummary(response.data);
        } catch (e) {
            console.error("Failed to load summary", e);
        }
    }

    useEffect(() => {
        initSummary();
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h2>Home</h2>
                    {userSummary ? (
                        <div className="mt-4">
                            <h4>Welcome back, {userSummary.name}!</h4>
                            <div className="card mt-3 shadow-sm" style={{ minWidth: '300px' }}>
                                <div className="card-body">
                                    <h5 className="card-title text-muted mb-3">Account Overview</h5>
                                    <p className="card-text mb-1"><strong>Account Number:</strong> {userSummary.accountNumber}</p>
                                    <h2 className="card-text text-primary mt-3">
                                        ₹{userSummary.balance?.toFixed(2)}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Loading your dashboard summary...</p>
                    )}
                </div>
                <button 
                    onClick={handleLogout} 
                    className="btn btn-danger"
                    style={{ padding: '8px 24px', fontWeight: '500' }}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default HomeScreen;
