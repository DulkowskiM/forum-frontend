// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import instance from '../../axios';
// import parse from 'html-react-parser';
// const Profile = () => {
//   const [userData, setUserData] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await instance.get(
//           `http://localhost:8000/api/profile/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//           },
//         );
//         setUserData(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchUserData();
//   }, [id]);
//   console.log(userData);
//   return (
//     <div>
//       {userData ? (
//         <>
//           <p>name: {userData.user.name}</p>
//           {userData.posts && userData.posts.length > 0 && (
//             <>
//               <p>Posty:</p>
//               <ul>
//                 {userData.posts.map((post) => (
//                   <li key={post.id_post}>{parse(post.content)}</li>
//                 ))}
//               </ul>
//             </>
//           )}
//           {userData.topics && userData.topics.length > 0 && (
//             <>
//               <p>Tematy:</p>
//               <ul>
//                 {userData.topics.map((topic) => (
//                   <li key={topic.id}>
//                     {topic.name} - {parse(topic.content)}
//                   </li>
//                 ))}
//               </ul>
//             </>
//           )}
//           {userData.topics && userData.topics.length === 0 && (
//             <p>Użytkownik nie stworzył jeszcze żadnych tematów.</p>
//           )}
//         </>
//       ) : (
//         <p>Pobieranie danych użytkownika...</p>
//       )}
//     </div>
//   );
// };

// export default Profile;
import React, { useEffect, useState } from 'react';
import instance from '../../axios';
import parse from 'html-react-parser';
import './Style.css';
import { useParams } from 'react-router-dom';
const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await instance.get(
          `http://localhost:8000/api/profile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );
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

export default Profile;
