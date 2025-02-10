import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  // Initialize login state from localStorage
  useEffect(() => {
    const token = localStorage.getItem("JWT");
    const email = localStorage.getItem("email");
    setIsLoggedIn(!!token);
    setUserEmail(email);
  }, []);

  // Handle logout
  const handleSignOut = () => {
    localStorage.removeItem("JWT");
    localStorage.removeItem("email");
    setIsLoggedIn(false);
    setUserEmail(null);
    window.location.href = "/";
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, userEmail, handleSignOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
