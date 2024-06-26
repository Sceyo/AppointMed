/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';

const PrivateRoute = ({ children }) => {
    const { token } = useContext(AuthContext);

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;
