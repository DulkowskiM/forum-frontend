import React from 'react';
import Input from '../../UI/form/Input';
export default function RegisterForm(props) {
  return (
    <form className="row" onSubmit={props.onSubmit}>
      <div className="col-12 col-xl-3">
        <Input
          label="Nazwa użytkownika"
          type="text"
          value={props.name.value}
          onChange={(value) => props.onChange(value, 'name')}
          error={props.name.error}
          showError={props.name.showError}
          s
        />
        <Input
          label="Adres email"
          type="email"
          value={props.email.value}
          onChange={(value) => props.onChange(value, 'email')}
          error={props.email.error}
          showError={props.email.showError}
          s
        />
        <Input
          label="Hasło"
          type="password"
          value={props.password.value}
          onChange={(value) => props.onChange(value, 'password')}
          error={props.password.error}
          showError={props.password.showError}
        />
        <Input
          label="Wpisz ponownie hasło"
          type="password"
          value={props.confirmPassword.value}
          onChange={(value) => props.onChange(value, 'confirmPassword')}
          error={props.confirmPassword.error}
          showError={props.confirmPassword.showError}
        />

        <button className="btn btn-primary mt-3">Zarejestruj</button>
      </div>
    </form>
  );
}
