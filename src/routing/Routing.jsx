import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from '../pages/signupPage/SignupPage';
import Login from '../pages/loginPage/LoginPage';
import Home from '../pages/home/Home';
import PrivateRoutes from './PrivateRoutes';
import PublicRoute from './PublicRoute';
import Navbar from '../components/Navbar';
import UserProfilePage from '../pages/userProfileManagement/UserProfilePage';

const Routing = () => {
  return (
    <Router>
        <Navbar/>
      <Routes>
        <Route path="/" element= { <PrivateRoutes><Home /></PrivateRoutes>} />
        <Route path="/signup" element={ <PublicRoute><SignupPage /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='profile' element={<PrivateRoutes> <UserProfilePage/></PrivateRoutes>}/>
      </Routes>
    </Router>
  );
};

export default Routing;
