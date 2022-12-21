import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Topics from '../../../components/Departments/Department/SubDepartments/Topics/Topics';

export default function SubDepartment() {
  let { department, subdepartment } = useParams();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    setTopics(['Nowy regulamin 2022', 'Zmiany w regulamienie', 'Propozycje']);
  }, []);

  return (
    <div>
      {subdepartment}
      <Topics
        topics={topics}
        subdepartment={subdepartment}
        department={department}
      />
    </div>
  );
}
