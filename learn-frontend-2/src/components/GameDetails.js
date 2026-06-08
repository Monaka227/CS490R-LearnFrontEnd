import React, { useState, useEffect } from 'react';
import './ReviewCard.css';
import './AdminPanel.css';

export const GameDetails = ({ gameId, onGameDeleted }) => {
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // week 4: 3 states for manage form inputs
  const [formTitle, setFormTitle] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formBody, setFormBody] = useState('');
  
  // Secure API
  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    // Week 3: not fetching all game reviews and then filtering on the frontend, but directly fetching only the reviews for the selected game from the backend!
    fetch(`http://localhost:3000/api/reviews/games/${gameId}`) // <-- backend URL
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reviews for this game");
        return res.json();
      })
      .then((gameData) => setGame(gameData))
      .catch((err) => console.error('Error fetching game details:', err));
        
    fetch(`http://localhost:3000/api/reviews/games/${gameId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reviews for this game");
        return res.json();
      })
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching reviews:', err);
        setLoading(false);
      });
  }, [gameId]);

  const handleDeleteGame = () => {
    if (!window.confirm("Are you sure you want to delete this game?")) return;

    fetch(`http://localhost:3000/api/games/${gameId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete game");
        return res.json();
      })
      .then(() => {
        console.log("Game deleted successfully");
        onGameDeleted(gameId);
      })
      .catch((err) => {
        console.error("Error deleting game:", err);
        alert("Failed to delete game. Please try again.");
      });
  };

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
        const reviewWithUser = {
          ...savedReview,
          user_id: {
            id: currentUser?.id,
            username: currentUser?.username
          }
        };
        setReviews((prevReviews) => [...prevReviews, reviewWithUser]);

        // Reset form fields after successful submission
        setFormTitle('');
        setFormRating(5);
        setFormBody('');
      })
      .catch((err) => {
        console.error("Error submitting review:", err);
        alert("Failed to submit review. Please try again.");
      });
    };


  const handleDeleteReview = (reviewId) => {
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
        {game && (
        <div className="game-main-header">
          <h1 className="game-title-text">{game.title}</h1>
          
          <div className="game-flex-layout">
            {game.image_url && (
              <img src={game.image_url} alt={game.title} className="game-cover-image" />
            )}
            
            <div className="game-meta-info">
              <p>🏭 <strong>Publisher:</strong> {game.publisher || 'N/A'}</p>
              <p>🎨 <strong>Designer:</strong> {game.designer || 'N/A'}</p>
              <p>📊 <strong>Base Rating:</strong> {'⭐'.repeat(game.rating || 5)} ({game.rating || 5}/5)</p>
              <p className="game-description-text">{game.description}</p>
              
              {/* game delete button for admins*/}
              {token && isAdmin && (
                <button onClick={handleDeleteGame} className="admin-game-delete-btn">
                  🗑️ Admin: Delete This Game
                </button>
              )}
            </div>
          </div>
        </div>
      )}

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
            const reviewOwnerId = rev.user_id?._id || rev.user_id; // handle both populated and unpopulated user_id
            
            const isOwner = reviewOwnerId === currentUser?.id;
            const isAdmin = currentUser?.role === 'admin';
            const canDelete = isOwner || isAdmin;

            const reviewerName = rev.user_id?.username || "Unknown User"; // display username if available, otherwise show "Unknown User"

            return (
              <div key={rev._id} className="review-card">
                <h3>{rev.title}</h3>

                {/* add a badge for the reviewer's username */}
                <div className="reviewer-badge">
                  By: <span style={{ color: '#2b6cb0', fontWeight: 'bold' }}>{reviewerName}</span>
                </div>

                <p className="review-rating" style={{ color: '#f39c12' }}>
                  Rating: {'⭐'.repeat(rev.rating)} ({rev.rating}/5)
                </p>
                <p>{rev.body}</p>
                
                {/* Delete button for review owners or admins */}
                {canDelete && (
                  <button 
                    onClick={() => handleDeleteReview(rev._id)}
                    className={`delete-btn-base ${isAdmin ? 'admin-delete-btn' : 'user-review-delete-btn'}`}
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


export default GameDetails;