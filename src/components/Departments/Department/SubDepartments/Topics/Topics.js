import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Topics(props) {
  const navigate = useNavigate();
  return (
    <div>
      {props.topics.map((topic, index) => (
        <li
          key={index}
          onClick={() =>
            navigate(
              `/forum/${props.department}/${props.subdepartment}/${topic}`,
            )
          }
        >
          {topic}
        </li>
      ))}
    </div>
  );
}
