import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default function EditUser() {
  const navigate = useNavigate();

  const [isAdmin, setisAdmin] = useState('');
  const { id } = useParams();
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    await axios
      .get(`http://localhost:8000/api/users/${id}`)
      .then(({ data }) => {
        const { isAdmin } = data.user;
        setisAdmin(isAdmin);
        console.log(data);
      })
      .catch((e) => {
        Swal.fire({
          text: e.message,
          icon: 'error',
        });
      });
  };
  console.log(isAdmin);
  const updateUserPermision = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('is_admin', parseInt(isAdmin));
    await axios
      .post(`http://localhost:8000/api/users/${id}/change_permission`, formData)
      .then(({ data }) => {
        Swal.fire({
          icon: 'success',
          text: data.message,
        });
        navigate('/admin');
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        } else {
          Swal.fire({
            text: response.data.message,
            icon: 'error',
          });
        }
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Zmień uprawnienia użytkownika</h4>
              <hr />
              <div className="form-wrapper">
                {Object.keys(validationError).length > 0 && (
                  <div className="row">
                    <div className="col-12">
                      <div className="alert alert-danger">
                        <ul className="mb-0">
                          {Object.entries(validationError).map(
                            ([key, value]) => (
                              <li key={key}>Nie można ustawić rangi brak</li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                <Form onSubmit={updateUserPermision}>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Permisje</Form.Label>
                        <Form.Control
                          as="select"
                          value={isAdmin}
                          onChange={(e) => setisAdmin(e.target.value)}
                        >
                          <option>Brak</option>
                          <option value="0">Użytkownik</option>
                          <option value="1">Administrator</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    variant="primary"
                    className="mt-2"
                    size="lg"
                    block="block"
                    type="submit"
                  >
                    Aktualizuj
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
