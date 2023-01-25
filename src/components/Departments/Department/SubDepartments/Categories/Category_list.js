import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Category_list() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    await axios.get(`http://localhost:8000/api/categories`).then(({ data }) => {
      setCategory(data);
    });
  };

  const deleteTopic = async (id_category) => {
    const isConfirm = await Swal.fire({
      title: 'Jetseś pewien?',
      text: 'Usunięcie kategorii powoduje również usunięcie tematów oraz odpowiedzi do tematów',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Tak, mimo to usuń',
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    await axios
      .delete(`http://localhost:8000/api/categories/${id_category}`)
      .then(({ data }) => {
        Swal.fire({
          icon: 'success',
          text: data.message,
        });
        fetchTopics();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: 'error',
        });
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12"></div>
        <div className="card card-body">
          <div className="table-responsive">
            <table className="table table-bordered mb-0 text-center">
              <thead>
                <tr>
                  <th>Nazwa</th>
                  <th>Operacje</th>
                </tr>
              </thead>
              <tbody>
                {category.length > 0 &&
                  category.map((row, key) => (
                    <tr key={key}>
                      <td>{row.name}</td>
                      <td>
                        <Link
                          to={`/topic/edit/${row.id_category}`}
                          className="btn btn-success me-3"
                        >
                          Edytuj
                        </Link>
                        <Button
                          variant="danger"
                          onClick={() => deleteTopic(row.id_category)}
                        >
                          Usuń
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
