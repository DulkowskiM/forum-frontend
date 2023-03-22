import React from 'react';
import ChatsSidebar from './ChatsSidebar/ChatsSidebar';
import MessageBox from './MessageBox';
import { useState } from 'react';
import instance from '../../axios';

import './styl.css';
export default function ChatBox(props) {
  const [openedChat, setOpenedChat] = useState();

  const openChat = async (userid) => {
    await instance
      .get(`http://localhost:8000/api/chat/${userid}`)
      .then((res) => {
        if (res.data) {
          setOpenedChat(res.data);
        }
      });
  };

  return (
    <div className="chat-box-container row">
      <div className="navigation col-4">
        <ChatsSidebar chats={props.chats} openChat={openChat} />
      </div>
      <div className="col-8">
        {openedChat && <MessageBox chat={openedChat} />}
      </div>
    </div>
  );
}
