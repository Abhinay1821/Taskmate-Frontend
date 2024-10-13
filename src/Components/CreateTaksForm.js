import React, { useState } from 'react';
import './style.css';
import { useData } from './DataProvider';

const CreateTaskForm = ({ onClose,boardId }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const {createTask} = useData()

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (taskName && description) {
      const res = await createTask(boardId,taskName,description) 
      console.log('res',res)
      onClose()
    }
  };

  return (
    <div className="task-form-popup">
      <div className="task-form-container">
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task name"
            className="task-input"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            className="task-textarea"
          />
          <div className="button-container">
            <button type="submit" className="create-task-button">Create Task</button>
            <button type="button" onClick={onClose} className="cancel-task-button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskForm;
