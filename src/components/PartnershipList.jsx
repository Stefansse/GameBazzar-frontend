import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faInfoCircle } from '@fortawesome/free-solid-svg-icons'; // Import the left arrow icon

import '../PartnershipList.css'

const PartnershipList = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const goBack = () => {
    navigate(-1); // This will navigate back to the previous page
  };

  const goToContactPage = () => {
    navigate('/contact'); // Change '/contact' to the route of your contact page
  };

  return (
    <div className="list-container">
      <div className="header-container">
        <h2 className="page-title">Partnership</h2>
        <button onClick={goBack} className="go-back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
      <ul>
        <li className="list-item">
         <p>Learn how to earn money by promoting our services.
         <br/>
Do you have a YouTube channel, Twitch channel, Discord server, or website? We can become partners! Please provide us with:
<br/>
• The URL(s) of your channel, website, etc. with which you would like to be a partner
<br/>
• Your first name
<br/>
• Your Discord ID</p>
          </li>
          <br/>
          </ul>
    </div>
  );
};

export default PartnershipList;
