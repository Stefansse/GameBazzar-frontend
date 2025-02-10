import React, { useState } from "react";
import { Modal, Button, List, Typography, Row, Col, Divider, message, InputNumber } from "antd";
import { DollarCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios'; // Add axios for HTTP requests
import { loadStripe } from '@stripe/stripe-js';



import { HighlightOutlined } from '@ant-design/icons';


import '../CartModal.css'

const { Text } = Typography;

const CartModal = ({ isOpen, setIsOpen, cart, setCart }) => {
  const token = localStorage.getItem("JWT");

  // Add the token to the Authorization header
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Function to fetch the cart from the backend
  const fetchCart = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/carts/${cart.cartId}`, { headers });
      if (response.data && response.data.cartItems) {
        setCart((prevCart) => ({
          ...prevCart,
          cartItems: response.data.cartItems,
        }));
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Function to handle item removal from the cart
  const handleRemoveItem = async (cartItemId) => {
    try {
      // Await the response from axios.delete
      const response = await axios.delete(`http://localhost:8080/api/carts/${cart.cartId}/remove/${cartItemId}`, { headers });

      // Check if the response contains the updated cart
      if (response.data && response.data.cartItems) {
        // Update the cart state with the new data after removal
        setCart((prevCart) => ({
          ...prevCart,
          cartItems: response.data.cartItems, // Assuming response.data contains updated cartItems
        }));

        // Reload the cart data
        fetchCart();

        // Display success message
        message.success('Item removed successfully!');
      } else {
        // Handle unexpected response structure
        message.error('Failed to update cart. Please try again later.');
      }
    } catch (error) {
      // Show error message if request fails
      message.error('Failed to remove item');
      console.error(error);
    }
  };

  // Function to handle quantity change
  const handleQuantityChange = async (cartItemId, quantity) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/carts/${cart.cartId}/update-quantity/${cartItemId}`,
        { newQuantity: quantity }, // Ensure backend expects "newQuantity"
        { headers }
      );
  
      if (response.data && response.data.cartItems) {
        setCart((prevCart) => ({
          ...prevCart,
          cartItems: response.data.cartItems,
        }));
        message.success('Quantity updated!');
      } else {
        message.error('Failed to update quantity. Please try again later.');
      }
    } catch (error) {
      message.error('Failed to update quantity');
      console.error(error);
    }
  };




  const handleClearCart = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/carts/${cart.cartId}/clear`,
        { headers }
      );
  
      if (response.status === 200) {
        setCart((prevCart) => ({
          ...prevCart,
          cartItems: [], // Clear the cart in the frontend state
        }));
        message.success('Cart cleared successfully!');
      } else {
        message.error('Failed to clear cart. Please try again later.');
      }
    } catch (error) {
      message.error('Failed to clear cart');
      console.error(error);
    }
  };


  // const handleCheckout = async () => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8080/api/carts/${cart.cartId}/checkout`,
  //       {}, // No request body needed
  //       { headers }
  //     );
  
  //     if (response.status === 200) {
  //       // Assuming the response contains the order details (OrderDTO)
        
  
  //       // Clear the cart in the frontend state
  //       setCart((prevCart) => ({
  //         ...prevCart,
  //         cartItems: [],
  //       }));
  
  //       // Show a success message with order details
  //       message.success(`Thank you for your purchase`);
  
  //       // Close the modal
  //       setIsOpen(false);
  //     } else {
  //       message.error('Failed to checkout. Please try again later.');
  //     }
  //   } catch (error) {
  //     message.error('Checkout failed. Please try again later.');
  //     console.error(error);
  //   }
  // };





  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/carts/${cart.cartId}/stripe-checkout`,
        {},
        { headers }
      );

      if (response.data && response.data.sessionId) {
        const { sessionId } = response.data;

        // Redirect to Stripe Checkout
        const stripePromise = loadStripe("pk_test_51QqGMaRsyDQvWXlwgGgPvHtJ0dpWYjO3zjbfDFVSFFXgDtJXDTCpF3WcFnaC8WPJg6KcOxJTV9XqJUXpEgt3bIkp002aLYfpcN");
        const stripe = await stripePromise
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
          message.error(`Checkout failed: ${error.message}`);
        }
      } else {
        message.error('Failed to create Stripe session. Please try again later.');
      }
    } catch (error) {
      message.error('Checkout failed. Please try again later.');
      console.error(error);
    }
  };
  
  
  

  return (
    <Modal
      title="Your Shopping Cart"
      visible={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={[
        <Button 
        key="clear" 
        onClick={handleClearCart} 
        className="clear-cart-btn"
        icon={<HighlightOutlined />}
      >
        
      </Button>,
        <Button 
          key="cancel" 
          onClick={() => setIsOpen(false)} 
          className="cancel-btn"
        >
          Close
        </Button>,
        <Button
          key="checkout"
          type="primary"
          onClick={handleCheckout}
          className="checkout-btn"
        >
          Checkout
        </Button>,
      ]}
      width={700}
      centered
      style={{ borderRadius: '10px' }}
    >
      {cart && cart.cartItems && cart.cartItems.length > 0 ? (
        <div>
          <List
            itemLayout="horizontal"
            dataSource={cart.cartItems}
            renderItem={(item) => (
              <List.Item
                key={item.cartItemId} // Ensure each item has a unique key
                style={{
                  padding: '16px 24px',
                  borderBottom: '1px solid #f0f0f0',
                  borderRadius: '10px',
                  backgroundColor: '#fafafa',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  marginBottom: '10px',
                }}
              >
                <List.Item.Meta
                  title={
                    <Text strong style={{ fontSize: '18px', color: '#333' }}>
                      {item.game.title}
                    </Text>
                  }
                  description={
                    <Row gutter={16}>
                      <Col span={12}>
                        <div className="quantity-input">
                          <Text style={{ fontSize: '14px', color: '#666' }}>
                            Quantity: 
                            <InputNumber
                              min={1}
                              value={item.quantity}
                              onChange={(value) => handleQuantityChange(item.cartItemId, value)}
                              style={{ marginLeft: '10px' }}
                            />
                          </Text>
                        </div>
                      </Col>
                      <Col span={12}>
                        <Text style={{ fontSize: '14px', color: '#666' }}>
                          Price: <DollarCircleOutlined /> ${item.game.price.toFixed(2)}
                        </Text>
                        {item.game.discount && (
                          <span className="discount-badge">
                            {item.game.discount.percentage}% OFF
                          </span>
                        )}
                      </Col>
                    </Row>
                  }
                  
                />
                <Button
                  icon={<DeleteOutlined />}
                  type="link"
                  onClick={() => handleRemoveItem(item.cartItemId)} // Use handleRemoveItem function
                  style={{
                    color: '#ff4d4f',
                    fontSize: '16px',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#e60000'}
                  onMouseLeave={(e) => e.target.style.color = '#ff4d4f'}
                />
              </List.Item>
            )}
          />
          <Divider />
          <Row justify="end" style={{ paddingRight: '20px' }}>
            <Col>
              <Text strong style={{ fontSize: '16px', color: 'rgba(0,21,41,255)' }}>Total: </Text>
              <Text style={{ fontSize: '20px', color: 'rgba(0,21,41,255)', fontWeight: 'bold' }}>
                {cart.cartItems.reduce((total, item) => {
                  const discountedPrice = item.game.discount
                    ? item.game.price - (item.game.price * item.game.discount.percentage) / 100
                    : item.game.price;
                  return total + discountedPrice * item.quantity;
                }, 0).toFixed(2)}$
              </Text>
            </Col>
          </Row>
        </div>
      ) : (
        <div className="empty-cart-message">
    Your cart is empty. Start shopping!
  </div>
      )}
    </Modal>
  );
};

export default CartModal;
