import React, { useState } from 'react';
import './ReviewCard.css';

export const UpdateAccount = ({ onUpdateSuccess, onCancel }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const token = localStorage.getItem('token');
    
    const updateData = { currentPassword };
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (newPassword) updateData.newPassword = newPassword;

    fetch('http://localhost:3000/api/auth/update-account', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Secure API: include token in the header for authentication
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(data => { throw new Error(data.message || 'Update failed') });
        }
        return res.json();
      })
      .then((data) => {
        setMessage('Account updated successfully!');
        localStorage.setItem('user', JSON.stringify(data.user));
        
        if (onUpdateSuccess) {
          onUpdateSuccess(data.user);
        }
        
        // Clear form fields after successful update
        setCurrentPassword('');
        setNewPassword('');
      })
      .catch((err) => {
        console.error('Update account error:', err);
        setError(err.message);
      });
  };

  return (
    <div className="update-account-container" style={{ maxWidth: '500px', margin: '30px auto', padding: '20px' }}>
      <form className="review-form" onSubmit={handleSubmit}>
        <h3>Update Account Settings</h3>
        <p style={{ fontSize: '13px', color: '#7f8c8d' }}>Leave fields blank if you don't want to change them.</p>
        
        {message && <p style={{ color: '#2ecc71', fontWeight: 'bold' }}>{message}</p>}
        {error && <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>{error}</p>}

        <div className="form-group">
          <label>New Username:</label>
          <input 
            type="text" 
            placeholder="Enter new username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>New Email:</label>
          <input 
            type="email" 
            placeholder="Enter new email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>New Password:</label>
          <input 
            type="password" 
            placeholder="Enter new password (optional)" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="form-group" style={{ borderTop: '1px solid #eee', paddingTop: '15px', marginTop: '15px' }}>
          <label style={{ color: '#e74c3c' }}>Current Password (Required):</label>
          <input 
            type="password" 
            placeholder="Confirm your current password" 
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required 
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="submit-button" style={{ backgroundColor: '#2ecc71', flex: 1 }}>
            Save Changes
          </button>
          <button type="button" onClick={onCancel} className="back-button" style={{ margin: 0, flex: 1, backgroundColor: '#95a5a6', color: 'white' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};