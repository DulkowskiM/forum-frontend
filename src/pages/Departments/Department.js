import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Main.module.css';

export default function Department() {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  let { id_dep } = useParams();
  useEffect(() => {
    const fetchDepartments = async () => {
      await axios
        .get(`http://localhost:8000/api/department/${id_dep}`)
        .then((res) => {
          // console.log(res.data.department);
          if (res.data) {
            setDepartments(res.data.department);
          }
        });
    };
    fetchDepartments();
  }, []);
  console.log(departments);
  return (
    <div className="homepage">
      <div className={`${styles.department}`}>{departments.name}</div>
      <ul>
        {departments.subdepartments ? (
          <ul>
            {departments.subdepartments.map((sub) => (
              <div
                key={sub.id_department}
                className={`${styles.subdepartments}`}
                onClick={() => navigate(`${sub.id}`)}
              >
                {sub.name}
              </div>
            ))}
          </ul>
        ) : null}
      </ul>
    </div>
  );
}
