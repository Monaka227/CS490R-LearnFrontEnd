import React from 'react';

// receive "review"" as a props from review list
export const ReviewCard = ({ review }) => {
    return (
        <div className="review-card" style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', borderRadius: '5px' }}>
            <h3>{review.title}</h3>
            <p style={{ color: '#f39c12' }}>Rating: {'⭐'.repeat(review.rating)} ({review.rating}/5)</p>
            <p>{review.body}</p>
        </div>
    )
}