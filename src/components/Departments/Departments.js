import React from 'react';
import Department from './Department/Department';

export default function Departments(props) {
  return (
    <div className='mt-4'>
      {props.departments.map((department) => (
        <Department key={department.id} {...department} />
      ))}
    </div>
  );
}
