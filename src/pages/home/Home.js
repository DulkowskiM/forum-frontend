import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
export default function Home() {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDepartments = async () => {
      await axios
        .get(`http://localhost:8000/api/departments/subdepartments/categories`)
        .then((res) => {
          if (res.data) {
            setDepartments(res.data.departments);
          }
        });
    };
    fetchDepartments();
  }, []);

  const categories = (categories) => {
    return categories.map((category) => <li>{category.name}</li>);
  };
  const subdepartments = (subdepartments) => {
    return categories.map((subdepartment) => <li>{subdepartment.name}</li>);
  };

  return (
    <div className="homepage">
      <ul>
        {departments.map((department) => {
          console.log(department);
          return (
            <li>
              <div
                className={`${styles.department}`}
                onClick={() => navigate(`forum/${department.id_department}`)}
              >
                {department.name}
              </div>
              <ul>
                {department.subdepartments.map((subdepartment) => {
                  return (
                    <li>
                      <div className={`${styles.subdepartments}`}>
                        {subdepartment.name}
                      </div>
                      <ol>
                        {subdepartment.categories.map((category) => (
                          <div className={`${styles.categories}`}>
                            {category.name}
                          </div>
                        ))}
                      </ol>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
