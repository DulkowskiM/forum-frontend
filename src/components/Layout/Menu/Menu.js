import styles from './Menu.module.css';
import MenuLink from './MenuLink/MenuLink';
import instance from '../../../axios';
import { useNavigate } from 'react-router-dom';
import {
  homeIcon,
  contractorsIcon,
  settingsIcon,
  messageIcon,
  logoutIcon,
  registerIcon,
} from './Icons';
import useAuth from '../../../hooks/useAuth';
export default function Menu() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await instance.post('http://localhost:8000/api/logout');
      setAuth.logout();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`d-none d-md-flex row ps-3 pe-3 ${styles.main} align-items-center`}
    >
      <div className="col-4 col-lg-3">
        <MenuLink color="#9747FF" label="Strona główna" to="/">
          {homeIcon}
        </MenuLink>
      </div>
      <div className="d-none d-lg-block col-2 col-lg-2">
        <MenuLink color="#00FFFF" label="Panel Administratora" to="/admin">
          {settingsIcon}
        </MenuLink>
      </div>
      {auth.isAuthenticated ? (
        <>
          <div className="d-none d-lg-block col-3 col-lg-3">
            <MenuLink color="#808000" label="Wiadomości" to="/message">
              {messageIcon}
            </MenuLink>
          </div>
          <div className="d-none d-lg-block col-4 col-lg-4">
            <div
              className="d-flex justify-content-center align-items-center"
              onClick={logout}
            >
              {logoutIcon}
              <span className="text-center ms-1"> Wyloguj </span>
            </div>
            {/* <MenuLink color="#EE9C22" label="Wyloguj" to="/logout">
              {logoutIcon}
            </MenuLink> */}
          </div>
        </>
      ) : (
        <>
          <div className="d-none d-lg-block col-3 col-lg-3">
            <MenuLink color="#808000" label="Zaloguj się" to="/login">
              {contractorsIcon}
            </MenuLink>
          </div>
          <div className="d-none d-lg-block col-4 col-lg-4">
            <MenuLink color="#EE9C22" label="Zarejestruj się" to="/register">
              {registerIcon}
            </MenuLink>
          </div>
        </>
      )}
    </div>
  );
}
