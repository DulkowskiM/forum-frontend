import React, { useState, useEffect } from 'react';
import Departments from '../../components/Departments/Departments';

export default function Home() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    setDepartments([
      {
        id: 1,
        name: 'Pomoc techniczna',
        forums: [
          {
            title: 'Błąd ładowania gry',
            summary: 'Ładowanie gry zacina mi się przy 30% ...',
            topicsCount: 50,
            postCount: 80,
            lastPost: {
              postName: 'Post name',
              authorName: 'Author Name',
              date: '24/11/2022',
              time: '20:38',
            },
          },
          {
            title: 'Błędna kolizacja na mapie',
            summary: 'Na mapie X da się przechodzić po scianie ...',
            topicsCount: 10,
            postCount: 30,
            lastPost: {
              postName: 'Post name',
              authorName: 'Author Name',
              date: '24/11/2022',
              time: '20:38',
            },
          },
        ],
      },
      {
        id: 2,
        name: 'Questy i solucje',
        forums: [
          {
            title: 'Dom tuni',
            summary: 'Quest na 70 lvl u tuni w kwiecisty przejsciu...',
            topicsCount: 20,
            postCount: 60,
            lastPost: {
              postName: 'Post name',
              authorName: 'Author Name',
              date: '24/11/2022',
              time: '20:38',
            },
          },
          {
            title: 'Teleport Ithan',
            summary: 'Aby uzyskać możliwość teleportacji do Ithan należy ...',
            topicsCount: 50,
            postCount: 80,
            lastPost: {
              postName: 'Post name',
              authorName: 'Author Name',
              date: '24/11/2022',
              time: '20:38',
            },
          },
          {
            title: 'Przejście władców mrozu',
            summary: 'Quest wymaga osiagnięcia 300 poziomu doświadczenia...',
            topicsCount: 20,
            postCount: 60,
            lastPost: {
              postName: 'Post name',
              authorName: 'Author Name',
              date: '24/11/2022',
              time: '20:38',
            },
          },
        ],
      },
    ]);
  }, []);

  return (
    <div>
      <Departments departments={departments} />
    </div>
  );
}
