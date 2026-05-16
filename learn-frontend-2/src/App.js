import React from 'react';
import './App.css';

function App() {
  // dummy data for testing
  const dummyReviews = [
    {
      id: 1,
      title: "Catan",
      rating: 5,
      body: "An absolute classic! Gathering resources and trading with friends is always intense and fun."
    },
    {
      id: 2,
      title: "Terraforming Mars",
      rating: 4,
      body: "Great strategy game with high complexity. Building the engine feels extremely rewarding."
    },
    {
      id: 3,
      title: "Arboretum",
      rating: 4,
      body: "Beautiful artwork but deceptively brutal strategy. Highly recommend for card game lovers."
    }
  ];

  return (
    <div className="App">
      {/* add header and review list later */}
      <h1>Board Game Review Platform</h1>
      
      {/* testing */}
      <div className="review-list-preview">
        {dummyReviews.map((review) => (
          <div key={review.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{review.title}</h3>
            <p>Rating: {review.rating} / 5</p>
            <p>{review.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;