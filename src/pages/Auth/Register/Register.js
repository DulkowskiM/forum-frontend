import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../../components/Auth/RegisterForm/RegisterForm';
import './Register.css';
import useAuth from '../../../hooks/useAuth';
export default function Register(props) {
  const [loading, setLoading] = useState(false);
  const [, setAuth] = useAuth();
  const [form, setForm] = useState({
    name: {
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
    confirmPassword: {
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
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    };
    const response = await axios.post(
      'http://localhost:8000/api/register',
      data,
    );
    const authData = {
      id: response.data.user.id,
      email: response.data.user.email,
      token: response.data.authorisation.token,
      isAuthenticated: true,
      isAdmin: false,
    };
    setAuth(authData);

    navigate('/');
  };

  const changeHandler = (value, fieldName) => {
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
    <div className="card mb-5">
      <div className="card-header">Rejestracja</div>
      <div className="card-body">
        <RegisterForm
          name={form.name}
          email={form.email}
          password={form.password}
          confirmPassword={form.confirmPassword}
          onChange={changeHandler}
          onSubmit={(e) => submit(e)}
          loading={loading}
        />
      </div>
    </div>
  );
}
