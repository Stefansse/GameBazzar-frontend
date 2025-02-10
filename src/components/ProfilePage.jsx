import React, { useEffect, useState } from 'react';
import { Avatar, Button, Typography, Card, Space, Tag, List } from 'antd';
import { Link } from 'react-router-dom';
import userImage from '../images/test.jpg';
import '../ProfilePage.css';
import { SettingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { FaCrosshairs, FaGamepad, FaBasketballBall } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { YoutubeOutlined } from '@ant-design/icons';

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [orders, setOrders] = useState([]); // State to store orders
  const [currentView, setCurrentView] = useState("profile"); // Track the current view (profile, reviews, or orders)

  const navigate = useNavigate();

  const userEmail = localStorage.getItem("email");
  const userId = localStorage.getItem('userId');
  const dateJoined = localStorage.getItem("dateJoined");

  useEffect(() => {
    const rawToken = localStorage.getItem("JWT");
    const token = rawToken.replace(/"/g, ''); // Remove extra quotes if any

    // Fetch reviews
    if (token && userId) {
      axios
        .get(`http://localhost:8080/api/reviews/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setReviews(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
          setLoading(false);
        });
    } else {
      console.error("No token or user ID found");
      setLoading(false);
    }

    // Fetch orders
    if (token && userId) {
      axios
        .get(`http://localhost:8080/api/orders/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setOrders(response.data); // Set the orders data
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }
  }, [userId]);

  const formatUsername = (email) => {
    const username = email.split('@')[0];
    const formattedUsername = username
      .split('.')
      .map((word, index) => 
        (index === 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word.toLowerCase())
      )
      .join(' ')
      .replace(/"/g, '');
    return formattedUsername;
  };

    
  const formatDate = (date) => new Date(date).toLocaleDateString();

  return (
    <div className="profile-page">
      {/* Profile Card and Navbar */}
      <Card className="profile-card">
        <Avatar
          className="profile-avatar"
          src={userImage || 'https://default-avatar-image.jpg'}
          size={100}
          alt="User Avatar"
        />
        <Typography.Title level={3}>
          {userEmail ? formatUsername(userEmail) : 'Guest'}
        </Typography.Title>
        <Typography.Paragraph italic>
          Dont be mad, go to work
        </Typography.Paragraph>
        <Typography.Paragraph>
          <strong>Member since: </strong>{formatDate(dateJoined)}
        </Typography.Paragraph>

        <div className="profile-navbar">
          <Button onClick={() => setCurrentView("profile")}>Dashboard</Button>
          <Button onClick={() => setCurrentView("reviews")}>My Reviews</Button>
          <Button onClick={() => setCurrentView("orders")}>My Orders</Button>
          <Button className="settings-button">
            <Link to="/settings" className="settings-text">
              <SettingOutlined />
            </Link>
          </Button>
          <Button className="moving">
            <Link to="/partnershiplist">Partnership</Link>
          </Button>
        </div>
      </Card>

      {/* Conditional Content Below Navbar */}
      {currentView === "profile" && (
        <>
          {/* Favorite Genres */}
          <Card className="profile-card profile-tags">
            <Typography.Title level={4}>My Favorite Genres</Typography.Title>
            <Space size="middle">
              <Tag color="gray" icon={<FaCrosshairs />}>FPS</Tag>
              <Tag color="green" icon={<FaGamepad />}>MMORPG</Tag>
              <Tag color="red" icon={<FaBasketballBall />}>Sports</Tag>
            </Space>
          </Card>

          {/* Sales Boosting Tips */}
          <Card className="profile-card sales-tips">
            <Typography.Title level={4}>5 Tips to Boost Your Sales</Typography.Title>
            <List
              size="small"
              bordered
              dataSource={[
                'Share your affiliate link on social media',
                'Use appealing visuals with your affiliation link',
                'Share pages by to the end of any URL',
                'Create a wishlist and share with followers',
                'Promote Steam, PlayStation, and Gift Cards',
              ]}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </>
      )}

      {currentView === "reviews" && (
        <div className="review-section">
          {loading ? (
            <Typography.Paragraph>Loading reviews...</Typography.Paragraph>
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <Card className="review-card" key={review.reviewId}>
                {/* Game Image and Title */}
                <div className="game-info">
                  <img
                    src={review.gameImageUrl || "/placeholder.jpg"} 
                    alt={review.gameName || "Game Image"}
                    className="game-image"
                    onClick={() => navigate(`/game/${review.gameId}`)} // Navigate on click
                  />
                  <Typography.Title level={5} className="small-title">
                    {review.gameName || "Unknown Game"}
                  </Typography.Title>
                </div>

                {/* Review Content */}
                <Typography.Title level={4}>{review.comment}</Typography.Title>
                <Typography.Paragraph>{review.body}</Typography.Paragraph>

                {/* Review Meta Information */}
                <div className="review-meta">
                  <span className="author">{review.author}</span> |{' '}
                  <span className="date">
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </span>
                </div>
              </Card>
            ))
          ) : (
            <Typography.Paragraph>No reviews available.</Typography.Paragraph>
          )}
        </div>
      )}

     {/* Orders Section */}
     {currentView === "orders" && (
  <div className="orders-section">
    {orders.length === 0 ? (
      <Typography.Paragraph>No orders available.</Typography.Paragraph>
    ) : (
      orders.map((order) => {
        let totalAmount = order.totalAmount;  // Use the totalAmount from the backend

        return (
          <Card className="order-card" key={order.orderId}>
            <Typography.Title level={4}>Order ID: {order.orderId}</Typography.Title>
            <Typography.Paragraph><strong>Status:</strong> {order.status}</Typography.Paragraph>
            <Typography.Paragraph><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Amount:</strong> {totalAmount.toFixed(2)}$
            </Typography.Paragraph>
            <Typography.Paragraph><strong>Order Size:</strong> {order.orderSize}</Typography.Paragraph>

            {/* Display the ordered game(s) */}
            {order.orderItems.map((orderItem) => (
              <div key={orderItem.orderItemId} className="order-item">
                <Typography.Title level={5}>{orderItem.game.title}</Typography.Title>
                <img 
                  src={orderItem.game.imageUrl} 
                  alt={orderItem.game.title} 
                  style={{ maxWidth: '200px', marginBottom: '10px' }}
                  onClick={() => navigate(`/game/${orderItem.game.gameId}`)} // Navigate on click 
                />
                <Typography.Paragraph><strong>Quantity:</strong> {orderItem.quantity}</Typography.Paragraph>
                <Typography.Paragraph><strong>Price:</strong> {orderItem.orderItemPrice.toFixed(2)}$</Typography.Paragraph> {/* Display the price with discount */}

                <a href={orderItem.game.trailerUrl} target="_blank" rel="noopener noreferrer">
                  <Button type="dark" icon={<YoutubeOutlined />} />
                </a>
              </div>
            ))}
          </Card>
        );
      })
    )}
  </div>
)}
    </div>
  );
};

export default ProfilePage;
