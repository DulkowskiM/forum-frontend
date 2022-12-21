import React from 'react';
import Department from './Department/Department';

export default function Departments(props) {
  return (
    <div className="mt-4">
      {props.departments.map((deparment, index) => (
        <Department key={index} {...deparment} />
      ))}
    </div>
  );
}
