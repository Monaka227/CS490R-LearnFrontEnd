import React from 'react';
import { ReviewCard } from './ReviewCard';

// receive "reviews" as a props from App.js
export const ReviewList = ({ reviews }) => {
    return (
        <div className="review-list">
            <h2>Reviews</h2>
            {/* loop through reviews and display each one */}
            {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
            ))}
        </div>
    )
}