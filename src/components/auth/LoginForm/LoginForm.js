import React from 'react';
import Input from '../../UI/form/Input';
export default function LoginForm(props) {
  return (
    <form className="row" onSubmit={props.onSubmit}>
      <div className="card-image"> </div>
      <div className="col-12 col-xl-3">
        <Input
          label="Adres email"
          type="email"
          value={props.email.value}
          onChange={(value) => props.onChange(value, 'email')}
          error={props.email.error}
          showError={props.email.showError}
        />

        <Input
          label="Hasło"
          type="password"
          value={props.password.value}
          onChange={(value) => props.onChange(value, 'password')}
          error={props.password.error}
          showError={props.password.showError}
        />

        <button className="btn btn-primary mt-3">Zaloguj</button>
      </div>
      <div className="col-9"></div>
    </form>
  );
}
