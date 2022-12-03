import React from 'react';

function Input(props) {
  const className = props.className;
  return (
    <div className={`form-group ${className}`}>
      {props.label ? <label> {props.label}</label> : null}
      <input
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        type={props.type}
        className={`form-control ${props.error ? 'is-invalid' : ''}`}
      />
      <div className="invalid-feedback">{props.error}</div>
    </div>
  );
}

Input.defaultProps = {
  type: 'text',
  showError: false,
  error: '',
};

export default Input;
