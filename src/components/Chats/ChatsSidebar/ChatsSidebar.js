import React from 'react';
import useAuth from '../../../hooks/useAuth';
import './ChatsSidebar.css';
import { Link } from 'react-router-dom';
export default function ChatsSidebar(props) {
  const [auth, setAuth] = useAuth();
  return (
    <div className="chat-container">
      <div className="chat-list">
        <div className="d-flex">
          <h2 className="title">Konwersacje</h2>
          <Link to="/newchat" className="btn btn-primary justify-content-end">
            Nowy czat
          </Link>
        </div>
        <ul>
          {props.chats
            ? props.chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() =>
                    props.openChat(
                      auth.id === chat.user_1.id
                        ? chat.user_2.id
                        : chat.user_1.id,
                    )
                  }
                >
                  <div className="user-panel">
                    <div className="user-avatar">
                      {auth.id === chat.user_1.id
                        ? chat.user_2.avatar
                        : chat.user_1.avatar}
                    </div>
                    <div className="user-name">
                      {auth.id === chat.user_1.id
                        ? chat.user_2.name
                        : chat.user_1.name}
                    </div>
                  </div>
                </div>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
}
