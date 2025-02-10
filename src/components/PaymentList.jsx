import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faInfoCircle } from '@fortawesome/free-solid-svg-icons'; // Import the left arrow icon

import '../PaymentList.css'

const PaymentList = () => {
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
        <h2 className="page-title">Payment Issues</h2>
        <button onClick={goBack} className="go-back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
      <ul>
        <li className="list-item">
          <strong>Money was charged but no product received</strong>
          <p>If you have been charged for a purchase on our e-commerce website but have not received the product, please contact our customer support team immediately for assistance.
            <br />
            - Processing delay
            <br />
            - Issue with payment
            <br />
            - etc.
            <br />
            Please have the following information ready when you contact our customer support team:
            <br />
            - Order number
            <br />
            - Payment proof (screenshot or picture of the transaction)
            <br />
            Our team will investigate the issue and take the necessary steps to resolve it as quickly as possible.
            <br />
            We're here to help you!
          </p>
        </li>
        <li className="list-item">
          <strong>Find a transaction you didn't make?</strong>
          <p>If you have found a charge on your account that you did not make, it is important that you take action immediately.
            <br />
            Here are some steps you can take:
            <br />
            1. Verify that the charge is not a mistake or a duplicate charge.
            <br />
            2. Check the purchase details for the date and amount of the charge to confirm that it was not made by you or someone you know.
            <br />
            3. Change your account password and any other associated login information as soon as possible.
            <br />
            We take the security of our customers seriously, so please don't hesitate to reach out to us if you have any questions or concerns.
            <br />
            We're here to help you!
          </p>
        </li>
        <li className="list-item">
          <strong>I cannot complete the payment</strong>
          <p>If you are having trouble completing a payment on our website, there may be a few things that you can try to resolve the issue.
            <br />
            Here are some common reasons why this may be occurring:
            <br />
            1. Double-check that all the information you have entered is correct, such as your billing address and credit card information.
            <br />
            2. Make sure that the billing address you have entered matches the one associated with your credit card.
            <br />
            3. Confirm that your credit card has not expired or reached its limit.
            <br />
            Our team will be happy to assist you and help you resolve the issue as quickly as possible. Please reach out to us if you have any questions or concerns.
            <br />
            We're here to help you!
          </p>
        </li>
      </ul>
      <button onClick={goToContactPage} className="contact-button">
        <FontAwesomeIcon icon={faInfoCircle} /> Return to the other Issues
      </button>
    </div>
  );
};

export default PaymentList;
