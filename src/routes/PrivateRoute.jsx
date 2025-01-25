import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if(loading) {
        return <h1>Loading</h1>;
    }

    if(user && user?.email) {
        return children;
    }

    return <Navigate state={location}></Navigate>;
};

PrivateRoute.propTypes = {
    children: PropTypes.element,
};

export default PrivateRoute;