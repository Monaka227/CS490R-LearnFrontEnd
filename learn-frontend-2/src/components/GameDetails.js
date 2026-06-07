import React, { useState, useEffect } from 'react';
import './ReviewCard.css';

export const GameDetails = ({ gameId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // week 4: 3 states for manage form inputs
  const [formTitle, setFormTitle] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formBody, setFormBody] = useState('');
  
  // Secure API
  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Week 3: not fetching all game reviews and then filtering on the frontend, but directly fetching only the reviews for the selected game from the backend!
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      title: formTitle,
      rating: formRating,
      body: formBody,
      game_id: gameId, // associate the review with the current game
    };

    // add authorication header with token for secure API
    fetch('http://localhost:3000/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newReview),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to submit review");
        return res.json();
      })
      .then((savedReview) => {
        console.log("Review submitted successfully:", savedReview);



        const reviewWithUser = {
          user_id: {
            id: currentUser?.id,
            username: currentUser?.username
          }
        }

        setReviews((prevReviews) => [...prevReviews, savedReview]);

        // Reset form fields after successful submission
        setFormTitle('');
        setFormRating(5);
        setFormBody('');
      })
      .catch((err) => {
        console.error("Error submitting review:", err);
        alert("Failed to submit review. Please try again.");
      });

    // For now, just log the form data to the console
    // check all fields
    console.log("--- Form Submitted ---");
    console.log("Game ID:", gameId);
    console.log("Title:", formTitle);
    console.log("Rating:", formRating);
    console.log("Body:", formBody);

    // Here I would typically send the form data to the backend API to create a new review

  }

  const handleDelete = (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    fetch(`http://localhost:3000/api/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}` // add auth header for secure API
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete review");
        return res.json();
      })
      .then(() => {
        console.log("Review deleted successfully");
        // Remove the deleted review from the state to update the UI
        setReviews((prevReviews) => prevReviews.filter((rev) => rev._id !== reviewId));
      })
      .catch((err) => {
        console.error("Error deleting review:", err);
        alert("Failed to delete review. Please try again.");
      });
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Loading reviews...</p>;

  return (
    <div className="game-details">
      <h2>User Reviews</h2>
      
      {token && currentUser ? (
        <form className="review-form" onSubmit={handleSubmit}>
          <h3>Write a new Review</h3>
          <div className="form-group">
            <label>Title: </label>
            <input 
              type="text" 
              name="title" 
              placeholder="Review 
              Title" required 
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Rating: </label>
            <select 
              name="rating" 
              value={formRating} // controlled component
              onChange={(e) => setFormRating(e.target.value)} // update state on change
              required>
              <option value="">Select Rating</option>
              <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
              <option value="4">⭐⭐⭐⭐ (4/5)</option>
              <option value="3">⭐⭐⭐ (3/5)</option>
              <option value="2">⭐⭐ (2/5)</option>
              <option value="1">⭐ (1/5)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Review: </label>
            <textarea 
              name="body" 
              placeholder="Write your review here..." 
              required 
              value={formBody}
              onChange={(e) => setFormBody(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="submit-button">Post Review</button>

        </form>
      ) : (
        <div style={{ padding: '20px', background: '#edf2f7', borderRadius: '8px', textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', color: '#4a5568' }}>
          🔒 Please log in to write a review.
        </div>
      )}



      {reviews.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '20px' }}>No reviews found for this game.</p>
      ) : (
        <div className="review-list">
          {reviews.map((rev) => {
            // check if the current user is the owner of the review or an admin to determine if they can delete the review
            const reviewOwnerId = rev.user_id?.id || rev.user_id; // handle both populated and unpopulated user_id
            
            const isOwner = reviewOwnerId === currentUser?.id;
            const isAdmin = currentUser?.role === 'admin';
            const canDelete = isOwner || isAdmin;

            const reviewerName = rev.user_id?.username || "Unknown User"; // display username if available, otherwise show "Unknown User"

            return (
              <div key={rev._id} className="review-card" style={{ cursor: 'default', position: 'relative' }}>
                <h3>{rev.title}</h3>

                {/* add a badge for the reviewer's username */}
                <div className="reviewer-badge" style={{ fontSize: '12px', color: '#718096', marginBottom: '8px', fontWeight: '500' }}>
                  By: <span style={{ color: '#2b6cb0', fontWeight: 'bold' }}>{reviewerName}</span>
                </div>

                <p className="review-rating" style={{ color: '#f39c12' }}>
                  Rating: {'⭐'.repeat(rev.rating)} ({rev.rating}/5)
                </p>
                <p>{rev.body}</p>
                
                {/* Delete button for review owners or admins */}
                {canDelete && (
                  <button 
                    onClick={() => handleDelete(rev._id)}
                    style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      background: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    {isAdmin ? '🛡️ Admin Delete' : 'Delete'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};