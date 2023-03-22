import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Swal from 'sweetalert2';
import Editor from '../../components/Editor/Editor';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
export default function AddPost() {
  let { id_dep, id_sub, id_cat } = useParams();
  const [nameTopic, setNameTopic] = useState('');
  const [validationError, setValidationError] = useState({});
  const [editorData, setEditorData] = useState('');
  const [auth] = useAuth();
  const navigate = useNavigate();
  const newTopic = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id_category', id_cat);
    formData.append('id_user', auth.id);
    formData.append('name', nameTopic);
    formData.append('content', editorData);
    console.log(formData);
    await axios
      .post(`http://localhost:8000/api/topics`, formData)
      .then(({ data }) => {
        Swal.fire({
          icon: 'success',
          text: data.message,
        });
        navigate(`/forum/${id_dep}/${id_sub}/${id_cat}`);
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
    <Form onSubmit={newTopic}>
      <Row>
        <Col>
          <Form.Group controlId="Name">
            <Form.Label>Nazwa tematu</Form.Label>
            <Form.Control
              type="text"
              value={nameTopic}
              onChange={(event) => {
                setNameTopic(event.target.value);
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Editor onChange={(data) => setEditorData(data)} />
      <Button
        variant="primary"
        className="mt-2"
        size="lg"
        block="block"
        type="submit"
      >
        Dodaj
      </Button>
    </Form>
  );
}
