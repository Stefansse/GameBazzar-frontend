import React, { useState } from 'react';
import { FaStar, FaTimes } from 'react-icons/fa';
import '../ReviewModal.css';

const ReviewModal = ({ isOpen, onClose, onSubmit, reviewText, setReviewText, rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!rating) {
      setError('Please select a rating');
      return;
    }
    if (!reviewText.trim()) {
      setError('Please write a review');
      return;
    }
    onSubmit();
    setError('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
        <h2 style={{ textDecoration: 'none' }}>Write a Review</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <div className="rating-section">
          <label>Rating:</label>
          <div className="star-container">
            {[...Array(10)].map((_, index) => {
              const ratingValue = (index + 1) / 2; // Allows half-star ratings (0.5-5.0)
              return (
                <label
                  key={index}
                  onMouseEnter={() => setHoverRating(ratingValue)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    style={{ display: 'none' }}
                  />
                  <FaStar
                    className="star"
                    color={
                      ratingValue <= (hoverRating || rating) 
                        ? 'rgba(0,21,41,255)' 
                        : '#e4e5e9'
                    }
                    size={28}
                  />
                </label>
              );
            })}
          </div>
          <div className="rating-display">
            {rating.toFixed(1)} / 5.0
          </div>
        </div>

        <div className="review-section">
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your experience with this game..."
            rows="5"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="submit-button" onClick={handleSubmit}>
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;