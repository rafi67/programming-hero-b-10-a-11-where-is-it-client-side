import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Pages/Loading';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if(loading) {
        return <Loading className="mx-auto"></Loading>;
    }

    if(user && user?.email) {
        return children;
    }

    return <Navigate state={location} to="/login"></Navigate>;
};

PrivateRoute.propTypes = {
    children: PropTypes.element,
};

export default PrivateRoute;