import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function List() {
  const [subdepartments, setSubdepartments] = useState([]);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    await axios
      .get(`http://localhost:8000/api/subdepartments`)
      .then(({ data }) => {
        setSubdepartments(data);
      });
  };

  const deleteTopic = async (id_subdepartment) => {
    const isConfirm = await Swal.fire({
      title: 'Jetseś pewien?',
      text: 'Usunięcie pod działu powoduje również usunięcie kategorii,tematów oraz odpowiedzi do tematów',
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
      .delete(`http://localhost:8000/api/subdepartments/${id_subdepartment}`)
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
        <div className="col-12">
          {/* <Link
            className="btn btn-primary mb-2 float-end"
            to={'/subdepartment/create'}
          >
            Stwórz nowy dział
          </Link> */}
        </div>
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
                {subdepartments.length > 0 &&
                  subdepartments.map((row, key) => (
                    <tr key={key}>
                      <td>{row.name}</td>
                      <td>
                        <Link
                          to={`/topic/edit/${row.id_subdepartment}`}
                          className="btn btn-success me-3"
                        >
                          Edytuj
                        </Link>
                        <Button
                          variant="danger"
                          onClick={() => deleteTopic(row.id_subdepartment)}
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
