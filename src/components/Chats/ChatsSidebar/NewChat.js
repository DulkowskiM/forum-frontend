import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import instance from '../../../axios';

const NewChat = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:8000/api/users');
      const user = response.data.find((user) => user.name === userName);
      if (!user) {
        throw new Error('Użytkownik o podanym nicku nie istnieje');
      }
      const chatResponse = await instance.get(
        `http://localhost:8000/api/chat/${user.id}`,
      );
      console.log(chatResponse.data);

      Swal.fire({
        icon: 'success',
        title: 'Sukces!',
        text: `Rozpocząłeś czat z użytkownikiem ${userName}`,
      });

      navigate(`/message`); // przekierowanie do czatu
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Błąd',
        text: error.message,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nick użytkownika:
          <input
            type="text"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </label>
        <button type="submit">Rozpocznij czat</button>
      </form>
    </div>
  );
};

export default NewChat;
