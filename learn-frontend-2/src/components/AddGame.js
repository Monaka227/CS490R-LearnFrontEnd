import React, { useState } from 'react';
import './AdminPanel.css';

export const AddGame = ({ onGameAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [publisher, setPublisher] = useState('');
  const [designer, setDesigner] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [rating, setRating] = useState(5); // 初期値は星5
  
  const token = localStorage.getItem('token');

  const handleSubmit = (e) => {
    e.preventDefault();

    // create a new game object to send to the backend
    const newGame = { 
      title, 
      description,
      publisher,
      designer,
      image_url: imageUrl,
      rating: Number(rating)
    };

    fetch('http://localhost:3000/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newGame)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create game. Admin only.");
        return res.json();
      })
      .then((savedGame) => {
        alert("🎉 New game added to Tabletop Treasures!");
        onGameAdded(savedGame);
        
        setTitle('');
        setDescription('');
        setPublisher('');
        setDesigner('');
        setImageUrl('');
        setRating(5);
      })
      .catch((err) => {
        console.error(err);
        alert("Error: You do not have permission to add games.");
      });
  };

  return (
    <div className="admin-panel-container">
      <h3 className="admin-panel-title">
        🛡️ Admin Panel: Create New Board Game
      </h3>
      <form onSubmit={handleSubmit} className="admin-form-grid">
        
        <div className="form-field-full">
          <label className="admin-form-group-label">Game Title *</label>
          <input 
            type="text" value={title} onChange={(e) => setTitle(e.target.value)} required 
            placeholder="e.g., Terraforming Mars"
            className="admin-input-text"
          />
        </div>

        <div>
          <label className="admin-form-group-label">Publisher</label>
          <input 
            type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} 
            placeholder="e.g., FryxGames"
            className="admin-input-text"
          />
        </div>

        <div>
          <label className="admin-form-group-label">Designer</label>
          <input 
            type="text" value={designer} onChange={(e) => setDesigner(e.target.value)} 
            placeholder="e.g., Jacob Fryxelius"
            className="admin-input-text"
          />
        </div>

        <div className="form-field-full">
          <label className="admin-form-group-label">Image URL</label>
          <input 
            type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} 
            placeholder="https://example.com/game-image.jpg"
            className="admin-input-text"
          />
        </div>

        <div>
          <label className="admin-form-group-label">Initial System Rating</label>
          <select 
            value={rating} onChange={(e) => setRating(Number(e.target.value))}
            className="admin-select"
          >
            <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
            <option value="4">⭐⭐⭐⭐ (4/5)</option>
            <option value="3">⭐⭐⭐ (3/5)</option>
            <option value="2">⭐⭐ (2/5)</option>
            <option value="1">⭐ (1/5)</option>
          </select>
        </div>

        <div className="admin-form-group form-field-full">
          <label className="admin-form-group-label">Description</label>
          <textarea 
            value={description} onChange={(e) => setDescription(e.target.value)} 
            placeholder="Describe the gameplay, mechanics, and components..."
            className="admin-textarea"
          />
        </div>

        <button type="submit" className="admin-submit-button">
          🚀 Publish New Game to Database
        </button>
      </form>
    </div>
  );
};