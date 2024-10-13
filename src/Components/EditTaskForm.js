import React, { useState } from 'react';
import './style.css';
import { useData } from './DataProvider';

const EditTaskForm = ({ task,onSave,onClose,boardId }) => {
  const [title, setTitle] = useState(task.title || ''); // Allow fallback for empty fields
  const [description, setDescription] = useState(task.description || '');
  const [status, setStatus] = useState(task.status || 'todo'); // Default to 'todo'
  const {updateTask} = useData()

  const handleSave = async() => {
    const updatedTask = {
      ...task,
      title,   
      description, 
      status, 
    };
    onSave(updatedTask)
    await updateTask(boardId,task._id,title,description,status) // Call onSave to pass the updated task to the parent component
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Task</h3>
        <label>
          Title:
          <input
            type="text"
            value={title} // Binding input value to the component state
            onChange={(e) => setTitle(e.target.value)} // Update state on change
          />
        </label>
        <label>
          Description:
          <textarea
            value={description} // Binding textarea value to the component state
            onChange={(e) => setDescription(e.target.value)} // Update state on change
          />
        </label>
        {/* Status Input */}
        <label>
          Status:
          <select
            value={status} 
            onChange={(e) => setStatus(e.target.value)} 
          >
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button> {/* Save button triggers handleSave */}
          <button onClick={onClose}>Cancel</button> {/* Close modal on cancel */}
        </div>
      </div>
    </div>
  );
};

export default EditTaskForm;
