import React from 'react';
import { ReviewCard } from './ReviewCard';

export const ReviewList = ({ reviews, onGameClick }) => {
  return (
    <div className="review-list">
      <h2>Available Board Games</h2>
      {reviews.map((game) => (
        <ReviewCard 
          key={game._id} 
          review={game} 
          // if card is clicked, set the selected game ID to the clicked game's ID
          onCardClick={() => onGameClick(game._id)} 
        />
      ))}
    </div>
  );
};