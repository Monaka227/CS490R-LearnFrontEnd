import React, { useState, useEffect } from 'react';
import './App.css';
import { ReviewList } from './components/ReviewList';
import { Header } from './components/Header';
import { GameDetails } from './components/GameDetails';

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
    <div className="App">
      <Header />
      
      <div className="app-content">
        {loading ? (
          <p className="status-message">Loading...</p>
        ) : selectedGameId ? (
          /* if game is selected, show the review page */
          <div>
            <button className="back-button" onClick={() => setSelectedGameId(null)}>
              ⬅ Back to Games
            </button>
            <GameDetails gameId={selectedGameId} />
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