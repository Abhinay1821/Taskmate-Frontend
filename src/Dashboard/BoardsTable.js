import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../Components/DataProvider';
import { formatDateTime } from '../utils';
import './dashboard.css'

const BoardsTable = () => {
    const [error, setError] = useState(null); 
    const { projects, loading, deleteBoard } = useData(); 
    const [deleting, setDeleting] = useState(null); 

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

export default BoardsTable;
