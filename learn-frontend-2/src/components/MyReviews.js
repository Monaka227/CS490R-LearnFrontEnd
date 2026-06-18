import React, { useState, useEffect } from 'react';

export const MyReviews = ({ currentUserId, token, onGameClick }) => {
  const [myReviewsList, setMyReviewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    setLoading(true);
    setErrorMsg(null);
    
    // sent GET api/reviews
    // to avoid 400
    fetch('http://localhost:3000/api/reviews', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with status ${res.status}. This is likely due to 'reviewValidationRules' on the backend GET route.`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("=== MyReviews Fetch Success ===");
        console.log("Raw Reviews Data from Backend:", data);

        if (Array.isArray(data)) {
          // filtering reviews if id match or not
          const filtered = data.filter((rev) => {
            const revUser = rev.user_id;
            const reviewerId = typeof revUser === 'object' && revUser !== null
              ? (revUser._id || revUser.id)
              : revUser;
            
            return String(reviewerId).trim() === String(currentUserId).trim();
          });
          setMyReviewsList(filtered);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setErrorMsg(err.message);
        setLoading(false);
      });
  }, [currentUserId, token]);

  if (loading) {
    return <p style={{ textAlign: 'center', padding: '20px', color: '#718096' }}>Loading your reviews...</p>;
  }

  // for debugging (made by AI)
  if (errorMsg && errorMsg.includes('400')) {
    return (
      <div style={{ textAlign: 'center', padding: '30px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', marginTop: '20px' }}>
        <p style={{ fontSize: '16px', color: '#e53e3e', fontWeight: 'bold' }}>ℹ️ Backend validation rule restriction detected.</p>
        <p style={{ fontSize: '14px', color: '#4a5568', margin: '10px 0' }}>
          Please temporary remove <code>reviewValidationRules</code> from <code>router.get('/', ...)</code> in your backend <code>routes/reviewRoutes.js</code> to unlock full list.
        </p>
        <div style={{ background: '#f7fafc', padding: '15px', borderRadius: '6px', fontSize: '13px', textAlign: 'left', border: '1px solid #e2e8f0', color: '#4a5568' }}>
          <strong>How to fix backend (Recommended):</strong><br/>
          Change line 11 in <code>routes/reviewRoutes.js</code> to:<br/>
          <code style={{color: '#9b2c2c'}}>router.get('/', reviewController.getAllReviews);</code> <span style={{color: '#2f855a'}}>(Remove reviewValidationRules)</span>
        </div>
      </div>
    );
  }

  if (myReviewsList.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#718096', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', marginTop: '20px' }}>
        <p style={{ fontSize: '18px', margin: 0, fontWeight: 'bold' }}>📝 You haven't posted any reviews yet.</p>
        <p style={{ fontSize: '14px', marginTop: '10px' }}>Go to the Home page, select a game, and share your thoughts!</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
      {myReviewsList.map((rev) => {
        // 💡 バックエンドに合わせてプロパティをマッピング (comment ではなく body を使用)
        const targetGameId = rev.game_id;
        const reviewTitle = rev.title || "Review";
        const reviewBody = rev.body || ""; 

        return (
          <div 
            key={rev._id || rev.id} 
            style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderLeft: '5px solid #3498db' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: '#2c3e50' }}>{reviewTitle}</h3>
              {targetGameId && (
                <button 
                  onClick={() => onGameClick(targetGameId)}
                  style={{ background: '#ebf8ff', color: '#2b6cb0', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                >
                  🎯 View Game
                </button>
              )}
            </div>

            <div style={{ color: '#f1c40f' }}>
              {'⭐'.repeat(rev.rating || 5)} <span style={{ color: '#718096', fontSize: '13px' }}>({rev.rating}/5)</span>
            </div>
            
            <p style={{ margin: '5px 0', color: '#4a5568', lineHeight: '1.5', fontSize: '15px' }}>{reviewBody}</p>
            
            {rev.createdAt && (
              <span style={{ fontSize: '11px', color: '#a0aec0', marginTop: '5px' }}>
                Posted on: {new Date(rev.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};