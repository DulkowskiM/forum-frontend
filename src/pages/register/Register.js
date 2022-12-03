import React, { useState } from 'react';
import RegisterForm from '../../components/auth/RegisterForm/RegisterForm';
//import LoadingButton from
export default function Register(props) {
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
    confirmPassword: {
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
    <div className="card mb-5">
      <div className="card-header">Rejestracja</div>
      <div className="card-body">
        <RegisterForm
          nick={form.nick}
          email={form.email}
          password={form.password}
          confirmPassword={form.confirmPassword}
          onChange={changeHandler}
          onSubmit={submit}
          loading={loading}
        />
      </div>
    </div>
  );
}
