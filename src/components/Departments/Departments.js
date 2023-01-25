import React, { useState, useEffect } from 'react';
import Department from './Department/Department';
import axios from 'axios';

export default function Departments(props) {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      await axios.get(`http://localhost:8000/api/departments`).then((res) => {
        const data = res.data.map((dep) => ({
          id: dep.id_department,
          name: dep.name,
          subDepartments: [],
        }));
        setDepartments(data);
      });
    };
    fetchDepartments();
  }, []);

  return (
    <div className="mt-4">
      {departments.length > 0 &&
        departments.map((departments) => (
          <tr>
            <td>{departments.name}</td>
          </tr>
        ))}
    </div>
  );
}
