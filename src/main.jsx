import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'antd/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./components/AuthContext";


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <App />
  </AuthProvider>,
  </StrictMode>,
)
