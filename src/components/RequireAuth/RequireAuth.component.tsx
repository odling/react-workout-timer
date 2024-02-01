import { useLocation, Navigate, Outlet } from 'react-router-dom';
import path from '../../config/path';
import { useContext } from 'react';
import SessionContext from '../../context';

const RequireAuth = () => {
  const { currentSession } = useContext(SessionContext);
  const isLoggedIn = !!currentSession;
  const location = useLocation();
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={path.home} state={{ path: location.pathname }} replace />
  );
};

export default RequireAuth;
