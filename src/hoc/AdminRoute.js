import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useContext } from 'react';
import ReducerContext from '../contexts/ReducerContext';
export const AdminRoute = ({ children }) => {
  const { state } = useContext(ReducerContext);
  if (!state.user.isAdmin) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};
