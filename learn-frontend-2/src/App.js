import React, { useState, useEffect } from 'react';
import './App.css';
import { ReviewList } from './components/ReviewList';
import { Header } from './components/Header';

function App() {
  // make a state to keep the game lists
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedGameId, setSelectedGameId] = useState(null);


  // use useEffect to fetch the game list from the backend when the component mounts
useEffect(() => {
    // get the game list from the backend API
    fetch('http://localhost:3000/api/games')
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App" style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '40px' }}>
      <Header />
      
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        {loading ? (
          <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading...</p>
        ) : selectedGameId ? (
          /* if game is selected, show the review page */
          <div>
            <button onClick={() => setSelectedGameId(null)} style={{ margin: '20px 0', padding: '8px 16px' }}>
              ⬅ Back to Games
            </button>
            {/* out review componets later */}
            <p>Game ID: {selectedGameId} 's reviews. Create this page later</p>
          </div>
        ) : (
          /* if no game is selected, show the game list */
          /* pass the function to set the selected game ID as a prop */
          <ReviewList reviews={games} onGameClick={setSelectedGameId} />
        )}
      </div>
    </div>
  );
}

export default App;