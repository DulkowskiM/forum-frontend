import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useContext } from 'react';
import ReducerContext from '../contexts/ReducerContext';
export const AuthenticatedRoute = ({ children }) => {
  const [state] = useAuth();

  if (!state.isAuthenticated) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
