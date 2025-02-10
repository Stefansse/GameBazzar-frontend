import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faInfoCircle } from '@fortawesome/free-solid-svg-icons'; // Import the left arrow icon

import '../PaymentList.css'

const AccountList = () => {
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
        <h2 className="page-title">Account & Security Issues</h2>
        <button onClick={goBack} className="go-back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
      <ul>
        <li className="list-item">
          <strong>I didn’t receive my activation email</strong>
         <p>If you did not receive your activation email after signing up for an account on our website, there are a few things you can try:
          <br/>
1. Check your spam or junk folder. Sometimes emails can accidentally end up there.
<br/>
2. Make sure you entered the correct email address when signing up. Double-check for typos or errors.
<br/>
3. Wait a few minutes and check your email again. Sometimes there can be a delay in receiving emails.
<br/>
4. Contact our customer support team by emailing us at support@gamebazzar.com. Please include your account information and the email address you used to sign up, so we can assist you as quickly as possible.
<br/>
<br/>
We apologize for any inconvenience this may have caused, and we will do our best to help you resolve the issue as quickly</p>
        </li>
        <li className="list-item">
          <strong>What data are you saving about me?
          </strong>
          <p>As a company that operates in compliance with the General Data Protection Regulation (GDPR), we take the privacy of our customers very seriously. The data we collect and store about our customers is used solely to provide them with the best possible experience on our website and to keep them informed about the products and services we offer.
          <br/>
The following types of data are collected and stored when you create an account or make a purchase on our website:
<br/>
Personal information, such as your name, email address, and postal address.
<br/>
Payment information, such as your credit or debit card details. This information is securely stored and protected by our payment processor and is only used for the purposes of processing your payment.
<br/>
Information about your browsing and purchase history on our website, to improve your experience and suggest products that you may be interested in.
<br/>
Information you voluntarily provide such as reviews, surveys, email marketing opt-ins, etc.
<br/>
Technical information, such as your IP address, browser type, and the pages you visit on our website, for the purpose of site analytics, fraud prevention, and security.
<br/>
<br/>
Your data is protected and kept safe and is only shared with third parties if we are legally obligated to do so or they are providing a service on our behalf, like order delivery. We retain the data only as long as necessary to provide service and as long as we are required by law.
You can contact us at any time to request access to the data we have collected and stored about you, or to request that your data be deleted. Also, you can opt-out of receiving marketing emails by clicking the “unsubscribe” link at the bottom of any marketing email you receive from us.
<br/>
<br/>
We are committed to keeping your personal data secure and respect your privacy rights, if you have any question or concerns please contact us.</p>
        </li>
        <li className="list-item">
          <strong>How do I keep my account safe?
          </strong>
          <p>Keeping your account secure on our website is crucial to protect yourself from online fraud. By taking the necessary steps to protect your account, you can help ensure that your account stays safe and secure, and reduce the risk of unauthorized access to your account:
          <br/>
1. Use a strong and unique password for your account. Avoid using common words or phrases and include a mix of letters, numbers, and special characters.
<br/>
2. Never share your password with anyone or save it on a public computer.
<br/>
3. Keep your contact information, especially your email address, up to date to ensure you can receive important security notifications.
<br/>
4. Log out of your account when you are finished using it, especially if you are using a public or shared device.
<br/>
5. Be vigilant of phishing attempts. Be careful of emails or messages asking for your personal information, and never click on links or enter your information on a website that you are not familiar with.
<br/>
6. Be careful about sharing personal information over the phone or the internet, only share what is necessary for the transaction, and question the authenticity of the person reaching out before giving out any sensitive data.
<br/>
7. Use two-factor authentication to protect your account. This adds an extra layer of security by requiring a code sent to your phone in addition to your password.
<br/>
8. Keep your device and browser up to date, as this can help to prevent security vulnerabilities.
<br/>
9. You should monitor your account activity regularly to ensure there are no unauthorized transactions.
<br/>
<br/>
We understand how valuable your information is and we do everything we can to protect it. If you suspect any suspicious activity on your account, please contact our customer support team immediately.
If you have any questions or concerns about the security of your account, please don’t hesitate to reach out to us. 
<br/>
<br/>
We're always here to help you protect your personal information and to keep your account secure.</p>
        </li>
      </ul>
      <button onClick={goToContactPage} className="contact-button">
        <FontAwesomeIcon icon={faInfoCircle} /> Return to the other Issues
      </button>
    </div>
  );
};

export default AccountList;
