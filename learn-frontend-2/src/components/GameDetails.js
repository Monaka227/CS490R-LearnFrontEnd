import React, { useState, useEffect } from 'react';
import './ReviewCard.css';

export const GameDetails = ({ gameId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formTitle, setFormTitle] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formBody, setFormBody] = useState('');

  useEffect(() => {
    // not fetching all game reviews and then filtering on the frontend, but directly fetching only the reviews for the selected game from the backend!
    fetch(`http://localhost:3000/api/reviews/games/${gameId}`) // <-- backend URL
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reviews for this game");
        return res.json();
      })
      .then((data) => {
        // data should already be filtered reviews for the selected game, so we can directly set it to state
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching reviews:', err);
        setLoading(false);
      });
  }, [gameId]);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading reviews...</p>;

  return (
    <div className="game-details">
      <h2>User Reviews</h2>
      
      <form className="review-form">
        <h3>Write a new Review</h3>
        <div className="form-group">
          <label>Title: </label>
          <input type="text" name="title" placeholder="Review Title" required />
        </div>
        <div className="form-group">
          <label>Rating: </label>
          <select name="rating" required>
            <option value="">Select Rating</option>
            <option value="1">⭐⭐⭐⭐⭐ (5/5)</option>
            <option value="2">⭐⭐⭐⭐ (4/5)</option>
            <option value="3">⭐⭐⭐ (3/5)</option>
            <option value="4">⭐⭐ (2/5)</option>
            <option value="5">⭐ (1/5)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Review: </label>
          <textarea name="body" placeholder="Write your review here..." required></textarea>
        </div>
        <button type="submit">Post Review</button>

      </form>



      {reviews.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '20px' }}>No reviews found for this game.</p>
      ) : (
        <div className="review-list">
          {reviews.map((rev) => (
            <div key={rev._id} className="review-card" style={{ cursor: 'default' }}>
              <h3>{rev.title}</h3>
              <p className="review-rating" style={{ color: '#f39c12' }}>
                Rating: {'⭐'.repeat(rev.rating)} ({rev.rating}/5)
              </p>
              <p>{rev.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};