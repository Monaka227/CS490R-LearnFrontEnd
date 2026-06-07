import React, { useState, useEffect } from 'react';
import './App.css';
import { ReviewList } from './components/ReviewList';
import { Header } from './components/Header';
import { GameDetails } from './components/GameDetails';
import { Login } from './components/Login'; // week4
import { UpdateAccount } from './components/UpdateAccount'; // secure API


function App() {
  // make a state to keep the game lists
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGameId, setSelectedGameId] = useState(null);

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isEditingAccount, setIsEditingAccount] = useState(false); // state to toggle account update form
  const [isShowingLogin, setIsShowingLogin] = useState(false); // state to toggle login form

  // when login is successful, save the token and user data to state
  const handleLoginSuccess = (token, user) => {
    setToken(token);
    setUser(user);
    setIsShowingLogin(false); // hide login form on successful login
  };

  // logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsEditingAccount(false); // exit account editing mode on logout
    setSelectedGameId(null); // go back to game list on logout
  };

  const handleUpdateSuccess = (updatedUser) => {
    setUser(updatedUser);
  };

  // use useEffect to fetch the game list from the backend when the component mounts
  // update: fetch games if user was not logged in.
useEffect(() => {
    // if (!token) return; // if not logged in, don't fetch games

    setLoading(true);
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
      
      
      <div className="user-bar" style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px', background: '#f8f9fa', justifyContent: 'flex-end' }}>
        {token && user ? (
          <>
            <span>Welcome, {user.username}!</span>
            <button onClick={() => setIsEditingAccount(!isEditingAccount)} style={{ background: '#34495e', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                {isEditingAccount ? 'View Games' : 'Edit Account'}
            </button>
            <button className="logout-button" onClick={handleLogout} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <span>Welcome, Guest!</span>
            <button onClick={() => setIsShowingLogin(!isShowingLogin)} style={{ background: '#2ecc71', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              {isShowingLogin ? 'Back to Content' : 'Login / Sign Up'}
            </button>
          </>
        )}
      </div>


      <div className="app-content">
        {/* if editing account, show update form */}
        {isShowingLogin && !token ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) :
        isEditingAccount ? (
          <UpdateAccount 
            onUpdateSuccess={handleUpdateSuccess} 
            onCancel={() => setIsEditingAccount(false)} 
          />
        ) : loading ? (
          <p className="status-message">Loading...</p>
        ) : selectedGameId ? (
          <div>
            <button className="back-button" onClick={() => setSelectedGameId(null)}>
              ⬅ Back to Games
            </button>
            <GameDetails gameId={selectedGameId} />
          </div>
        ) : (
          <ReviewList reviews={games} onGameClick={setSelectedGameId} />
        )}
      </div>
    </div>
  );
}

export default App;