import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../Components/DataProvider';
import {formatDateTime} from '../utils'


const BoardsTable = () => {
    const [error, setError] = useState(null); // State for error handling
    const {projects,loading} = useData()

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    //             const response = await fetch('https://taskmate-fqgyd3egdbfccvh7.centralindia-01.azurewebsites.net/api/kanban', {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${token}`, // Include Bearer token for authentication
    //                 },
    //             });

    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch data');
    //             }

    //             const data = await response.json(); // Parse the response JSON
    //             setProjects(data); // Set the fetched data
    //         } catch (error) {
    //             setError(error.message); // Set any errors encountered
    //         } finally {
    //             setLoading(false); // Set loading to false when done
    //         }
    //     };

    //     fetchData(); // Call the fetch function
    // }, []); 

    // Loading and error handling
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Your Boards !</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse', padding: '20px' }}>
                <thead>
                    <tr>
                        <th style={thStyle}>Project Name</th>
                        <th style={thStyle}>To-Do Items</th>
                        <th style={thStyle}>In Process Items</th>
                        <th style={thStyle}>Completed Items</th>
                        <th style={thStyle}>Created At</th>
                        <th style={thStyle}>Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project._id}>
                            <td style={tdStyle}>
                                <Link to={`/board/${project._id}`}>{project.name}</Link>
                            </td>
                            <td style={tdStyle}>{project.tasks.todo}</td>
                            <td style={tdStyle}>{project.tasks.inProcess}</td>
                            <td style={tdStyle}>{project.tasks.completed}</td>
                            <td style={tdStyle}>{formatDateTime(project.createdAt)}</td>
                            <td style={tdStyle}>{formatDateTime(project.updatedAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Inline styles for table elements
const thStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    textAlign: 'left'
};

const tdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left'
};

export default BoardsTable;
