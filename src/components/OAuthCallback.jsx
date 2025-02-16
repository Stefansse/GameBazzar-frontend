import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const email = params.get('email');
    const userId = params.get('userId');
    const cartId = params.get('cartId');
    const wishListId = params.get('wishListId');
    const role = params.get('role');

    if (token) {
      localStorage.setItem('JWT', token);
      localStorage.setItem('email', email);
      localStorage.setItem('userId', userId);
      localStorage.setItem('cartId', cartId);
      localStorage.setItem('wishListId', wishListId);
      localStorage.setItem('role', role);
      
      login({ email });
      window.opener.postMessage({ type: 'oauth-success' }, '*');
      window.close();
    } else {
      navigate('/login');
    }
  }, [navigate, login]);

  return <div className="container text-center mt-5">Processing login...</div>;
};

export default OAuthCallback;