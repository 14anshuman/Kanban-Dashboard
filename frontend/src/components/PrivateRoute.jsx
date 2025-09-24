import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ redirectTo = '/login' }) => {
  const authContext = useContext(AuthContext);
  // const location = useLocation();

  // Wait for auth context to initialize
  if (authContext === null) return <div>Loading...</div>;

  const { isAuthenticated } = authContext;

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={redirectTo} />
  );
};

export default PrivateRoute;
