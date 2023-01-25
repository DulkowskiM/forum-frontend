import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../Main.module.css';
export default function SubDepartment() {
  const [categories, setCategories] = useState([]);
  const [subdepartment, setSubDepartment] = useState([]);
  const navigate = useNavigate();
  let { id_dep, id_sub } = useParams();
  useEffect(() => {
    const fetchSubDepartment = async () => {
      await axios
        .get(`http://localhost:8000/api/subdepartments/${id_sub}`)
        .then((res) => {
          setSubDepartment({
            id_deps: res.data.subdepartment.id_department,
            id_subd: res.data.subdepartment.id_subdepartment,
            name: res.data.subdepartment.name,
          });
        });
    };
    fetchSubDepartment();
    const fetchCategories = async () => {
      await axios.get(`http://localhost:8000/api/categories`).then((res) => {
        const data = res.data.map((dep) => ({
          id_category: dep.id_category,
          id_subdep: dep.id_subdepartment,
          name: dep.name,
        }));
        setCategories(data);
      });
    };
    fetchCategories();
  }, []);
  // console.log(categories);
  // console.log(subdepartment);
  console.log(id_sub);
  return (
    <div className={`row ${styles.main} mt-3`}>
      <div className="card p-0">
        <div className={`col-12 ps-4 p-2 ${styles.name}`}>
          {subdepartment.name}
        </div>
        <div className="card-body p-0">
          <table className="table table-striped">
            <thead className="card-header">
              <tr>
                <th
                  className={`col-4 text-center ${styles.headers}`}
                  style={{ border: 'none' }}
                >
                  Dostępne kategorie
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {categories.length > 0 &&
                    categories.map((categories) => {
                      if (categories.id_subdep === subdepartment.id_subd) {
                        return (
                          <div className={styles.subdepartments}>
                            <p
                              onClick={() =>
                                navigate(
                                  `/forum/${subdepartment.id_deps}/${categories.id_subdep}/${categories.id_category}`,
                                )
                              }
                            >
                              {categories.name}
                            </p>
                          </div>
                        );
                      }
                    })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
