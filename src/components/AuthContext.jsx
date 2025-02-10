import React, { createContext, useContext, useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';

// Create the context with a default value of null
const AuthContext = createContext(null);
// Custom hook to access AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // user state to hold authenticated user data

  // On component mount, check if user data exists in localStorage
  useEffect(() => {
    const userData = localStorage.getItem('JWT');
    const email = localStorage.getItem('email');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role'); // Retrieve role from localStorage
    const cartId = localStorage.getItem('cartId');
    const wishListId = localStorage.getItem('wishListId');
    if (userData && email && userId && role && cartId && wishListId) {
      setUser({ email, userId, role, cartId, wishListId});  // Set email, userId, and role together
    }
  }, []);  // Empty dependency array ensures this runs only once on mount

  const login = (userData) => {
    setUser({ email: userData.email, userId: userData.userId, role: userData.role, cartId: userData.cartId, wishListId: userData.wishListId });
    localStorage.setItem('JWT', JSON.stringify(userData.token));
    localStorage.setItem('email', JSON.stringify(userData.email));
    localStorage.setItem('userId', JSON.stringify(userData.userId)); // Store userId
    localStorage.setItem('role', userData.role);  // Store role in localStorage
    localStorage.setItem('cartId', JSON.stringify(userData.cartId));
    localStorage.setItem('wishListId', JSON.stringify(userData.wishListId));
    window.location.href = '/';

  };

  const logout = () => {
    setUser(null);  // Clear the user data on logout
    localStorage.removeItem('JWT');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    localStorage.removeItem('role'); 
    localStorage.removeItem('wishListId'); 
    //localStorage.removeItem('cartId') // Remove role from localStorage
    window.location.href = '/login'; // Redirect to home page after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
