import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SubDepartments(props) {
  const navigate = useNavigate();

  return (
    <div>
      {props.subDepartments.map((subDepartment, index) => (
        <li
          key={index}
          onClick={() =>
            navigate(`/forum/${props.departmentName}/${subDepartment}`)
          }
        >
          {subDepartment}
        </li>
      ))}
    </div>
  );
}
