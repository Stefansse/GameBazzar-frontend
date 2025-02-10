import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingOutlined, CreditCardOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import '../Contact.css'; // Assuming your styles are in this file

const Contact = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="contact-container">
      <h1>GameBazzar Support</h1>
      <div className="contact-row">
        <div className="contact-card" onClick={() => handleCardClick('/orderproductlist')}>
          <ShoppingOutlined className="contact-icon" />
          <h2>Orders & Products</h2>
          <p>Get help with orders, shipping, and product information.</p>
        </div>
        <div className="contact-card" onClick={() => handleCardClick('/paymentlist')}>
          <CreditCardOutlined className="contact-icon" />
          <h2>Payment</h2>
          <p>Questions about payment methods, invoices, and refunds.</p>
        </div>
        <div className="contact-card" onClick={() => handleCardClick('/accountlist')}>
          <UserOutlined className="contact-icon" />
          <h2>Account & Security</h2>
          <p>Manage your account and security settings.</p>
        </div>
        <div className="contact-card" onClick={() => handleCardClick('/partnershiplist')}>
          <TeamOutlined className="contact-icon" />
          <h2>Partnership</h2>
          <p>Explore partnership and collaboration opportunities.</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
