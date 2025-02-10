import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import '../SuccessPage.css'; // Import the custom CSS file

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    message.success('Payment Successful! You will be redirected shortly.');

    // Redirect after a short delay
    setTimeout(() => {
      navigate('/'); // Redirect to homepage or dashboard
    }, 5173);
  }, [navigate]);

  return (
    <div className="success-container">
      <div className="card">
        <h1 className="success-title">Payment Successful!</h1>
        <p className="success-message">Thank you for your purchase. Your payment has been processed.</p>
        <p className="redirect-message">You will be redirected shortly...</p>
      </div>
    </div>
  );
};

export default SuccessPage;
