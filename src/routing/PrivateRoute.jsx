import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import { useCurrentUser } from '../features/Queries/authQuerie';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const { isLoading } = useCurrentUser();
  
  // useLocation hook to get current location info
  const location = useLocation();
  // location.pathname gives us the current URL path
  // We'll use this to redirect back after login
  console.log('Protected route path:', location.pathname);

  // If not authenticated, redirect to login immediately
  if (!isAuthenticated) {
    return <Navigate 
      to="/login" 
      // Pass the current path in state so we can redirect back after login
      state={{ from: location.pathname }} 
      replace 
    />;
  }

  // Show loading only while fetching user data and not on login page
  if (isLoading && location.pathname !== '/login') {
    return <Loading fullScreen size="large" />;
  }

  // If authenticated and data loaded, render the protected route/component
  return children;
};

export default PrivateRoute;
