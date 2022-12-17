import React from 'react';
import Input from '../../UI/form/Input';
export default function LoginForm(props) {
  return (
    <form className="row" onSubmit={props.onSubmit}>
      <div className="card-image"> </div>
      <div className="col-12 col-xl-3">
        <Input
          label="Nazwa"
          type="text"
          value={props.name.value}
          onChange={(value) => props.onChange(value, 'name')}
          error={props.name.error}
          showError={props.name.showError}
        />

        <button className="btn btn-primary mt-3">Dodaj kategorię</button>
      </div>
      <div className="col-9"></div>
    </form>
  );
}
