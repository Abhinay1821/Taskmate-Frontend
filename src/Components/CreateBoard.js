import React, { useState } from 'react';
import './style.css';
import { useData } from './DataProvider';

const CreateBoard = ({ onClose }) => {
  const [boardName, setBoardName] = useState('');
  const [error,setError] = useState('')
  const {createBoard} = useData()

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    if (!boardName) {
      setError('Board name is required');
      return;
    }
    const success = await createBoard(boardName);
    if (success) {
      setBoardName('');
      setError('');
      onClose(); // Close the popup on success
    } else {
      setError('Failed to create the board.');
    }
  };

  return (
    <div className="create-board-container">
      <h2>Create a New Board</h2>
      <form onSubmit={handleCreateBoard} className="create-board-form">
        <input
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          placeholder="Enter board name"
          className="board-input"
        />
        {error && <p className="error-message">{error}</p>}
        <div className="button-container">
          <button type="submit" className="create-board-button">Create Board</button>
          <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateBoard;

