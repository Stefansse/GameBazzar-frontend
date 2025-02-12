import React, { useState, useEffect } from 'react';
import { Modal, Input, Rate, Button } from 'antd';
import { FaSave } from 'react-icons/fa'; // Optional icon for saving

import '../ReviewEditModal.css'

const ReviewEditModal = ({ isVisible, review, onSave, onClose }) => {
  const [editedReviewText, setEditedReviewText] = useState('');
  const [editedRating, setEditedRating] = useState(5); // Default rating

  useEffect(() => {
    if (review) {
      setEditedReviewText(review.comment); // Populate review text
      setEditedRating(review.rating); // Populate rating
    }
  }, [review]);

  const handleSave = () => {
    if (editedReviewText && editedRating) {
      onSave(review.reviewId, editedRating, editedReviewText); // Pass updated review data

      // Close the modal after saving
      onClose();
    }
  };

  return (
    <Modal
    title={<span style={{ color: 'rgba(0,21,41,255)' }}>Edit Review</span>}
      visible={isVisible}
      onCancel={onClose}
      onOk={handleSave}
      okText="Save"
      cancelText="Cancel"
      cancelButtonProps={{
        style: {
          backgroundColor: 'gray', // Set background color
          borderColor: 'gray',     // Set border color
          color: 'white',          // Set text color
        },
      }}
      okButtonProps={{
        style: {
          backgroundColor: 'rgba(0,21,41,255)',
          borderColor: 'rgba(0,21,41,255)',
          color: 'white',
        },
      }}
    >
      <div className="custom-rate">
        <div>
          <label>Rating:</label>
          <Rate
            value={editedRating}
            onChange={(value) => setEditedRating(value)}
          />
        </div>
        <div>
          
          <Input.TextArea
          className="custom-textarea"
            value={editedReviewText}
            onChange={(e) => setEditedReviewText(e.target.value)}
            rows={4}
          />
        </div>
        {/* <Button 
          type="primary" 
          onClick={handleSave} 
          icon={<FaSave />}
        >
          Save Changes
        </Button> */}
      </div>
    </Modal>
  );
};

export default ReviewEditModal;
