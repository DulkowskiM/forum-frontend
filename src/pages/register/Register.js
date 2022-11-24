import React, { useState } from 'react';
import InputEmail from '../../components/UI/form/InputEmail';
import InputPassword from '../../components/UI/form/InputPassword';
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
    <div className="card">
      <div className="card-header">Rejestracja</div>
      <div className="card-body">
        <p className="text">Uzupełnij dane</p>

        <form onSubmit={submit}>
          <InputEmail
            label="mail"
            placeHolder="mail@example.com"
            value={form.email.value}
            onChange={(value) => changeHandler(value, 'email')}
            error={form.email.error}
            showError={form.email.showError}
          />

          <InputPassword
            label="Hasło"
            value={form.password.value}
            onChange={(value) => changeHandler(value, 'password')}
            error={form.password.error}
            showError={form.password.showError}
          />
          <InputPassword
            label="Wpisz ponownie hasło"
            value={form.password.value}
            onChange={(value) => changeHandler(value, 'password')}
            error={form.password.error}
            showError={form.password.showError}
          />
          <button className="btn btn-success">Zarejestruj</button>
        </form>
      </div>
    </div>
  );
}
