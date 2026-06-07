import React, { useState } from 'react';

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
    <div style={{ background: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginBottom: '30px', border: '2px solid #2cc71' }}>
      <h3 style={{ marginTop: 0, color: '#2c3e50', borderBottom: '2px solid #ecf0f1', paddingBottom: '10px' }}>
        🛡️ Admin Panel: Create New Board Game
      </h3>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Game Title *</label>
          <input 
            type="text" value={title} onChange={(e) => setTitle(e.target.value)} required 
            placeholder="e.g., Terraforming Mars"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Publisher</label>
          <input 
            type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} 
            placeholder="e.g., FryxGames"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Designer</label>
          <input 
            type="text" value={designer} onChange={(e) => setDesigner(e.target.value)} 
            placeholder="e.g., Jacob Fryxelius"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Image URL</label>
          <input 
            type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} 
            placeholder="https://example.com/game-image.jpg"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Initial System Rating</label>
          <select 
            value={rating} onChange={(e) => setRating(Number(e.target.value))}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
            <option value="4">⭐⭐⭐⭐ (4/5)</option>
            <option value="3">⭐⭐⭐ (3/5)</option>
            <option value="2">⭐⭐ (2/5)</option>
            <option value="1">⭐ (1/5)</option>
          </select>
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Description</label>
          <textarea 
            value={description} onChange={(e) => setDescription(e.target.value)} 
            placeholder="Describe the gameplay, mechanics, and components..."
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '80px' }}
          />
        </div>

        <button type="submit" style={{ gridColumn: '1 / -1', background: '#2ecc71', color: 'white', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
          🚀 Publish New Game to Database
        </button>
      </form>
    </div>
  );
};