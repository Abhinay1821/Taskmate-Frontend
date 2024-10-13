import React, { useEffect, useState } from 'react'

const DataContext = React.createContext()
export function useData() {
    return React.useContext(DataContext)
}

export default function DataProvider({ children }) {

    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([])
    console.log('projects', projects)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);

    // Fetch projects data from the API
    const fetchBoards = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('https://abhinay-backend-dvazccevfsavezaq.centralindia-01.azurewebsites.net/api/kanban', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // Add Bearer token for authentication
                },
            });
            const data = await response.json();
            console.log('data board', data)
            if (response.ok) {
                setProjects(data);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to fetch projects. Please try again.');
        } finally {
            setLoading(false)
        }
    };

    // Function to create a new board
    const createBoard = async (boardName) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('https://abhinay-backend-dvazccevfsavezaq.centralindia-01.azurewebsites.net/api/kanban', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // Bearer token
                },
                body: JSON.stringify({ name: boardName }),  // Request body
            });
            const data = await response.json();
            if (response.ok) {
                // After creating a new board, fetch the projects again to update the list
                await fetchBoards();
                return true; // Success
            } else {
                setError(data.message);
                return false; // Error occurred
            }
        } catch (err) {
            setError('An error occurred while creating the board. Please try again.');
            return false;
        }
    };

    const fetchTasks = async (id) => {
        try {
            const token = localStorage.getItem('authToken')
            const response = await fetch(`https://abhinay-backend-dvazccevfsavezaq.centralindia-01.azurewebsites.net/api/kanban/${id}/tasks`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // Add Bearer token for authentication
                },
            });
            const data = await response.json();
            setTasks(data)
        }
        catch (e) {
            console.log(e)
        }
    }
    const createTask = async (id, name, desc) => {
        console.log('id in create', id)
        try {
            const token = localStorage.getItem('authToken')
            const response = await fetch(`https://abhinay-backend-dvazccevfsavezaq.centralindia-01.azurewebsites.net/api/kanban/${id}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ title: name, description: desc, status: 'todo' }),
            })
            const data = await response.json()
            if (response.ok) {
                await fetchTasks(id)
                return true
            }
            else {
                setError(data.message)
                return false
            }
        } catch (err) {
            console.log('error in creating tasks', err)
            setError('An error occured while creating Tasks', err)
        }
    }

    const updateTask = async (id, taskId, name, desc, status) => {
        try {
            const token = localStorage.getItem('authToken')
            const response = await fetch(`https://abhinay-backend-dvazccevfsavezaq.centralindia-01.azurewebsites.net/api/kanban/${id}/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ title: name, description: desc, status: status }),
            })
            const data = await response.json()
            if (response.ok) {
                await fetchTasks(id)
                return true
            }
            else {
                setError(data.message)
                return false
            }
        } catch (err) {
            console.log('error in creating tasks', err)
            setError('An error occured while creating Tasks', err)
        }
    }
    useEffect(() => {
        fetchBoards();
    }, []);
    return (
        <DataContext.Provider value={{ projects, createBoard, error, fetchBoards, projects, setProjects, loading, fetchTasks, createTask, tasks, setTasks,updateTask }}>
            {children}
        </DataContext.Provider>
    );
}
