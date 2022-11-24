import React, { useId } from 'react';
export default function InputPassword(props) {
  const id = useId();

  const className = props.className || 'mt-2';

  return (
    <div className={`input-group input-group-lg ${className}`}>
      {props.label ? <label>{props.label}</label> : null}
      <input
        type="password"
        className={`form-control ${
          props.error && props.showError ? 'is-invalid' : ''
        } ${!props.error && props.value !== '' ? 'is-valid' : ''}`}
        aria-label={`password-input-${id}`}
        aria-describedby={`password-input-${id}`}
        value={props.value}
        autoComplete="new-password"
        onChange={(e) => props.onChange(e.target.value)}
      />
      <div className="invalid-feedback">{props.error}</div>
    </div>
  );
}

///edit
