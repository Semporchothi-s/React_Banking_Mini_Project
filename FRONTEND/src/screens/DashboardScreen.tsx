import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const DashboardPage = (): React.ReactElement => {
    const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
        textDecoration: 'none',
        color: isActive ? '#0d6efd' : '#212529',
        fontWeight: isActive ? 'bold' : 'normal',
        padding: '12px 16px',
        borderRadius: '6px',
        backgroundColor: isActive ? '#e9ecef' : 'transparent',
        transition: 'all 0.2s ease-in-out',
        display: 'block'
    });

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
            {/* Side Navigation Panel */}
            <div style={{
                width: '260px',
                backgroundColor: '#f8f9fa',
                borderRight: '1px solid #dee2e6',
                padding: '24px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                <h3 style={{ marginBottom: '30px', paddingLeft: '16px', color: '#0d6efd' }}>SecureBank</h3>
                
                <NavLink to="/dashboard/home" style={navLinkStyle}>
                    Home
                </NavLink>

                <NavLink to="/dashboard/transfer" style={navLinkStyle}>
                    Transfer Money
                </NavLink>

                <NavLink to="/dashboard/history" style={navLinkStyle}>
                    Transaction History
                </NavLink>
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                {/* Outlet automatically renders the specific matched child route completely inside this component! */}
                <Outlet />
            </div>
        </div>
    );
}

export default DashboardPage;