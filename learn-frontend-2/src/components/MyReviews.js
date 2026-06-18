import React, { useState, useEffect } from 'react';
import './MyReviews.css';

export const MyReviews = ({ currentUserId, token, onGameClick }) => {
  const [myReviewsList, setMyReviewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    setLoading(true);
    setErrorMsg(null);
    
    // sent GET api/reviews
    // to avoid 400
    fetch('http://localhost:3000/api/reviews', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with status ${res.status}. This is likely due to 'reviewValidationRules' on the backend GET route.`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("=== MyReviews Fetch Success ===");
        console.log("Raw Reviews Data from Backend:", data);

        if (Array.isArray(data)) {
          // filtering reviews if id match or not
          const filtered = data.filter((rev) => {
            const revUser = rev.user_id;
            const reviewerId = typeof revUser === 'object' && revUser !== null
              ? (revUser._id || revUser.id)
              : revUser;
            
            return String(reviewerId).trim() === String(currentUserId).trim();
          });
          setMyReviewsList(filtered);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setErrorMsg(err.message);
        setLoading(false);
      });
  }, [currentUserId, token]);

  if (loading) {
    return <p style={{ textAlign: 'center', padding: '20px', color: '#718096' }}>Loading your reviews...</p>;
  }

  if (myReviewsList.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#718096', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', marginTop: '20px' }}>
        <p style={{ fontSize: '18px', margin: 0, fontWeight: 'bold' }}>📝 You haven't posted any reviews yet.</p>
        <p style={{ fontSize: '14px', marginTop: '10px' }}>Go to the Home page, select a game, and share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="my-reviews-container">
      {myReviewsList.map((rev) => {
        const targetGameId = rev.game_id;
        const reviewTitle = rev.title || "Review";
        const reviewBody = rev.body || ""; 

        return (
          <div key={rev._id || rev.id} className="my-review-card">
            <div className="my-review-header">
              <h3 className="my-review-title">{reviewTitle}</h3>
              {targetGameId && (
                <button onClick={() => onGameClick(targetGameId)} className="btn-view-game">
                  🎯 View Game
                </button>
              )}
            </div>

            <div className="my-review-rating">
              {'⭐'.repeat(rev.rating || 5)} 
              <span className="my-review-rating-num">({rev.rating}/5)</span>
            </div>
            <p className="my-review-body">{reviewBody}</p>
            {rev.createdAt && (
              <span className="my-review-date">
                Posted on: {new Date(rev.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};