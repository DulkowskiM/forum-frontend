import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import Editor from '../../components/Editor/Editor';
import { useParams } from 'react-router-dom';

export default function NewTopic() {
  let { id_dep, id_sub, id_cat } = useParams();
  const [nameTopic, setNameTopic] = useState('');
  const [validationError, setValidationError] = useState({});
  const [editorData, setEditorData] = useState('');

  const createTopic = async (e) => {
    e.preventDefault();
    //dane do wysłania
    const formData = new FormData();
    formData.append('id_category', id_cat);
    formData.append('id_user', 3);
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
        Navigate(`/forum/${id_dep}/${id_sub}/${id_cat}`);
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
    <Form onSubmit={createTopic}>
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
