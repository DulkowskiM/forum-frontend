import axios from 'axios';
import React, { useState } from 'react';
import RegisterForm from '../../../components/Auth/RegisterForm/RegisterForm';
//import LoadingButton from
export default function Register(props) {
  const [loading, setLoading] = useState(false);
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
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    };

    await axios.post('http://localhost:8000/api/register', data);
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
