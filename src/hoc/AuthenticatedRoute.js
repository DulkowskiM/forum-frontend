import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useContext } from 'react';
import ReducerContext from '../contexts/ReducerContext';
export const AuthenticatedRoute = ({ children }) => {
  const { state } = useContext(ReducerContext);
  if (!state.user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
