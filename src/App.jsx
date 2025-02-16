import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';  // Replace Switch with Routes
import { useEffect } from "react";


import './App.css';
import './SpaceStyling.css'

import OAuthCallback from './components/OAuthCallback';


import { Layout, Typography, Space } from "antd";

import Login from "./components/login";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Trending from "./components/Trending";
import TermsOfUse from "./components/TermsOfUse";
import Contact from "./components/Contact";
import OrderProductList from './components/OrderProductList';
import PaymentList from './components/PaymentList';
import AccountList from './components/AccountList';
import PartnershipList from './components/PartnershipList';
import PrivacyPolicy from "./components/PrivacyPolicy";
import TechnicalSupportForm from "./components/TechnicalSupportForm";
import GameDetails from "./components/GameDetails";
import Upcoming from "./components/Upcoming";
import ProfilePage from "./components/ProfilePage";
import AddReviewForm from "./components/AddReviewForm";
import { AuthProvider } from "./components/AuthContext";

import UserTickets from "./components/UserTickets"

import CancelPage from "./components/CancelPage";

import SuccessPage from "./components/SuccessPage";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("JWT");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);




  return (
    
    <Router>
      <div className="app">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
          <Layout>
            <div className="routes">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/upcoming" element={<Upcoming/>} />
                <Route path="/game/:id" element={<GameDetails isLoggedIn={isLoggedIn}/>} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/login" element={<Login showLogin={showLogin} setLogin={setIsLoggedIn} />} />
                <Route path="/terms" element={<TermsOfUse />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/orderproductlist" element={<OrderProductList />} />
                <Route path="/paymentlist" element={<PaymentList />} />
                <Route path="/accountlist" element={<AccountList />} />
                <Route path="/partnershiplist" element={<PartnershipList />} />
                <Route path="/policy" element={<PrivacyPolicy />} />
                <Route path="/support" element={<TechnicalSupportForm />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/mytickets" element={<UserTickets />} />
                <Route path="/add-review/:gameId" element={<AddReviewForm isLoggedIn={isLoggedIn} />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/cancel" element={<CancelPage />}  />
                <Route path="/oauth-callback" element={<OAuthCallback />} />

              </Routes>
            </div>
          </Layout>
        </div>

        <div className="footer">
        <Typography.Title  level={5}>
          GameBazzar <br />
          All rights reserved
      </Typography.Title>
          <Space className="space-container">
          <Link to="/terms">Terms Of Use</Link>
          <Link to="/policy">Privacy Policy</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/login">Login</Link>
          </Space>
        </div>
      </div>
    </Router>
  );
}

export default App;
