import React from 'react';
import { Routes, Route } from 'react-router-dom';  // no Router here
import SignupPage from '../pages/signupPage/SignupPage';
import Login from '../pages/loginPage/LoginPage';
import Home from '../pages/home/Home';
import PublicRoute from './PublicRoute';
import Navbar from '../components/Navbar';
import UserProfilePage from '../pages/userProfileManagement/UserProfilePage';
import PrivateRoute from './PrivateRoute';

const Routing = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/profile" element={<PrivateRoute><UserProfilePage /></PrivateRoute>} />
      </Routes>
    </>
  );
};

export default Routing;
