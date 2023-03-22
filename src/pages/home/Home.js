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
  console.log(departments);
  return (
    <div className="homepage">
      <ul>
        {departments.map((department) => {
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
                      <div
                        className={`${styles.subdepartments}`}
                        onClick={() =>
                          navigate(
                            `forum/${department.id_department}/${subdepartment.id_subdepartment}`,
                          )
                        }
                      >
                        {subdepartment.name}
                      </div>
                      <ol>
                        {subdepartment.categories.map((category) => (
                          <div
                            className={`${styles.categories}`}
                            onClick={() =>
                              navigate(
                                `forum/${department.id_department}/${category.id_subdepartment}/${category.id}`,
                              )
                            }
                          >
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
