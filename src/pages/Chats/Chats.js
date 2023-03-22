import React from 'react';
import instance from '../../axios';
import { useState, useEffect } from 'react';
import ChatBox from '../../components/Chats/ChatBox';
function Chats() {
  const [chats, setChats] = useState();
  useEffect(() => {
    const fetchChats = async () => {
      await instance.get(`http://localhost:8000/api/rooms`).then((res) => {
        if (res.data) {
          setChats(res.data.rooms);
        }
      });
    };
    fetchChats();
  }, []);

  return (
    <div>
      <ChatBox chats={chats} />
    </div>
  );
}

export default Chats;
