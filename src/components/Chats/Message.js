import React from 'react';
import parse from 'html-react-parser';
import useAuth from '../../hooks/useAuth';
import './message.css';
export default function Message(props) {
  const [auth] = useAuth();

  const message = props.message;
  const isFromAuth = props.from_id === auth.id;

  return (
    <div
      className={`row ${
        isFromAuth
          ? 'justify-content-end message-sender'
          : 'justify-content-start message-receiver'
      } message-container`}
    >
      <div
        className={`col-md-8 ${isFromAuth ? 'order-2 text-right' : 'order-1'}`}
      >
        <div className="card message-card">
          <div className="card-body message-body">{parse(message)}</div>
          <div
            className={`card-footer message-footer ${
              isFromAuth ? 'sender' : 'receiver'
            }`}
          >
            <small className="text-muted">
              Od: {isFromAuth ? auth.name : props.user.name}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
