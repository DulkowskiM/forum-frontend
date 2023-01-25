import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Main.module.css';
export default function Department() {
  const [department, setDepartment] = useState([]);
  const [subdepartments, setSubDepartments] = useState([]);
  const navigate = useNavigate();
  let { id_dep } = useParams();
  useEffect(() => {
    const fetchDepartments = async () => {
      await axios
        .get(`http://localhost:8000/api/departments/${id_dep}`)
        .then((res) => {
          setDepartment({
            id: res.data.department.id_department,
            name: res.data.department.name,
          });
        });
    };
    fetchDepartments();
    const fetchSubDepartments = async () => {
      await axios
        .get(`http://localhost:8000/api/subdepartments`)
        .then((res) => {
          const data = res.data.map((dep) => ({
            id_dep: dep.id_department,
            id_subdepartment: dep.id_subdepartment,
            name: dep.name,
          }));
          setSubDepartments(data);
        });
    };
    fetchSubDepartments();
  }, []);
  console.log(subdepartments);
  return (
    <div className={`row ${styles.main} mt-3`}>
      <div className="card p-0">
        <div className={`col-12 ps-4 p-2 ${styles.name}`}>
          <h1>{department.name}</h1>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped">
            <thead className="card-header">
              <tr>
                <th
                  className={`col-4  ${styles.headers}`}
                  style={{ border: 'none' }}
                >
                  Dostępne poddziały
                </th>
              </tr>
            </thead>
            <tbody>
              {subdepartments.length > 0 &&
                subdepartments.map((subdepartments) => {
                  if (subdepartments.id_dep === department.id) {
                    return (
                      <tr>
                        <td>
                          <div className={styles.subdepartments}>
                            <p
                              onClick={() =>
                                navigate(
                                  `/forum/${department.id}/${subdepartments.id_subdepartment}`,
                                )
                              }
                            >
                              {subdepartments.name}
                            </p>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
