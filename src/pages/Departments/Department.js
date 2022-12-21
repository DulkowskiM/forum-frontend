import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SubDepartments from '../../components/Departments/Department/SubDepartments/SubDepartments';

export default function Department(props) {
  let { department } = useParams();
  const [subDepartments, setSubdepartments] = useState([]);

  useEffect(() => {
    //Tutaj dane powinny być pograne z axiosa
    setSubdepartments(['Regulaminy i ogłoszenia', 'Organizacja']);
  }, []);

  return (
    <div>
      <h3> Department {department} </h3>
      <SubDepartments
        departmentName={department}
        subDepartments={subDepartments}
      />
    </div>
  );
}
