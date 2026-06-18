import React, { useState, useEffect } from 'react';
import './App.css';
import { ReviewList } from './components/ReviewList';
import { Header } from './components/Header';
import { GameDetails } from './components/GameDetails';
import { Login } from './components/Login'; // week4
import { UpdateAccount } from './components/UpdateAccount'; // secure API
import { AddGame } from './components/AddGame'; // week5 
import './components/NavBar.css'; // for user bar styling
import { MyReviews } from './components/MyReviews';

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

  const [isShowingMyReviews, setIsShowingMyReviews] = useState(false); // state to toggle login form
  // when login is successful, save the token and user data to state
  const handleLoginSuccess = (token, user) => {
    setToken(token);
    setUser(user);
    setIsShowingLogin(false); // hide login form on successful login
    setIsShowingMyReviews(false);
  };

  // logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsEditingAccount(false); // exit account editing mode on logout
    setSelectedGameId(null); // go back to game list on logout
    setIsShowingMyReviews(false);
  };

  const handleGameAdded = (newGame) => {
    setGames((prevGames) => [newGame,...prevGames]);
  }

  const handleUpdateSuccess = (updatedUser) => {
    setUser(updatedUser);
  };

  // common helper to reset 
  const showHomeView = () => {
    setSelectedGameId(null);
    setIsEditingAccount(false);
    setIsShowingLogin(false);
    setIsShowingMyReviews(false);
  }

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
      <nav className="navbar">
        <div className="navbar-brand" onClick={showHomeView}>
          🎲 Tabletop Treasures
        </div>

      <div className="navbar-menu">
        {/* Game list */}
        <button 
            className={`nav-link ${(!isShowingLogin && !isEditingAccount && !isShowingMyReviews) ? 'active' : ''}`}
            onClick={showHomeView}
          >
            🏠 Home (Games)
        </button>

        {/* review management (only display if user is logged in) */}
          {token && (
            <button 
              className={`nav-link ${isShowingMyReviews ? 'active' : ''}`}
              onClick={() => {
                setIsShowingMyReviews(true);
                setIsEditingAccount(false);
                setIsShowingLogin(false);
                setSelectedGameId(null);
              }}
            >
              ✍️ My Reviews
            </button>
          )}

          {/* login page */}
          <div className="navbar-user-section">
            {token && user ? (
              <>
                <span>Welcome, {user.username}!</span>
                <button 
                  className={`nav-link ${isEditingAccount ? 'active' : ''}`}
                  onClick={() => {
                    setIsEditingAccount(!isEditingAccount);
                    setIsShowingLogin(false);
                    setIsShowingMyReviews(false);
                    setSelectedGameId(null);
                  }}
                >
                  {isEditingAccount ? 'View Games' : 'Edit Account'}
                </button>
                <button className="btn-logout" onClick={handleLogout} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <span>Welcome, Guest!</span>
                <button
                  className={`nav-link ${isShowingLogin ? 'active' : ''}`}
                  onClick={() => {
                    setIsShowingLogin(!isShowingLogin);
                    setIsEditingAccount(false);
                    setIsShowingMyReviews(false);
                    setSelectedGameId(null);
                  }}
                >
                  {isShowingLogin ? 'Back to Content' : 'Login / Sign Up'}
                </button>
              </>
            )}
          </div>
        </div>
      </nav>


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
        ) : 
        /* my review */
        isShowingMyReviews && token ? (
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
            <h2>📋 My Reviews</h2>
            <p style={{ color: '#718096' }}>Manage the reviews you have posted.</p>

            <MyReviews 
              token = {token}
              currentUserId={user?.id || user?._id} 
              onGameClick={(gameId) => {
                setSelectedGameId(gameId);
                setIsShowingMyReviews(false); 
              }} 
            />
          </div>
        ) :
        loading ? (
          <p className="status-message">Loading...</p>
        ) : selectedGameId ? (
          <div>
            <button className="back-button" onClick={() => setSelectedGameId(null)}>
              ⬅ Back to Games
            </button>
            <GameDetails 
              gameId={selectedGameId} 
              onGameDeleted={(deletedId) => {
                setGames((prevGames) => prevGames.filter(game => game.id !== deletedId));
                setSelectedGameId(null);
              }}
            />
          </div>
        ) : (
          <div>
            {/* if logged in and admin, show add game form */}
            { token && user?.role === 'admin' && (
              <AddGame onGameAdded={handleGameAdded} />
            )}
            <ReviewList reviews={games} onGameClick={setSelectedGameId} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;