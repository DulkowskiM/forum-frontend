import React, { useState, useEffect } from 'react';
import Departments from '../../components/Departments/Departments';

export default function Home() {
  const [departments, setDepartments] = useState([]);
  // if (true) {
  //   const navigate = useNavigate();
  //   navigate('/');
  // }

  useEffect(() => {
    setDepartments([
      {
        id: 1,
        name: 'Życie forum',
        subDepartments: ['Regulaminy i ogłoszenia', 'regulaminy'],
      },
      {
        id: 2,
        name: 'Pierwsze kroki w wędarstwie',
        subDepartments: [
          'propozycje/błędy',
          'skargi',
          'pytania/problemy',
          'przywitaj się',
        ],
      },
    ]);
  }, []);

  return (
    <div>
      <Departments departments={departments} />
    </div>
  );
}
