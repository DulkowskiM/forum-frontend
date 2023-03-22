import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const AdminRoute = ({ children }) => {
  const [auth] = useAuth();
  if (auth.isAdmin == 0) {
    // user is not admin
    return <Navigate to="/" />;
  }
  return children;
};
