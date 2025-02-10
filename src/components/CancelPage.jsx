import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import '../CancelPage.css'; // Import the custom CSS file

const CancelPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    message.error('Payment Cancelled. Please try again.');

    // Redirect after a short delay
    setTimeout(() => {
      navigate('/'); // Redirect to homepage or shopping cart
    }, 3000);
  }, [navigate]);

  return (
    <div className="cancel-container">
      <div className="card">
        <h1 className="cancel-title">Payment Cancelled</h1>
        <p className="cancel-message">Your payment was not completed. If you want, you can try again.</p>
        <p className="redirect-message">You will be redirected shortly...</p>
      </div>
    </div>
  );
};

export default CancelPage;
