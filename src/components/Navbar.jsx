import React from 'react';
import { Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, PlayCircleOutlined, TagOutlined, RiseOutlined, LoginOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import icon from '../images/test.jpg';
import { SolutionOutlined } from '@ant-design/icons';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const { user } = useAuth();

  // Define menu items conditionally based on user role and login status
  const menuItems = [
    { label: <Link to="/">Home</Link>, key: 'home', icon: <HomeOutlined /> },
    { label: <Link to="/upcoming">Upcoming</Link>, key: 'upcoming', icon: <PlayCircleOutlined /> },
    { label: <Link to="/support">Technical Support</Link>, key: 'support', icon: <QuestionCircleOutlined /> },
    {
      label: user?.role.replace(/^"|"$/g, '') === 'ROLE_ADMIN' 
        ? <Link to="/mytickets">All Tickets</Link> 
        : <Link to="/mytickets">My Tickets</Link>,
      key: 'tickets',
      icon: <SolutionOutlined />,
    },
    // Only show signup link if user is not logged in
    ...(!user ? [{
      label: <Link to="/login">Don't have an account? Join Up</Link>,
      key: 'login',
      icon: <LoginOutlined />
    }] : [])
  ];

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">GameBazzar</Link>
        </Typography.Title>
      </div>

      <Menu theme="dark" items={menuItems} />
    </div>
  );
};

export default Navbar;