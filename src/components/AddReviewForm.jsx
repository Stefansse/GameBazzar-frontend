import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../AddReviewForm.css';

import { useAuth } from './AuthContext';

const AddReviewForm = () => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5); // Default rating
  const navigate = useNavigate();
  const { gameId } = useParams(); // Get gameId from route params
  const { user } = useAuth();
  const token = localStorage.getItem('JWT');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = () => {
    if (token) {
      setIsLoggedIn(true); // If token is found, set logged-in state to true
    }
    if (!user || !user.userId) {
      alert('User is not logged in.');
      return;
    }
    if (!reviewText.trim()) {
      alert('Review text cannot be empty.');
      return;
    }

    const reviewData = {
      gameId,
      userId: user.userId,
      comment: reviewText,
      rating,
      reviewDate: new Date().toISOString(),
    };

    axios.post('http://localhost:8080/api/reviews/create', reviewData)
      .then(() => {
        alert('Your review has been submitted!');
        navigate(-1); // Navigate back to the previous page
      })
      .catch((error) => {
        console.error('Error adding review:', error);
        alert('There was an error submitting your review.');
      });
  };

  return (
    <div className="add-review-form">
      <h2>Post Your Review</h2>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review here..."
        rows="6"
        cols="50"
      />
      <br />
      <label>
        Rating: 
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5,6,7,8,9,10].map((r) => (
            <option key={r} value={r}>
              {r}{r > 1}
            </option>
          ))}
        </select>
      </label>
      <br />
      <div className="form-actions">
        <button onClick={handleSubmit}>Submit Review</button>
        <button className="cancel" onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  );
};

export default AddReviewForm;
