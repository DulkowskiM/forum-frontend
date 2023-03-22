import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../Main.module.css';

export default function Department() {
  const [subdepartments, setSubDepartments] = useState([]);
  const navigate = useNavigate();
  let { id_sub } = useParams();
  useEffect(() => {
    const fetchSubDepartments = async () => {
      await axios
        .get(`http://localhost:8000/api/subdepartment/${id_sub}`)
        .then((res) => {
          if (res.data) {
            setSubDepartments(res.data.subdepartment);
          }
        });
    };
    fetchSubDepartments();
  }, []);

  return (
    <div className="homepage">
      <div className={`${styles.department}`}>{subdepartments.name}</div>
      {subdepartments.categories ? (
        <ul>
          {subdepartments.categories.map((cat) => (
            <div
              key={cat.id_subdepartment}
              className={`${styles.subdepartments}`}
              onClick={() => navigate(`${cat.id}`)}
            >
              {cat.name}
            </div>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
