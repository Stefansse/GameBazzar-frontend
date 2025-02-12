import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../GameDetails.css'; // External CSS file for styling
import '@fortawesome/fontawesome-free/css/all.min.css';

import { Avatar, Menu, Dropdown } from 'antd';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'; // Import the icons
import { useNavigate } from 'react-router-dom';



import ReviewModal from './ReviewModal'; // Import the modal component
import CartModal from './CartModal';
import WishListModal from './WishListModal';


import { Link } from 'react-router-dom';


import ReviewEditModal from './ReviewEditModal';



//const [cart, setCartState] = useState(null); // State to hold the cart data
//const [isCartModalOpen, setIsCartModalOpen] = useState(false); 

import { useAuth } from './AuthContext';


const GameDetails = ({ }) => {
  const { id } = useParams(); // Get game ID from the URL
  const [game, setGame] = useState(null);
  const [discounts, setDiscounts] = useState([]); // State to hold discounts
  const [reviews, setReviews] = useState([]); // State to hold reviews
  const [users, setUsers] = useState([]); // State to hold user information for reviews
  const [isReadMore, setIsReadMore] = useState(false); // State to toggle description
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isModalCartOpen, setIsModalCartOpen] = useState(false);
  const [isModalWishlistOpen, setIsModalWishlistOpen] = useState(false); // State for controlling wishlist modal visibility
  const [reviewText, setReviewText] = useState(''); // State for review text
  const [rating, setRating] = useState(5); // State for review rating
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);


  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);



  const { user, logout } = useAuth();
  

  const [quantity, setQuantity] = useState(1); // Initial quantity state

  const token = localStorage.getItem('JWT')?.replace(/^"|"$/g, '').trim() || '';

  useEffect(() => {


    
    if (token) {
      setIsLoggedIn(true); // If token is found, set logged-in state to true
    }



    // Add the token to the Authorization header
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Fetch game details by ID
    axios.get(`http://localhost:8080/api/games/${id}`, {headers})
      .then(response => {
        setGame(response.data);
      })
      .catch(error => console.error('Error fetching game details:', error));

    // Fetch discounts
    axios.get('http://localhost:8080/api/discounts', {headers})
      .then(discountResponse => {
        setDiscounts(discountResponse.data);
      })
      .catch(error => console.error('Error fetching discounts:', error));

    // Fetch reviews for the game
    axios.get(`http://localhost:8080/api/reviews/game/${id}`, {headers})
      .then(response => {
        setReviews(response.data);
        const userIds = response.data.map(review => review.userId);

        // Fetch users based on userIds (using a batch request)
        axios.get(`http://localhost:8080/api/users/all`, {
         headers
        })
          .then(userResponse => {
            setUsers(userResponse.data); // Store users information
          })
          .catch(error => console.error('Error fetching user data:', error));
      })
      .catch(error => console.error('Error fetching game reviews:', error));
  }, [id]);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore); // Toggle full description
  };


  


   // Add item to the cart
  const addToCart = () => {
    const cartId = localStorage.getItem('cartId'); // Assuming you store cartId in localStorage
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `http://localhost:8080/api/carts/${cartId}/add`,
        { gameId: id, quantity: quantity },
        { headers }
      )
      .then((response) => {
        setCart(response.data); // Update the cart state
        setIsModalCartOpen(true); // Show the modal with the updated cart
      })
      .catch((error) => console.error('Error adding game to cart:', error));
  };

  

  const handleAddReview = () => {
    if (!isLoggedIn) {
      // Redirect to the login page if the user is not logged in
      navigate('/login');
    } else {
      // Open the modal for adding a review
      setIsModalOpen(true);
    }
  };



  const handleEditClick = (review) => {
    setSelectedReview(review);
    setIsEditModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedReview(null);
  };


  

  const handleSubmitReview = () => {
    if (!user || !user.userId) {
      alert("You must be logged in to submit a review.");
      return;
    }
  
    if (reviewText) {
      const reviewData = {
        gameId: game.gameId, // The current game's ID
        userId: user.userId, // The logged-in user's ID
        comment: reviewText, // The review text provided by the user
        rating: rating, // The selected rating
        reviewDate: new Date().toISOString(), // Date of the review
      };

      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      // Make an API call to save the review
      axios.post('http://localhost:8080/api/reviews/create', reviewData, {headers})
        .then(response => {
          alert('Your review has been submitted!');
          // Fetch updated reviews and user data
          axios.get(`http://localhost:8080/api/reviews/game/${id}`, {headers})
            .then(response => {
              setReviews(response.data); // Update the reviews state
              const userIds = response.data.map(review => review.userId);
  
              // Fetch updated user data
              axios.get(`http://localhost:8080/api/users/all`, {headers})
                .then(userResponse => {
                  setUsers(userResponse.data); // Update the users state
                })
                .catch(error => console.error('Error fetching updated user data:', error));
            })
            .catch(error => console.error('Error fetching updated reviews:', error));
  
          setIsModalOpen(false); // Close the modal
          setReviewText(''); // Clear the review text
          setRating(5); // Reset the rating
        })
        .catch(error => {
          console.error('Error adding review:', error);
          alert('There was an error submitting your review.');
        });
    }
  };




 

  const handleUpdateReview = (reviewId, updatedRating, updatedComment) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  
    const updatedReviewData = {
      rating: updatedRating,
      comment: updatedComment,
    };
  
    axios
      .put(`http://localhost:8080/api/reviews/update/${reviewId}`, updatedReviewData, { headers })
      .then(() => {
        
        // Refresh reviews
        axios.get(`http://localhost:8080/api/reviews/game/${id}`, { headers })
          .then((res) => setReviews(res.data))
          .catch((err) => console.error("Error fetching updated reviews:", err));
      })
      .catch((error) => {
        console.error("Error updating review:", error);
        alert("Failed to update review.");
      });
  };




  const handleDeleteReview = (reviewId) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  
    axios
      .delete(`http://localhost:8080/api/reviews/delete/${reviewId}`, { headers })
      .then(() => {
       
        // Refresh reviews
        setReviews((prevReviews) => prevReviews.filter((review) => review.reviewId !== reviewId));
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
        alert("Failed to delete review.");
      });
  };
  




  const addToWishlist = () => {
    const wishlistId = localStorage.getItem('wishListId'); // Retrieve wishlistId from localStorage
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    
    const randomQuantity = Math.random() < 0.5 ? 0 : 1;
    setQuantity(randomQuantity);

    // Create the request body
    const requestBody = {
      gameId: id,        // Include the gameId
      quantity: randomQuantity        // You can set the quantity to 1 (or another value) for adding to wishlist
    };
  
    axios
      .post(
        `http://localhost:8080/api/wishlists/${wishlistId}/add`, // Use the updated endpoint with wishlistId in the path
        requestBody, // Send only the gameId and quantity in the request body
        { headers }
      )
      .then((response) => {
        setWishlist(response.data.wishlistItems); // Make sure to set wishlistItems here
        ; // Update the wishlist state with the response
        setIsModalWishlistOpen(true); // Open the modal to show updated wishlist
      })
      .catch((error) => {
        console.error('Error adding game to wishlist:', error);
      });
  };




  const handleSignOut = () => {
    logout();
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

  
  const formatUsername = (email) => {
    const username = email.split('@')[0];
    return username
      .split('.')
      .map((word, index) =>
        index === 0 
          ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() 
          : word.toLowerCase()
      )
      .join(' ')
      .replace(/"/g, '');
  };

  


  if (!game) {
    return <div className="loading">Loading game details...</div>;
  }

  // Calculate the discounted price if applicable
  const gameDiscount = game.discount && discounts.find(dis => dis.id === game.discount.id);
  const discountedPrice = gameDiscount ? game.price * (1 - gameDiscount.percentage / 100) : null;

  function getOrdinalDateWithTime(date) {
    // Format the date with ordinal suffix
    const day = new Date(date).getDate();
    const suffix = ['th', 'st', 'nd', 'rd'][((day % 10) > 3 || [11, 12, 13].includes(day % 100)) ? 0 : (day % 10)];
    const month = new Date(date).toLocaleString('en-US', { month: 'long' });
    const year = new Date(date).getFullYear();

    // Format the time in 12-hour format with AM/PM
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    const time = new Date(date).toLocaleTimeString('en-US', options);

    // Return the formatted string
    return `${day}${suffix} ${month} ${year}, ${time}`;
  }

  return (
    <div className="game-details-container">

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

      <div className="game-details-content">
        <img src={game.imageUrl} alt={`${game.title} cover`} className="game-image" />
        <h2 className="about">About</h2>
        <p className="description">
          {isReadMore ? game.description : game.description.substring(0, 200) + '...'}
          <button onClick={toggleReadMore} className="read-more-btn">
            {isReadMore ? 'Read less' : 'Read more'}
          </button>
        </p>

        {game.trailerUrl && (
          <div className="game-trailer">
            <h3 className="titlenew">Trailer:</h3>
            <iframe
              width="560"
              height="315"
              src={game.trailerUrl}
              title={`${game.title} Trailer`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>

      {/* Right-side box */}
      <div className="game-summary-box">
        <h3>Configuration</h3>
        <p><strong>Operating System:</strong> Windows 10 64-bit</p>
        <p><strong>Processor:</strong> Intel Core i5-6400, AMD Ryzen 5 1400, or better</p>
        <p><strong>Memory:</strong> 8 GB RAM</p>
        <p><strong>Graphics:</strong> Nvidia GeForce GTX 1050Ti, AMD Radeon RX 470 (min 3GB VRAM, DX12 support)</p>
        <p><strong>DirectX:</strong> Version 12</p>
        <p><strong>Network:</strong> Broadband Internet connection</p>
        <p><strong>Storage:</strong> 45 GB available space</p>
        <p><strong>Sound Card:</strong> Sound card</p>
      </div>

      <div className="configuration">
        <h3>{game.title}</h3>

        <div className="info-line-container">
          <div className="info-line">
            <i className="fas fa-building publisher-icon" title="Publisher"></i>
            <p><strong>Publisher:</strong> <span className="publisher-text">{game.publisher}</span></p>
          </div>
          <div className="info-line">
            <p><strong>In Stock:</strong>
              <i className={`fas ${Math.random() > 0.5 ? 'fa-check-circle stock-in-stock' : 'fa-times-circle stock-out-of-stock'}`} title="Stock Status"></i>
            </p>
          </div>
          <div className="info-line">
            <p><strong>Download:</strong>
              <i className="fas fa-check-circle download-icon" title="Available"></i>
            </p>
          </div>
        </div>

        <p>
          <strong>Rating:</strong>
          <span className="rating-stars">
            {Array.from({ length: Math.floor(game.rating / 2) }, (_, index) => (
              <i key={index} className="fas fa-star filled"></i>
            ))}
            {game.rating % 2 >= 1 && (
              <i className="fas fa-star half-filled"></i>
            )}
            {Array.from({ length: 5 - Math.ceil(game.rating / 2) }, (_, index) => (
              <i key={index + Math.floor(game.rating / 2)} className="fas fa-star"></i>
            ))}
          </span>
          <span>{game.rating.toFixed(1)} / 10</span>
        </p>

        <p className="price">
          {discountedPrice ? (
            <strong>Price: {discountedPrice.toFixed(2)}</strong>
          ) : (
            <strong>Price: {game.price === 0 ? 'Free' : game.price}</strong>
          )}
        </p>

        <button
          onClick={addToCart}
          className="add-to-cart-btn"
          disabled={game.price === 0}
        >
          Add to Cart
        </button>

          


<CartModal
  isOpen={isModalCartOpen}
  setIsOpen={setIsModalCartOpen}
  cart={cart}
  setCart={setCart} // Add this line
  // If checkout is implemented
/>

<WishListModal
  isOpen={isModalWishlistOpen}
  setIsOpen={setIsModalWishlistOpen}
  wishlist={wishlist} // Pass the wishlist data
  setWishlist={setWishlist} // Update the wishlist data when modified in the modal
/>

    
        <button
          onClick={addToWishlist}
          className="add-to-wishlist-btn"
          disabled={game.price === 0}
        >
          <i className="fas fa-heart wishlist-icon"></i>
        </button>

        
      </div>

      <div className="game-reviews">
        <h3 style={{ position: 'relative', top: '20px' }}>Reviews</h3>

        {/* Reviews List */}
        <div className="reviews-list">
  {reviews.length > 0 ? (
    reviews.map((review) => {
      const user = users.find((user) => user.userId === review.userId || null); // Match userId
      const currentUserId = JSON.parse(localStorage.getItem("userId"));
      const isCurrentUser = user && currentUserId === review.userId; // Check if current user is the reviewer

      return (
        <div key={review.reviewId} className="review">
          {/* Avatar and Rating Section */}
          <div className="user-info">
            <Avatar
              src="https://default-avatar-image.jpg" // Default avatar image
              alt="User Avatar"
              className="avatar-clickable"
              onClick={() => navigate(`/game/${review.gameId}`)} // Navigate on image click
              style={{ cursor: "pointer !important" }} // Add pointer cursor
            />
            <div className="rating-info">
              <p>
                {/* Conditionally show thumbs-up or thumbs-down based on the rating */}
                {review.rating >= 1 ? (
                  <FaThumbsUp size="2em" style={{ color: 'green' }} />
                ) : (
                  <FaThumbsDown size="2em" style={{ color: 'red' }} />
                )}
              </p>
            </div>
          </div>

          {/* Review Comment */}
          <p>{review.comment}</p>
          <p>
            {user
              ? `${user.firstName.charAt(0).toLowerCase() + user.firstName.slice(1)} ${user.lastName
                  .charAt(0)
                  .toLowerCase() + user.lastName.slice(1)}`
              : 'Not Available'}
            {user ? ` (${getOrdinalDateWithTime(review.reviewDate)})` : ''}
          </p>

          {/* Edit and Delete Buttons (only visible to the current user) */}
          {isCurrentUser && (
            <div className="review-actions">
              <button
                className="edit-button"
                onClick={() => handleEditClick(review)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteReview(review.reviewId)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      );
    })
  ) : (
    <p className="no-reviews">No reviews available for this game.</p>
  )}
</div>


        {/* Add Review Button */}
        <div className="add-review-container">
          <button className="add-review" onClick={handleAddReview}>
            Add Review
          </button>
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitReview}
        reviewText={reviewText}
        setReviewText={setReviewText}
        rating={rating}
        setRating={setRating}
        user={user}
      />

       
<ReviewEditModal 
  isVisible={isEditModalOpen} 
  review={selectedReview} 
  onSave={handleUpdateReview} 
  onClose={() => setIsEditModalOpen(false)} 
/>
    </div>
  );
};

export default GameDetails;