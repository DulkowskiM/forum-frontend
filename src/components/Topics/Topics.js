import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function List() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    await axios.get(`http://localhost:8000/api/topics`).then(({ data }) => {
      setTopics(data);
    });
  };

  const deleteTopic = async (id_topic) => {
    const isConfirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
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
      .delete(`http://localhost:8000/api/topics/${id_topic}`)
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
          <div className="card card-body">
            <div className="table-responsive">
              <table className="table table-bordered mb-0 text-center">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {topics.length > 0 &&
                    topics.map((row, key) => (
                      <tr key={key}>
                        <td>{row.name}</td>
                        <td>{row.content}</td>
                        <td>
                          <Link
                            to={`/topic/edit/${row.id_topic}`}
                            className="btn btn-success me-3"
                          >
                            Edit
                          </Link>
                          <Button
                            variant="danger"
                            onClick={() => deleteTopic(row.id_topic)}
                          >
                            Delete
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
