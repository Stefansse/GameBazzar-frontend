import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';



const GoogleLoginButton = () => {
    const navigate = useNavigate();
    const handleSuccess = async (credentialResponse) => {
        console.log("Google OAuth Token:", credentialResponse.credential);

       
            axios.post('http://localhost:8080/api/auth/google', {
                token: credentialResponse.credential
            }, { withCredentials: true })
            .then(response => response.data)
            .then(data => {
                localStorage.setItem("JWT", data.token);
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("email", data.email);
                localStorage.setItem("dateJoined", data.dateJoined);
                localStorage.setItem("role", data.role);
                localStorage.setItem("cartId", data.cartId);
                localStorage.setItem("wishListId", data.wishListId);
                navigate("/");
                window.location.reload();

                
                console.log("User Data:", data);
            })
            .catch(error => console.error("Error during authentication:", error));
        
    };

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.log("Login Failed")}
            useOneTap
        />
    );
};

export default GoogleLoginButton;