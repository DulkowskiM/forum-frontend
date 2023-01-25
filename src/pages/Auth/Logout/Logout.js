import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import instance from '../../../axios';
export default function Logout() {
  const navigate = useNavigate();

  const [, setAuth] = useAuth();

  useEffect(async () => {
    try {
      // await instance.post('http://localhost:8000/api/logout');
      // setAuth.logout();
      // navigate('/');
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <div>wyloguj</div>;
}
