import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './ViewTopic.css';
import Editor from '../Editor/Editor';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
export default function ViewTopic() {
  const [auth, setAuth] = useAuth();
  const [topic, setTopic] = useState([]);
  const [validationError, setValidationError] = useState([]);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [editorData, setEditorData] = useState('');
  let { id_dep, id_sub, id_cat, id_top } = useParams();
  useEffect(() => {
    const fetchTopics = async () => {
      await axios
        .get(`http://localhost:8000/api/topics/${id_top}`)
        .then((res) => {
          setTopic({
            id_topic: res.data.topic.id_topic,
            id_category: res.data.topic.id_category,
            id_user: res.data.topic.id_user,
            name: res.data.topic.name,
            content: res.data.topic.content,
          });
        });
    };
    fetchTopics();
    const fetchPosts = async () => {
      await axios.get(`http://localhost:8000/api/posts`).then((res) => {
        const data = res.data.map((dep) => ({
          id_post: dep.id_post,
          id_topic: dep.id_topic,
          id_user: dep.id_user,
          content: dep.content,
        }));
        setPosts(data);
      });
    };
    fetchPosts();
    const fetchUsers = async () => {
      await axios.get(`http://localhost:8000/api/users`).then((res) => {
        const data = res.data.map((dep) => ({
          id_user: dep.id,
          content: dep.content,
          name: dep.name,
          created_at: dep.created_at,
        }));
        setUsers(data);
      });
    };
    fetchUsers();
  }, []);
  const newPost = async (e) => {
    e.preventDefault();
    //dane do wysłania
    const formData = new FormData();
    formData.append('id_user', 3);
    formData.append('id_topic', id_top);
    formData.append('content', editorData);

    console.log(formData);
    await axios
      .post(`http://localhost:8000/api/posts`, formData)
      .then(({ data }) => {
        Swal.fire({
          icon: 'success',
          text: data.message,
        });
        Navigate('/forum/:id_dep/:id_sub/:id_cat/');
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        } else {
          Swal.fire({
            text: response.data.message,
            icon: 'error',
          });
        }
      });
  };

  return (
    <div className={`${styles.topic}`}>
      {users.length > 0 &&
        users.map((user) => {
          if (topic.id_user === user.id_user) {
            let data = new Date(Date.parse('user.created_at'));
            return (
              <>
                <div
                  className={`${styles.userInfo} col-2 border border-primary`}
                >
                  Nazwa użytkownika: <b>{user.name}</b>
                  <br />
                  Data założenia konta: {};
                  <br />
                  Ilość postów:
                </div>
              </>
            );
          }
        })}
      <div className={`${styles.topicInfo} `}>
        <div className={`${styles.NameTopic}`}>{topic.name}</div>
        <div className={`${styles.ContentTopic}`}>{topic.content}</div>
      </div>
      {posts.length > 0 &&
        posts.map((post) => {
          if (post.id_topic === topic.id_topic) {
            return (
              <>
                <div className={`${styles.postInfo}`}>{post.id_user}</div>
                <div className={`${styles.postContent} `}>{post.content}</div>
              </>
            );
          }
        })}
      {auth ? (
        <>
          <div className={`${styles.odp} `}>
            <Form onSubmit={newPost}>
              <b>Napisz odpowiedź</b>
              <Editor onChange={(data) => setEditorData(data)} />
              <Button
                variant="primary"
                className="mt-2"
                size="lg"
                block="block"
                type="submit"
              >
                Dodaj
              </Button>
            </Form>
          </div>
        </>
      ) : (
        <>
          {' '}
          <div className={`${styles.cykadlo}`}>
            Aby móc dodawać posty musisz się zalogować.
            <Link to={`http://localhost:3000/login`}>Zaloguj się</Link>
          </div>
        </>
      )}
    </div>
  );
}
