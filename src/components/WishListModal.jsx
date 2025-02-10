import React, { useState } from "react";
import { Modal, Row, Col, Button, message } from "antd";
import { DeleteOutlined, HighlightOutlined } from '@ant-design/icons';
import axios from 'axios'; // Add axios for HTTP requests
import "../WishListModal.css";





const WishListModal = ({ isOpen, setIsOpen, wishlist, setWishlist }) => {
  const token = localStorage.getItem("JWT");
  const headers = {
    Authorization: `Bearer ${token}`,
  };


  // Function to remove an item from the wishlist
  

  // Function to clear the entire wishlist
  const handleClearWishlist = async () => {

    wishlist = localStorage.getItem('wishListId');
    try {
      const response = await axios.post(
        `http://localhost:8080/api/wishlists/clear/${wishlist}`, {}, {headers}
      );
      if (response.status === 204) {
        setWishlist([]);
        message.success('Wishlist cleared successfully!');
      } else {
        message.error('Failed to clear wishlist');
      }
    } catch (error) {
      message.error('Error clearing wishlist');
      console.error(error);
    }
  };

  return (
    <Modal
      title="Your Wishlist"
      visible={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={[
        <Button 
          key="clear" 
          onClick={handleClearWishlist} 
          className="clear-wishlist-btn"
          icon={<HighlightOutlined />}
        >
          Clear Wishlist
        </Button>,
        <Button 
          key="cancel" 
          onClick={() => setIsOpen(false)} 
          className="cancel-btn"
        >
          Close
        </Button>,
      ]}
      width={700}
      centered
      style={{ borderRadius: '10px' }}
    >
      {wishlist && wishlist.length > 0 ? (
        <Row gutter={[16, 16]} justify="center">
          {wishlist.map((item) => (
            <Col span={24} key={item.game.gameId}>
              <div className="wishlist-item">
                <img
                  className="wishlist-image"
                  src={item.game.imageUrl}
                  alt={item.game.title}
                />
                <div className="wishlist-details">
                  <h3 className="wishlist-title">{item.game.title}</h3>
                  <p className="wishlist-quantity">
                    {item.quantity >= 1 ? (
                      <span className="available-status">Available</span>
                    ) : (
                      <span className="out-of-stock">Out of Stock</span>
                    )}
                  </p>
                </div>
               
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No items in wishlist</p>
      )}
    </Modal>
  );
};

export default WishListModal;
