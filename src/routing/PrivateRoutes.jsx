import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { useCurrentUser } from '../features/Queries/authQuerie';

const PrivateRoutes = ({children}) => {
    const {user, isAuthenticated} = useSelector(state => state.auth);
    const { isLoading } = useCurrentUser();

    if (isLoading) {
        return <Loading fullScreen size="large" />;
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default PrivateRoutes
