import React from 'react';
import Messages from './Messages';
import { Form } from 'react-bootstrap';
import Editor from '../Editor/Editor';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import instance from '../../axios';
export default function MessageBox(props) {
  const [validationError, setValidationError] = useState({});
  const [editorData, setEditorData] = useState('');
  const [userName, setUserName] = useState('');

  const createMessage = async (e) => {
    e.preventDefault();
    //dane do wysłania

    const room_id = props.chat.room_id;
    const receiver_id = props.chat.user.id;
    const is_readed = '0';
    const formData = new FormData();
    formData.append('touserId', receiver_id);
    formData.append('roomid', room_id);
    formData.append('message', editorData);
    formData.append('status', is_readed);
    await instance
      .post(`http://localhost:8000/api/send`, formData)
      .then(({ data }) => {
        Swal.fire({
          icon: 'success',
          text: data.message,
        });
        Navigate(`/message`);
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

  const messages = (chat) => {
    if (chat.messages) {
      return chat.messages.map((message) => <div> {message} </div>);
    }
  };
  console.log(props);
  return (
    <div>
      {props.chat ? (
        <div>
          <Messages messages={props.chat.messages} user={props.chat.user} />
          <Form onSubmit={createMessage}>
            <Editor
              onChange={(data) => setEditorData(data)}
              className="editor"
            />
            <Button
              variant="primary"
              className="mt-2 submit-button"
              size="lg"
              block="block"
              type="submit"
            >
              Dodaj
            </Button>
          </Form>
        </div>
      ) : null}
    </div>
  );
}
