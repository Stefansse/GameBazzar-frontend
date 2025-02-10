import React, { useEffect, useState } from 'react';
import { Card, Button, Spin, Avatar, Dropdown, Menu, Badge, Select, Input } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../HomePage.css';  // Import the HomePage CSS
import '../GameCard.css';  // Import the GameCard CSS
import { Tooltip } from 'antd';

import { useAuth } from './AuthContext'; // Import your AuthProvider context

const { Option } = Select; // Ant Design Select component

const HomePage = () => {
  const { user, logout } = useAuth();
  const [games, setGames] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState(""); // State to hold selected genre
  const [publisher, setPublisher] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  const FEATURED_GAME_IDS = [1, 2, 3, 4, 5, 6, 7, 8]; // Replace with actual IDs

  useEffect(() => {
    const fetchGamesAndDiscounts = async () => {
        try {
            setLoading(true);

            // Retrieve the JWT token from local storage
            const token = localStorage.getItem("JWT");

            // Add the token to the Authorization header
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            let gameResponse;

            // Fetch all games if no filters are selected
            if (!genre && !publisher) {
                gameResponse = await axios.get("http://localhost:8080/api/games/all", {
                    headers,
                });
            } 
            // Apply filters (genre or publisher or both)
            else {
                gameResponse = await axios.post(
                    "http://localhost:8080/api/games/filter",
                    { genre, publisher },
                    { headers }
                );
            }

            // Fetch discounts
            const discountResponse = await axios.get("http://localhost:8080/api/discounts", {
                headers,
            });

            // Assuming you are filtering out featured games based on gameId
            const featuredGames = gameResponse.data.filter((game) =>
                FEATURED_GAME_IDS.includes(game.gameId)
            );

            setGames(featuredGames);
            setDiscounts(discountResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchGamesAndDiscounts();
}, [genre, publisher]);
// Re-fetch whenever genre or publisher changes

  const handleSignOut = () => {
    logout();  // Call logout from the context provider
  };

  const handleResetFilters = () => {
    setGenre(""); // Reset genre filter
    setPublisher(""); // Reset publisher filter
  };

  const menu = (
    <Menu>
      <Menu.Divider />
      <Menu.Item key="profile">
        <Link to="/profile" style={{ textDecoration: 'none' }}>My Profile</Link>
      </Menu.Item>
      <Menu.Item key="signout" onClick={handleSignOut}>
        Sign Out
      </Menu.Item>

      <Menu.Item key="cart" onClick={() => setIsModalCartOpen(true)}>
        My Cart
      </Menu.Item>
      <Menu.Item key="wishlist" onClick={() => setIsModalWishlistOpen(true)}>
        My Wishlist
      </Menu.Item>
    </Menu>
  );
  const formatPriceWithDiscount = (price, discountPercentage) => {
    return (price - (price * discountPercentage) / 100).toFixed(2);
  };

  const formatUsername = (email) => {
    const username = email.split('@')[0];
    const formattedUsername = username
      .split('.')  // Split by the dot
      .map((word, index) =>
        (index === 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word.toLowerCase())
      )
      .join(' ')  // Join the words with a space
      .replace(/"/g, '');  // Remove any quotes if present
    return formattedUsername;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" /> Loading games...
      </div>
    );
  }

  return (
    <div className="homepage-container">
      {user && (
        <div className="top-right-corner">
          <Dropdown overlay={menu} trigger={['click']}>
            <div className="avatar-container">
              <Avatar
                style={{ backgroundColor: "rgba(0,21,41,255)" }}
                src={'https://default-avatar-image.jpg'}
                alt="User Avatar"
                className="avatar-clickable"
              />
              <div className="avatar-glow"></div>
            </div>
          </Dropdown>
          {user.email && (
            <span className="email-style">
              <span>{formatUsername(user.email)}</span>
            </span>
          )}
        </div>
      )}

      {/* Genre filter dropdown */}
      <div className="genre-filter">
        <Select
          value={genre}
          onChange={(value) => setGenre(value)}
          style={{ width: 200, marginRight: '90px' }}
          placeholder="Select Genre"
        >
          <Option value="">
            <Tooltip title="Filter by Genre">All</Tooltip>
          </Option>
          <Option value="ACTION">Action</Option>
          <Option value="ADVENTURE">Adventure</Option>
          <Option value="FPS">FPS</Option>
          <Option value="SPORTS">Sports</Option>
          <Option value="STRATEGY">STRATEGY</Option>
          <Option value="ROLE_PLAYING">RPG</Option>
          <Option value="SIMULATION">Simulation</Option>
          
        </Select>

        <div className="filter-item">
          <Select
            value={publisher}
            onChange={(value) => setPublisher(value)}
            style={{ width: 200 }}
            placeholder="Select Publisher"
          >
            <Option value="">
              <Tooltip title="Filter by Publisher">All</Tooltip>
            </Option>
            <Option value="Steam">Steam</Option>
            <Option value="Riot">Riot Games</Option>
            <Option value="Epic">Epic Games</Option>
            <Option value="Rockstar">Rockstar Games</Option>
            <Option value="Sony">Sony</Option>
          </Select>
        </div>

        <Button onClick={handleResetFilters} style={{ marginLeft: 20, fontSize: '12px', position: 'relative', left: "420px" }} type="default">
          Reset Filters
        </Button>
      </div>

      {/* Search Bar */}
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for games..."
        style={{
          width: 300,
          marginBottom: '20px',
          fontSize: '14px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          position: 'relative',
          bottom: "100px",
          left: "300px"
        }}
      />

      <h1 className="featured-title">Featured Games</h1>
      <div className="card-grid">
        {games
          .filter((game) => 
            game.title.toLowerCase().includes(searchTerm.toLowerCase()) // Search filter
          )
          .map((game) => {
            const discount = discounts.find(d => d.gameId === game.gameId);
            const isDiscounted = !!discount;

            return (
              <Badge.Ribbon
                text={isDiscounted ? `${discount.percentage}% OFF` : null}
                color="rgba(0,21,41,255)"
                key={game.gameId}
              >
                <Card
                  title={
                    <Link
                      to={`/game/${game.gameId}`}
                      style={{ color: 'rgba(0, 21, 41, 1)', textDecoration: 'none' }}
                    >
                      {game.title}
                    </Link>
                  }
                  bordered={false}
                  style={{
                    width: 300,
                    borderRadius: '10px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                  cover={
                    <div className="game-card-image" style={{ position: 'relative' }}>
                      <img alt="game cover" src={game.imageUrl} className="game-card-img" />
                      {game.trailerUrl && (
                        <div className="game-trailer-overlay">
                          <iframe
                            className="game-video"
                            src={game.trailerUrl}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      )}
                    </div>
                  }
                >
                  <div className="game-card-body">
                    <div className="game-footer">
                      <p className="price">
                        {isDiscounted
                          ? `$${formatPriceWithDiscount(game.price, discount.percentage)}`
                          : game.price === 0
                          ? 'Free'
                          : `$${game.price}`}
                      </p>
                     
                    </div>
                  </div>
                </Card>
              </Badge.Ribbon>
            );
          })}
      </div>
    </div>
  );
};

export default HomePage;
