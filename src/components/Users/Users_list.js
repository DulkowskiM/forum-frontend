import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
import pagination from '../Departments/pagination.css';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers(currentPage);
  }, []);

  const fetchUsers = async (pageNumber) => {
    await axios
      .get(`http://localhost:8000/api/users?page=${pageNumber}`)
      .then(({ data }) => {
        setCurrentPage(pageNumber);
        setUsers(data.data);
        console.log(data);
        setTotalPageCount(data.last_page);
      });
  };

  const deleteUser = async (id_user) => {
    const isConfirm = await Swal.fire({
      title: 'Jesteś pewien?',
      text: 'Usunięcie użytkownika spowoduje również usunięcie jego postów oraz odpowiedzi do postów',
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
      .delete(`http://localhost:8000/api/users/${id_user}`)
      .then(({ data }) => {
        Swal.fire({
          icon: 'success',
          text: data.message,
        });
        fetchUsers(currentPage);
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: 'error',
        });
      });
  };

  const handlePageClick = (event) => {
    console.log(event.selected + 1);
    fetchUsers(event.selected + 1);
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
                  <th>Id</th>
                  <th>Nazwa</th>
                  <th>Data utworzenia</th>
                  <th>Operacje</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 &&
                  users.map((row, key) => (
                    <tr key={key}>
                      <td>{row.id}</td>
                      <td>{row.name}</td>
                      <td>{row.created_at}</td>
                      <td>
                        <Link
                          to={`/user/edit/${row.id}`}
                          className="btn btn-success me-3"
                        >
                          Edytuj nazwę
                        </Link>
                        <Link
                          to={`/user/permission/${row.id}`}
                          className="btn btn-primary me-3"
                        >
                          Edytuj uprawnienia
                        </Link>
                        <Button
                          variant="danger"
                          onClick={() => deleteUser(row.id)}
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
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        activeClassName="selected" // dodanie klasy dla aktywnego elementu
        containerClassName="pagination" // dodanie klasy dla całej paginacji
      />
    </div>
  );
}
