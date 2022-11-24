import React, { useId } from 'react';

function InputEmail(props) {
  const id = useId();
  const className = props.className;
  return (
    <div className={`input-group input-group-lg ${className}`}>
      {props.label ? <label>{props.label}</label> : null}
      <input
        type="email"
        className={`form-control ${
          props.error && props.showError ? 'is-invalid' : ''
        } ${!props.error && props.value !== '' ? 'is-valid' : ''}`}
        aria-label={`email-input-${id}`}
        aria-describedby={`email-input-${id}`}
        placeholder={props.placeHolder}
        value={props.value}
        autoComplete="email"
        onChange={(e) => props.onChange(e.target.value)}
      />
      <div className="invalid-feedback">{props.error}</div>
    </div>
  );
}

export default InputEmail;
