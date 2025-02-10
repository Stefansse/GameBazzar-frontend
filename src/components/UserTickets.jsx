import React, { useEffect, useState } from 'react';
import { Table, Button, message, Spin, Empty, Select, Input } from 'antd';
import { useAuth } from './AuthContext';
import axios from 'axios';
import '../UserTickets.css';

const { Option } = Select;
const { TextArea } = Input;



import { Avatar, Menu, Dropdown } from 'antd';


import { Link } from 'react-router-dom';

const UserTickets = () => {
  const { user, logout } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTicketId, setEditingTicketId] = useState(null); // Track which ticket is being edited
  const [editingResponse, setEditingResponse] = useState(''); // Store the response while editing

  useEffect(() => {
    const fetchTickets = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("JWT");
      const userId = user?.role === "ROLE_ADMIN" ? null : parseInt(user.userId, 10); 

      try {
        let response;
        if (user?.role === "ROLE_ADMIN") {
          response = await axios.get(
            `http://localhost:8080/api/tickets/user/`, 
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          response = await axios.get(
            `http://localhost:8080/api/tickets/user/${userId}`, 
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        setTickets(response.data);
      } catch (error) {
        message.error('Failed to fetch tickets. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [user]);

  const handleStatusChange = async (ticketId, newStatus) => {
    const token = localStorage.getItem("JWT");
  
    try {
      await axios.put(
        `http://localhost:8080/api/tickets/${ticketId}/status?status=${newStatus}`, 
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success(`Ticket status updated to ${newStatus}`);
      
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );
    } catch (error) {
      message.error('Failed to update ticket status. Please try again.');
    }
  };

  const handleResponseChange = (e) => {
    setEditingResponse(e.target.value);
  };

  const handleSaveResponse = async (ticketId) => {
    const token = localStorage.getItem("JWT");

    if (!editingResponse) {
      message.warning("Please provide a response before submitting.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/api/tickets/${ticketId}/response`, 
        { response: editingResponse },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Response submitted successfully.");
      
      // Update the ticket list with the new response
      setTickets((prevTickets) => 
        prevTickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, response: editingResponse } : ticket
        )
      );

      // Reset editing state
      setEditingTicketId(null);
      setEditingResponse('');
    } catch (error) {
      message.error('Failed to submit the response. Please try again.');
    }
  };



  const menu = (
    <Menu>
      
      <Menu.Divider />
      <Menu.Item key="profile">
        <Link to="/profile" style={{ textDecoration: 'none' }}>My Profile</Link>
      </Menu.Item>
      <Menu.Item key="signout" onClick={() => handleSignOut()}>

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

  const handleSignOut = () => {
    logout();
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





  const columns = [
    {
      title: <div style={{ position: 'relative', left: '50px' }}>Ticket ID</div>,
      dataIndex: 'id',
      key: 'id',
      render: (text) => <span>{text}</span>,
    },
    {
      title: <div style={{ position: 'relative', left: '60px' }}>Issue Category</div>,
      dataIndex: 'problemCategory',
      key: 'problemCategory',
    },
    {
      title: <div style={{ position: 'relative', left: '160px' }}>Description</div>,
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: <div style={{ position: 'relative', left: '25px' }}>Status</div>,
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span
          style={{
            color: status === 'Resolved' ? 'green' : 'orange',
            fontWeight: 'bold',
          }}
        >
          {status}
        </span>
      ),
    },
    {
        title: <div style={{ position: 'relative', left: '80px' }}>Admin Response</div>,
        key: 'response',
        render: (_, record) => (
          user?.role.replace(/^"|"$/g, '') === 'ROLE_ADMIN' ? (
            editingTicketId === record.id ? (
              <div>
                <TextArea
                  rows={3}
                  value={editingResponse}
                  onChange={handleResponseChange}
                  placeholder="Write a response"
                  autoFocus
                />
                <Button 
                  type="primary" 
                  onClick={() => handleSaveResponse(record.id)} 
                  style={{ marginTop: '10px' }}
                >
                  Save Response
                </Button>
              </div>
            ) : (
              <div onClick={() => {
                setEditingTicketId(record.id);
                setEditingResponse(record.response || ''); // Populate with existing response if any
              }}>
                {record.response || "Click to add response"}
              </div>
            )
          ) : (
            // For regular users, just show the response (if any)
            <span>{record.response || "No response from admin yet."}</span>
          )
        ),
      },
    {
      title: <div style={{ position: 'relative', left: '95px' }}>Action</div>,
      key: 'actions',
      render: (_, record) => (
        user?.role.replace(/^"|"$/g, '') === 'ROLE_ADMIN' ? (
          <>
            <Select
              defaultValue={record.status}
              style={{ width: 120, marginLeft: 10 }}
              onChange={(value) => handleStatusChange(record.id, value)}
            >
              <Option value="Open">Open</Option>
              <Option value="Resolved">Resolved</Option>
            </Select>
          </>
        ) : null
      ),
    },
  ];

  return (
    <>
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
      <div className="user-tickets-container">
        <h2>All Tickets</h2>
        {loading ? (
          <Spin size="large" />
        ) : tickets.length === 0 ? (
          <Empty description="No tickets available." />
        ) : (
          <Table
            columns={columns}
            dataSource={tickets}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            bordered
            size="middle"
            scroll={{ x: 'max-content' }}
            tableLayout="fixed"
          />
        )}
      </div>
    </>
  );
};

export default UserTickets;
