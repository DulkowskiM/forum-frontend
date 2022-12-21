import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Topic() {
  const { topicId } = useParams();
  const [topic, setTopic] = useState({
    content: '',
    title: '',
    posts: [],
  });

  useEffect(() => {
    // const response = axios.get("htea/topic/44")
    // setTopic(response.data)

    setTopic({
      content: 'Testowy',
      title: 'Testowy title',
      posts: [
        { content: 'Kontent postu1' },
        { content: 'Kontent postu2' },
        { content: 'Kontent postu3' },
        { content: 'Kontent postu4' },
        { content: 'Kontent postu5' },
        { content: 'Kontent postu6' },
      ],
    });
  }, []);

  return (
    <div>
      <h3>{topic.title}</h3>
      <div>{topic.content}</div>
      {topic.posts.map((post) => (
        <div> {post.content} </div>
      ))}
    </div>
  );
}
