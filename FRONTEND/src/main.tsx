import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.tsx'
import axios from 'axios';
import { emitApiError } from './components/GlobalToast';

axios.defaults.withCredentials = true;

// Listen globally for backend error codes
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Dynamically rip the error message directly from identical backend payload format
    const errorMessage = error.response?.data?.message || "An API Error occurred";
    emitApiError(errorMessage); // Toast the exact API trace entirely!

    // 401 Unauthorized or 403 Forbidden means the token expired or is invalid
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      if (window.location.pathname !== "/") {
        console.error("Session expired or invalid token. Redirecting to login.");
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
