import React from 'react';
import './dashboard.css';
import { useAuth } from '../Login/AuthProvider';
import { useNavigate } from 'react-router-dom'; // To navigate between pages
import SearchBar from '../Components/SearchBar';
import CreateBoard from '../Components/CreateBoard';
import BoardsTable from './BoardsTable';

export default function Dashboard() {
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    const { setAuthToken } = useAuth(); 
    const navigate = useNavigate();
    const handleLogout = () => {
        setAuthToken(null); // Clear authentication token
        localStorage.removeItem('authToken'); // Remove token from localStorage
        navigate('/'); // Redirect to login page
    };


    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="logo">
                    <h1>Taskmate</h1>
                </div>
                <nav className="navbar">
                    <button className="blood-report-btn" onClick={() => setIsPopupOpen(true)}>+ Create Board</button>
                    {/* <SearchBar className="search-dash-container" /> */}
                </nav>
                <div className="profile-section">
                    <div className="profile">
                        <img src={'https://cdn.pixabay.com/photo/2021/04/07/17/01/woman-6159648_1280.jpg'} className="profile-icon" />
                        {/* <span className="profile-name">{userInfo?.displayName}</span> */}
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </header>
            {isPopupOpen && <CreateBoard onClose={() => setIsPopupOpen(false)} />}
            <BoardsTable />
        </div>
    );
}
