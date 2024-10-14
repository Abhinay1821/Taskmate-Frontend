import React from 'react'
import { useNavigate } from 'react-router-dom';

export const formatDateTime = (isoString) => {
    const date = new Date(isoString);
  
    // Options for formatting date and time
    const options = {
      year: 'numeric',
      month: 'long',  // 'short' for abbreviated month
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,  // Set to false if you want 24-hour time format
    };
  
    // Format the date
    return date.toLocaleString('en-US', options);
  };
  
  export const InactivityHandler = () => {
    const navigate = useNavigate();
  
    const inactivityTimeout = 10000; 
    let timeoutId;
  
    const resetTimeout = () => {
      // Clear the existing timeout
      if (timeoutId) clearTimeout(timeoutId);
      
      // Set a new timeout
      timeoutId = setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/")
      }, inactivityTimeout);
    };
  
    React.useEffect(() => {
      window.addEventListener("mousemove", resetTimeout);
      window.addEventListener("keypress", resetTimeout);
      window.addEventListener("click", resetTimeout);
      resetTimeout();
  
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("mousemove", resetTimeout);
        window.removeEventListener("keypress", resetTimeout);
        window.removeEventListener("click", resetTimeout);
      };
    }, []);
  
    return null;
  };
  
  
  