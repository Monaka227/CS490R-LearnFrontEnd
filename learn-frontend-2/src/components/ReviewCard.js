import React from 'react';
import './ReviewCard.css';

export const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <h3>{review.title}</h3>
      <p className="review-rating">Rating: {'⭐'.repeat(review.rating)} ({review.rating}/5)</p>
      <p>{review.body}</p>
    </div>
  );
};