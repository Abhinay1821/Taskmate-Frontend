import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../Components/DataProvider';
import { formatDateTime } from '../utils';

const BoardsTable = () => {
    const [error, setError] = useState(null); // State for error handling
    const { projects, loading, deleteBoard,fetchBoards } = useData(); // Getting deleteBoard from useData
    const [deleting, setDeleting] = useState(null); // Track which board is being deleted

    const handleDelete = async (projectId) => {
        setDeleting(projectId); 
        try {
            await deleteBoard(projectId); 
        } catch (err) {
            setError(err.message); 
        } finally {
            setDeleting(null); 
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <div className="board-container">
            <h1>Your Boards</h1>
            <table className="board-table">
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>To-Do Items</th>
                        <th>In Process Items</th>
                        <th>Completed Items</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project._id}>
                            <td>
                                <Link to={`/board/${project._id}`} className="project-link">{project.name}</Link>
                            </td>
                            <td>{project.tasks.todo}</td>
                            <td>{project.tasks.inProcess}</td>
                            <td>{project.tasks.completed}</td>
                            <td>{formatDateTime(project.createdAt)}</td>
                            <td>{formatDateTime(project.updatedAt)}</td>
                            <td>
                                <button
                                    className={`delete-btn ${deleting === project._id ? 'deleting' : ''}`}
                                    onClick={() => handleDelete(project._id)}
                                    disabled={deleting === project._id}
                                >
                                    {deleting === project._id ? 'Deleting...' : 'Delete'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Styles using CSS classes
const styles = `
.board-container {
    padding: 20px;
    font-family: Arial, sans-serif;
}

.board-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.board-table th, .board-table td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
}

.board-table th {
    background-color: #f2f2f2;
    font-weight: bold;
    text-align: center;
}

.board-table td {
    text-align: center;
    background-color: #fff;
}

.project-link {
    color: #007BFF;
    text-decoration: none;
}

.project-link:hover {
    text-decoration: underline;
}

.delete-btn {
    padding: 6px 12px;
    background-color: #ff4d4d;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.delete-btn:hover {
    background-color: #ff1a1a;
}

.delete-btn:disabled {
    background-color: #ffcccc;
    cursor: not-allowed;
}

.deleting {
    background-color: #ff6666;
}
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default BoardsTable;
