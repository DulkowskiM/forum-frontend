import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditDepartment() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [name, setName] = useState('');
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    await axios
      .get(`http://localhost:8000/api/departments/${id}`)
      .then(({ data }) => {
        const { name } = data.department;
        setName(name);
      })
      .catch((e) => {
        Swal.fire({
          text: e.message,
          icon: 'error',
        });
      });
  };
  const updateDepartment = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('_method', 'PATCH');
    formData.append('name', name);
    console.log(formData);
    await axios
      .post(`http://localhost:8000/api/departments/${id}`, formData)
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
              <h4 className="card-title">Zmień nazwę działu</h4>
              <hr />
              <div className="form-wrapper">
                {Object.keys(validationError).length > 0 && (
                  <div className="row">
                    <div className="col-12">
                      <div className="alert alert-danger">
                        <ul className="mb-0">
                          {Object.entries(validationError).map(
                            ([key, value]) => (
                              <li key={key}>{value}</li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                <Form onSubmit={updateDepartment}>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Nazwa</Form.Label>
                        <Form.Control
                          type="text"
                          value={name}
                          onChange={(event) => {
                            setName(event.target.value);
                          }}
                        />
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
