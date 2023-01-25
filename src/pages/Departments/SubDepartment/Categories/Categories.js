import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from '../../Main.module.css';
export default function Department() {
  const [category, setCategory] = useState([]);
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  let { id_dep, id_sub, id_cat } = useParams();
  useEffect(() => {
    const fetchCategories = async () => {
      await axios
        .get(`http://localhost:8000/api/categories/${id_cat}`)
        .then((res) => {
          setCategory({
            id_cat: res.data.category.id_category,
            id_subd: res.data.category.id_subdepartment,
            name: res.data.category.name,
          });
        });
    };
    fetchCategories();
    const fetchTopics = async () => {
      await axios.get(`http://localhost:8000/api/topics`).then((res) => {
        const data = res.data.map((dep) => ({
          id_category: dep.id_category,
          id_topic: dep.id_topic,
          name: dep.name,
        }));
        setTopics(data);
      });
    };
    fetchTopics();
  }, []);
  return (
    <div className={`row ${styles.main} mt-3`}>
      <div className="card p-0">
        <div className={`col-12 ps-4 p-2 ${styles.name}`}>
          {category.name}
          <Link
            className="btn btn-info mb-2 float-end"
            to={`/forum/${id_dep}/${id_sub}/${id_cat}/newtopic`}
          >
            Stwórz nowy temat
          </Link>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped">
            <thead className="card-header">
              <tr>
                <th
                  className={`col-4 text-center ${styles.headers}`}
                  style={{ border: 'none' }}
                >
                  Dostępne tematy
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {topics.length > 0 &&
                    topics.map((topics) => {
                      if (topics.id_category === category.id_cat) {
                        return (
                          <div className={styles.subdepartments}>
                            <p
                              onClick={() =>
                                navigate(
                                  `/forum/${id_dep}/${id_sub}/${topics.id_category}/${topics.id_topic}`,
                                )
                              }
                            >
                              {topics.name}
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
