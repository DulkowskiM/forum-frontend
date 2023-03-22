import React from 'react';
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
  profileIcon, // nowy ikon dla profilu
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

  const isAdmin = localStorage.getItem('token-data')
    ? JSON.parse(localStorage.getItem('token-data')).isAdmin === 1
    : 1;

  // navbar dla niezalogowanego
  if (!auth.isAuthenticated) {
    return (
      <div
        className={`d-md-flex row ps-3 pe-3 ${styles.main} align-items-center`}
      >
        <div className="col-3 col-lg-3">
          <MenuLink color="#9747FF" label="Strona główna" to="/">
            {homeIcon}
          </MenuLink>
        </div>
        <div className=" d-lg-block col-3 col-lg-3">
          <MenuLink color="#808000" label="Zaloguj się" to="/login">
            {contractorsIcon}
          </MenuLink>
        </div>
        <div className=" d-lg-block col-3 col-lg-3">
          <MenuLink color="#EE9C22" label="Zarejestruj się" to="/register">
            {registerIcon}
          </MenuLink>
        </div>
      </div>
    );
  }

  // navbar dla zalogowanego
  if (auth.isAuthenticated && !isAdmin) {
    return (
      <div
        className={`d-md-flex row ps-3 pe-3 ${styles.main} align-items-center`}
      >
        <div className="col-3 col-lg-3">
          <MenuLink color="#9747FF" label="Strona główna" to="/">
            {homeIcon}
          </MenuLink>
        </div>
        <div className=" d-lg-block col-3 col-lg-3">
          <MenuLink color="#008080" label="Profil" to="/me">
            {profileIcon}
          </MenuLink>
        </div>
        <div className=" d-lg-block col-3 col-lg-3">
          <MenuLink color="#00FFFF" label="Wiadomości" to="/message">
            {messageIcon}
          </MenuLink>
        </div>
        <div className=" d-lg-block col-3 col-lg-3">
          <div
            className="d-flex justify-content-center align-items-center"
            onClick={logout}
          >
            {logoutIcon}
            <span className="text-center ms-1"> Wyloguj </span>
          </div>
        </div>
      </div>
    );
  }

  // navbar dla admina
  if (auth.isAuthenticated && isAdmin) {
    return (
      <div className={`${styles.main} container-fluid`}>
        <div className="d-flex justify-content-center align-items-center">
          <div className="menu-link flex-grow-1">
            <MenuLink color="#9747FF" label="Strona główna" to="/">
              {homeIcon}
            </MenuLink>
          </div>
          <div className="menu-link flex-grow-1">
            <MenuLink color="#008080" label="Profil" to="/me">
              {profileIcon}
            </MenuLink>
          </div>
          <div className="menu-link flex-grow-1">
            <MenuLink color="#00FFFF" label="Panel Administratora" to="/admin">
              {settingsIcon}
            </MenuLink>
          </div>
          <div className="menu-link flex-grow-1">
            <MenuLink color="#00FFFF" label="Wiadomości" to="/message">
              {messageIcon}
            </MenuLink>
          </div>
          <div className="d-flex flex-row align-items-center">
            <div className="menu-link">
              <div onClick={logout}>
                {logoutIcon}
                <span className="text-center ms-1"> Wyloguj </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
