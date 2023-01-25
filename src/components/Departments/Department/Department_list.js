import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function List() {
  const [departments, setDepartments] = useState([]);
  const [subdepartment, setSubDepartments] = useState([]);
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    await axios.get(`http://localhost:8000/api/departments`).then((res) => {
      setDepartments(res.data);
    });
  };
  const fetchSubDepartments = async () => {
    await axios.get(`http://localhost:8000/api/subdepartments`).then((res) => {
      setSubDepartments(res.data);
    });
  };
  const deleteDepartment = async (id_department) => {
    const isConfirm = await Swal.fire({
      title: 'Jesteś pewien ?',
      text: 'Będziesz tego żałował',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    await axios
      .delete(`http://localhost:8000/api/departments/${id_department}`)
      .then(({ data }) => {
        Swal.fire({
          icon: 'success',
          text: data.message,
        });
        fetchDepartments();
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
          <Link
            className="btn btn-primary mb-2 float-end"
            to={'/department/create'}
          >
            Stwórz nowy dział
          </Link>
        </div>
        <div className="col-12">
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
                  {departments.length > 0 &&
                    departments.map((row, key) => (
                      <tr key={key}>
                        <td>{row.name}</td>
                        <td>
                          <Link
                            to={`/department/edit/${row.id_department}`}
                            className="btn btn-success me-2"
                          >
                            Edytuj
                          </Link>
                          <Button
                            variant="danger"
                            onClick={() => deleteDepartment(row.id_department)}
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
    </div>
  );
}
