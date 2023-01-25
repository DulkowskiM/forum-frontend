import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Message.module.css';
export default function SubDepartment() {
  const tokenData = localStorage.getItem('token-data');
  const tokenDataJSON = JSON.parse(tokenData);
  const id_user = tokenDataJSON.id;
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMessages = async () => {
      await axios.get(`http://localhost:8000/api/message`).then((res) => {
        console.log(res.data);
        // const data = res.data.map((dep) => ({

        // }));
        // setMessages(data);
      });
    };

    // fetchMessages();
    // const fetchUsers = async () => {
    //   await axios.get(`http://localhost:8000/api/users`).then((res) => {
    //     const data = res.data.map((dep) => ({
    //       id: dep.id,
    //       name: dep.name,
    //     }));
    //     setUsers(data);
    //   });
    // };

    // fetchUsers();
  });
  let senders = [];
  return (
    <div className={`row ${styles.main} mt-3`}>
      <div className="card p-0">
        <div className={`col-12 ps-4 p-2 ${styles.name}`}>
          Wiadomości prywatne
        </div>
        <div className="card-body p-0">
          <table className="table table-striped">
            <thead className="card-header">
              <tr>
                <th
                  className={`col-2 text-center ${styles.headers}`}
                  style={{ border: 'none' }}
                >
                  Odbiorca
                </th>
                <th
                  className={`col-10 text-center ${styles.headers}`}
                  style={{ border: 'none' }}
                >
                  Wiadomości
                </th>
              </tr>
            </thead>
            <tbody>
              {/* <div>chuj2</div> */}
              {messages.map((message) => {
                if (message.id_receiver === id_user) {
                  return users.map((user) => {
                    if (user.id === message.id_sender) {
                      if (!senders.includes(user.id)) {
                        senders.push(user.id);
                        return (
                          <tr>
                            <td>{user.name}</td>
                            <td>{message.message}</td>
                          </tr>
                        );
                      }
                    }
                  });
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
