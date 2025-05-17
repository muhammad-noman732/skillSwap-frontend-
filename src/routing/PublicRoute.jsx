import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { useCurrentUser } from '../features/Queries/authQuerie';

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const { isLoading } = useCurrentUser();

  // If authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Show loading only while checking authentication
  if (isLoading) {
    return <Loading fullScreen size="large" />;
  }

  // If not authenticated, render the public route/component
  return children;
};

export default PublicRoute;
