import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate for back button functionality
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './style.css';
import { useData } from '../Components/DataProvider';
import CreateTaskForm from '../Components/CreateTaksForm';
import EditTaskForm from '../Components/EditTaskForm'; // Import the modal for editing

const Board = () => {
  const { id } = useParams(); // Get the board ID from the URL params
  const { projects, fetchTasks, tasks, updateTask } = useData(); // Get project and task-related data
  const navigate = useNavigate(); // Hook for navigation (Back button)

  const [todoTasks, setTodoTasks] = useState([]); // State to store 'To Do' tasks
  const [inProgressTasks, setInProgressTasks] = useState([]); // State to store 'In Progress' tasks
  const [completedTasks, setCompletedTasks] = useState([]); // State to store 'Completed' tasks
  const [showForm, setShowForm] = useState(false); // Toggle for the task creation form
  const [editTask, setEditTask] = useState(null); // State for the task being edited

  useEffect(() => {
    // Filter tasks by their status and update respective states
    setTodoTasks(tasks.filter(task => task.status === 'todo'));
    setInProgressTasks(tasks.filter(task => task.status === 'inProcess'));
    setCompletedTasks(tasks.filter(task => task.status === 'completed'));
  }, [tasks]);

  useEffect(() => {
    fetchTasks(id); // Fetch tasks for the current board on load
  }, []);

  // Function to handle going back
  const handleGoBack = () => {
    navigate(-1); // Navigates to the previous page
  };

  // Function to handle when a task is edited
  const handleEditTask = (task) => {
    setEditTask(task);  // Set the selected task for editing
  };

  // Function to save the edited task
  const handleSaveEdit = (updatedTask) => {
    const { _id, status } = updatedTask; // Destructure the ID and status
    const updatedTasks = tasks.map(task => task._id === _id ? updatedTask : task); // Update the task list with the edited task
    
    // Update the tasks in the relevant column based on the new status
    setTodoTasks(updatedTasks.filter(t => t.status === 'todo'));
    setInProgressTasks(updatedTasks.filter(t => t.status === 'inProcess'));
    setCompletedTasks(updatedTasks.filter(t => t.status === 'completed'));
    
    setEditTask(null);  // Close the edit modal after saving
  };

  // Function to delete a task
  const handleDeleteTask = async (status, taskId) => {
    const taskLists = {
      todo: todoTasks,
      inProcess: inProgressTasks,
      completed: completedTasks,
    };
    const updatedTasks = [...taskLists[status]]; // Get the task list for the current status
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:5000/api/kaban/${id}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        // Filter out the deleted task from the list
        const updatedTaskForStatus = updatedTasks.filter(obj => obj._id !== taskId);
        if (status === 'todo') setTodoTasks(updatedTaskForStatus);
        else if (status === 'inProcess') setInProgressTasks(updatedTaskForStatus);
        else setCompletedTasks(updatedTaskForStatus);
      } else {
        console.error('Failed to delete task!');
      }
      fetchTasks(id); // Re-fetch tasks to update the UI
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Function to handle dragging and dropping of tasks between columns
  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const taskLists = {
      todo: todoTasks,
      inProcess: inProgressTasks,
      completed: completedTasks,
    };

    const startList = taskLists[source.droppableId];
    const finishList = taskLists[destination.droppableId];

    // Same list movement
    if (source.droppableId === destination.droppableId) {
      const updatedList = Array.from(startList);
      const [movedTask] = updatedList.splice(source.index, 1);
      updatedList.splice(destination.index, 0, movedTask);

      if (source.droppableId === 'todo') setTodoTasks(updatedList);
      else if (source.droppableId === 'inProcess') setInProgressTasks(updatedList);
      else setCompletedTasks(updatedList);
    } else {
      // Moving between lists
      const startUpdated = Array.from(startList);
      const finishUpdated = Array.from(finishList);
      const [movedTask] = startUpdated.splice(source.index, 1);

      // Update task status to the new list (destination)
      const newStatus = destination.droppableId;
      movedTask.status = newStatus;

      // Add task to new list at the new index
      finishUpdated.splice(destination.index, 0, movedTask);

      // Update the task in the state
      if (source.droppableId === 'todo') setTodoTasks(startUpdated);
      else if (source.droppableId === 'inProcess') setInProgressTasks(startUpdated);
      else setCompletedTasks(startUpdated);

      if (destination.droppableId === 'todo') setTodoTasks(finishUpdated);
      else if (destination.droppableId === 'inProcess') setInProgressTasks(finishUpdated);
      else setCompletedTasks(finishUpdated);

      // Make the API call to update task status
      updateTask(movedTask.board, movedTask._id, movedTask.title, movedTask.description, newStatus)
        .then((success) => {
          if (!success) {
            console.log('Task update failed');
          }
        })
        .catch((err) => {
          console.error('Error updating task status:', err);
        });
    }
  };

  // Helper function to render tasks for each column
  const renderTasks = (tasks, status) =>
    tasks?.map((task, index) => (
      <Draggable key={task._id} draggableId={task._id} index={index}>
        {(provided) => (
          <div
            className="task-card"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <strong>{task.title}</strong>
            <p>{task.description}</p>
            <div className="task-actions">
              <button className="edit-button" onClick={() => handleEditTask(task)}>Edit</button>
              <button className="delete-button" onClick={() => handleDeleteTask(status, task._id)}>Delete</button>
            </div>
          </div>
        )}
      </Draggable>
    ));

  return (
    <div className="board-container">
      <button className="back-button" onClick={handleGoBack}>Back</button>
      <h2 className="board-title">Project Board: {projects.find(p => p._id === id)?.name}</h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="board-columns">
          <Droppable droppableId="todo">
            {(provided) => (
              <div className="board-column" ref={provided.innerRef} {...provided.droppableProps}>
                <h3 className="column-title">
                  To Do
                  <button className="add-task-button" onClick={() => setShowForm(true)}>+</button>
                </h3>
                {showForm && <CreateTaskForm onClose={() => setShowForm(false)} boardId={id} />}
                <div className="tasks">{renderTasks(todoTasks, 'todo')}</div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="inProcess">
            {(provided) => (
              <div className="board-column" ref={provided.innerRef} {...provided.droppableProps}>
                <h3 className="column-title">In Progress</h3>
                <div className="tasks">{renderTasks(inProgressTasks, 'inProcess')}</div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="completed">
            {(provided) => (
              <div className="board-column" ref={provided.innerRef} {...provided.droppableProps}>
                <h3 className="column-title">Completed</h3>
                <div className="tasks">{renderTasks(completedTasks, 'completed')}</div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      {editTask && <EditTaskForm task={editTask} onClose={() => setEditTask(null)} onSave={handleSaveEdit} />}
    </div>
  );
};

export default Board;
