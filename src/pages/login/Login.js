import axios from 'axios';
import React, { useState } from 'react';
import LoginForm from '../../components/auth/LoginForm/LoginForm';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
export default function Login(props) {
  const [, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nick: {
      value: '',
      error: '',
      showError: false,
      rules: ['requierd', { rule: 'nick' }],
    },
    email: {
      value: '',
      error: '',
      showError: false,
      rules: ['requierd', { rule: 'email' }],
    },
    password: {
      value: '',
      error: '',
      showError: false,
      rules: ['requierd', { rule: 'password' }],
    },
  });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const response = await axios.post(
        'http://localhost:8000/api/login',
        data,
      );
      const authData = {
        id: response.data.user.id,
        email: response.data.user.email,
        token: response.data.authorisation.token,
        isAuthenticated: true,
      };
      setAuth(authData);
      console.log(response);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const changeHandler = (value, fieldName) => {
    // const error = validate(form[fieldName].rules, value);

    setForm({
      ...form,
      [fieldName]: {
        ...form[fieldName],
        value,
        showError: true,
        error: '',
      },
    });
  };

  return (
    <div className="card row">
      <div className="card-header">Logowanie</div>
      <div className="card-body col=6">
        <LoginForm
          email={form.email}
          password={form.password}
          onChange={changeHandler}
          onSubmit={submit}
          loading={loading}
        />
      </div>
    </div>
  );
}
