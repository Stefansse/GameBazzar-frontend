import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { useAuth } from './AuthContext';

import GoogleLoginButton from './GoogleLoginButton';

import { GoogleOAuthProvider } from '@react-oauth/google';

import '../login.css'



const Login = ({ showLogin, setLogin }) => {
  const [isLoginMode, setLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();  // Initialize navigate





  const { login } = useAuth();

  const clientId = process.env.GOOGLE_CLIENT_ID;


  const handleGoogleLogin = () => {
    // Open Google OAuth in a popup window
    const width = 600;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    const popup = window.open(
      'http://localhost:8080/oauth2/authorization/google',
      'oauthPopup',
      `width=${width},height=${height},top=${top},left=${left}`
    );

    console.log(popup);

    // Check for popup closure
    const checkPopupClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopupClosed);
        const token = localStorage.getItem('JWT');
        if (token) {
          navigate('/');
        }
      }
    }, 100);
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation checks before sending the data to the server
    if (isLoginMode) {
      // Ensure both email and password are provided
      if (!email || !password) {
        setErrorMessage("Both fields are required.");
        return;
      }

      const signInPayload = { email, password };

      try {
        const response = await fetch(`http://localhost:8080/api/v1/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signInPayload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.message || "The Username or Password is Incorrect. Try again.");
        } else {
          const data = await response.json();
          login({ email: data.email });
          localStorage.setItem("JWT", data.token);
          localStorage.setItem("userId", JSON.stringify(data.userId));
          localStorage.setItem("email", JSON.stringify(data.email));
          localStorage.setItem("dateJoined", JSON.stringify(data.dateJoined));
          localStorage.setItem("role", JSON.stringify(data.role));
          localStorage.setItem('cartId', JSON.stringify(data.cartId));
          localStorage.setItem('wishListId', JSON.stringify(data.wishListId));
          navigate("/"); // Navigate first
          
        }
      } catch (error) {
        setErrorMessage("The Username or Password is Incorrect. Try again.");
      }
    } else {
      // Sign Up Validation
      if (!firstname || !lastname || !email || !password || !confirmPassword) {
        setErrorMessage("All fields are required.");
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match!");
        setPassword(""); // Clear password fields
        setConfirmPassword("");
        return;
      }

      const signUpPayload = { email, password, firstname, lastname };

      try {
        const response = await fetch(`http://localhost:8080/api/v1/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signUpPayload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.message || "An error occurred during signup.");
        } else {
          setLoginMode(true);  // Switch to login mode
          setErrorMessage("");  // Clear error message
        }
      } catch (error) {
        setErrorMessage("An error occurred during signup.");
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: "#f0f8ff" }}>
      {isLoginMode ? (
        <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "400px", borderColor: "rgba(0,21,41,255)" }}>
           
          <h2 className="text-center mb-4" style={{ color: "rgba(0,21,41,255)" }}>Welcome to GameBazzar</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label" style={{ color: "rgba(0,21,41,255)" }}>Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label" style={{ color: "rgba(0,21,41,255)" }}>Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <button type="submit" className="btn w-100" style={{ backgroundColor: "rgba(0,21,41,255)", color: "#fff" }}>Log In</button>
          </form>
          <div className="text-center mt-3">
            <p className="mb-0">Not a member?{" "}
              <a
                href="#"
                className="text-primary"
                onClick={() => setLoginMode(false)}
                style={{ color: "rgba(0,21,41,255)" }}
              >
                Sign up
              </a>
            </p>
          </div>
          <GoogleOAuthProvider clientId={clientId}>
            <div>
                <span className='span'>or</span>
                <GoogleLoginButton />
            </div>
        </GoogleOAuthProvider>
        </div>
      ) : (
        <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "400px", borderColor: "rgba(0,21,41,255)" }}>
          <h2 className="text-center mb-4" style={{ color: "rgba(0,21,41,255)" }}>Create an account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label" style={{ color: "rgba(0,21,41,255)" }}>First Name</label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                className="form-control"
                required
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label" style={{ color: "rgba(0,21,41,255)" }}>Last Name</label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                className="form-control"
                required
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label" style={{ color: "rgba(0,21,41,255)" }}>Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label" style={{ color: "rgba(0,21,41,255)" }}>Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label" style={{ color: "rgba(0,21,41,255)" }}>Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="form-control"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <button type="submit" className="btn w-100" style={{ backgroundColor: "rgba(0,21,41,255)", color: "#fff" }}>Sign Up</button>
          </form>
          <div className="text-center mt-3">
            <p className="mb-0">Already have an account?{" "}
              <a
                href="#"
                className="text-primary"
                onClick={() => setLoginMode(true)}
                style={{ color: "rgb(37, 150, 190)" }}
              >
                Log In
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;