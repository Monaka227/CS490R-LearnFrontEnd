import React from 'react';
import './ReviewCard.css';

// add oncardclick prop to be able to click the whole card
export const ReviewCard = ({ review, onCardClick }) => {
  return (
    // be able to click the whole card
    <div className="review-card" onClick={onCardClick} style={{ cursor: 'pointer' }}>
      <h3>{review.title}</h3>
      <p style={{ color: '#7f8c8d', fontSize: '0.85rem' }}>Publisher: {review.publisher}</p>
      <p>{review.description || "No description available."}</p>
      
      {/* there is no rating */}
      <span className="view-reviews-link">
        View Reviews ➔
      </span>
    </div>
  );
};