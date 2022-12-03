import React, { useState } from 'react';
import LoginForm from '../../components/auth/LoginForm/LoginForm';
import './Login.css';
export default function Login(props) {
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
  const submit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 500);
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
