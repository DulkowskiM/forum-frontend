import React from 'react';
import { useNavigate } from 'react-router-dom';
import SubDepartments from './SubDepartments/SubDepartments';

export default function Department(props) {
  const navigate = useNavigate();

  return (
    <div className="mt-4 mb-4">
      <h2 onClick={() => navigate(`/forum/${props.name}`)}> {props.name} </h2>
      <SubDepartments subDepartments={props.subDepartments} />
    </div>
  );
}
