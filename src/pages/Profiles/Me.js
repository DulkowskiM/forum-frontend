import React, { useEffect, useState } from 'react';
import instance from '../../axios';
import parse from 'html-react-parser';
import './Style.css';

const Me = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await instance.get('http://localhost:8000/api/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      {userData ? (
        <>
          <div className="border rounded-md p-4 col-span-1">
            <p className="font-bold mb-2">name:</p>
            <p>{userData.user.name}</p>
          </div>
          <div className="col-span-3 space-y-4">
            {userData.posts && userData.posts.length > 0 && (
              <div className="border rounded-md p-4">
                <p className="font-bold mb-2">Posty:</p>
                <ul className="list-disc pl-4">
                  {userData.posts.map((post) => (
                    <li
                      key={post.id_post}
                      className="border rounded-md p-4 my-4"
                    >
                      {parse(post.content)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {userData.topics && userData.topics.length > 0 && (
              <div className="border rounded-md p-4">
                <p className="font-bold mb-2">Tematy:</p>
                <ul className="list-disc pl-4">
                  {userData.topics.map((topic) => (
                    <li key={topic.id} className="border rounded-md p-4 my-4">
                      <p>{topic.name}</p>
                      {parse(topic.content)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {userData.topics && userData.topics.length === 0 && (
              <div className="border rounded-md p-4">
                <p>Użytkownik nie stworzył jeszcze żadnych tematów.</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <p>Pobieranie danych użytkownika...</p>
      )}
    </div>
  );
};

export default Me;
