import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { login, logout } from '../store/auth/actions';
export default function useAuth() {
  const authContext = useContext(AuthContext);

  const setAuth = {
    login: (data) => {
      const authData = {
        id: data.user.id,
        email: data.user.email,
        token: data.authorisation.token,
        isAuthenticated: true,
        isAdmin: data.user.is_admin,
        name: data.user.name,
      };
      // console.log(authData);
      console.log(data.user.is_admin);
      authContext.dispatch(login(authData));
      window.localStorage.setItem('token-data', JSON.stringify(authData));
      // console.log(window.localStorage.getItem('token-data'));
    },
    logout: () => {
      authContext.dispatch(logout());
      window.localStorage.removeItem('token-data');
    },
  };

  return [authContext.state, setAuth];
}
