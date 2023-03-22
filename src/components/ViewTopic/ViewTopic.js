import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ViewTopic.css';
import Editor from '../Editor/Editor';
import Swal from 'sweetalert2';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import pagination from '../../components/Departments/pagination.css';
import parse from 'html-react-parser';
export default function ViewTopic() {
  const [auth, setAuth] = useAuth();
  const [topic, setTopic] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [validationError, setValidationError] = useState([]);
  const [editorData, setEditorData] = useState('');

  let { id_top } = useParams();
  useEffect(() => {
    // fetchPosts();
    fetchPosts(currentPage);
  }, []);
  console.log(id_top);
  const fetchPosts = async (pageNumber) => {
    await axios
      .get(`http://localhost:8000/api/topic/${id_top}?page=${pageNumber}`)
      .then(({ data }) => {
        console.log(data);
        setTotalPageCount(data.pagination.last_page);
        setCurrentPage(data.pagination.pageNumber);
        setTopic(data.Topic);
        setPosts(data.Posts);
      });
  };
  let tokenData = localStorage.getItem('token-data');
  let id = JSON.parse(tokenData).id;
  const handlePageClick = (event) => {
    console.log(event.selected + 1);
    fetchPosts(event.selected + 1);
  };
  const newPost = async (e) => {
    e.preventDefault();
    //dane do wysłania
    const formData = new FormData();
    formData.append('id_user', id);
    formData.append('id_topic', id_top);
    formData.append('content', editorData);

    await axios
      .post(`http://localhost:8000/api/posts`, formData)
      .then(({ data }) => {
        console.log(data);
        Swal.fire({
          icon: 'success',
          text: data.message,
        });
        // Navigate('/forum/:id_dep/:id_sub/:id_cat/');
        window.location.reload(false); //odświeżenie strony.
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
  const closeTopic = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('is_open', parseInt(0));
    await axios
      .post(`http://localhost:8000/api/topic/${id_top}/status`, formData)
      .then(({ data }) => {
        Swal.fire({
          icon: 'success',
          text: data.message,
        });
        window.location.reload(false); //odświeżenie strony.
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
  const openTopic = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('is_open', parseInt(1));
    await axios
      .post(`http://localhost:8000/api/topic/${id_top}/status`, formData)
      .then(({ data }) => {
        Swal.fire({
          icon: 'success',
          text: data.message,
        });
        window.location.reload(false); //odświeżenie strony.
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
    <div className="container">
      <div className="topic">
        <div className="topicDetailsContainer">
          <div className="topicDetails">
            <p>
              Nazwa użytkownika:
              <Link to={`/profile/${topic.id_user}`}>{topic.name_user}</Link>
            </p>
            <p>Nazwa tematu: {topic.name}</p>
            <p>Data utworzenia: {topic.created_at}</p>
          </div>
          {auth.isAdmin == 1 ? (
            <>
              {topic.is_open == 1 ? (
                <Button
                  variant="primary"
                  className="closeButton"
                  onClick={closeTopic}
                >
                  Zamknij
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="closeButton"
                  onClick={openTopic}
                >
                  Otwórz
                </Button>
              )}
            </>
          ) : null}
        </div>
        <div className="content">
          {topic.content &&
            typeof topic.content === 'string' &&
            parse(topic.content)}
        </div>
        <div className="author">
          {/* <p>
            Założyciel postu:{' '}
            <Link to={`/profile/${topic.user_id}`}>{topic.name_user}</Link>
          </p> */}
        </div>
      </div>
      <div className="answers">
        {posts ? (
          <ul>
            {posts.map((post) => (
              <div key={post.id_subdepartment} className="post card">
                <div className="cardHeader">
                  <p>
                    <Link to={`/profile/${post.id_user}`}>
                      {post.name_user}
                    </Link>
                  </p>
                </div>
                <div className="cardBody">
                  <figure className="cardFigure">
                    <div className="cardContent">{parse(post.content)}</div>
                  </figure>
                </div>
                <div className="date">
                  <p>Data utworzenia: {post.created_at}</p>
                </div>
              </div>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="newPost">
        {topic.is_open === 1 ? (
          auth ? (
            <Form onSubmit={newPost}>
              <b>Napisz odpowiedź</b>
              <Editor onChange={(data) => setEditorData(data)} />
              <Button variant="primary" className="submitButton" type="submit">
                Dodaj
              </Button>
            </Form>
          ) : (
            <div className="notLoggedIn">
              Aby móc dodawać posty musisz się{' '}
              <Link to={`http://localhost:3000/login`}>zalogować</Link>.
            </div>
          )
        ) : (
          <div style={{ color: 'red', fontWeight: 'bold' }}>
            Temat zamknięty przez administratora
          </div>
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="nastepny >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPageCount}
        previousLabel="< poprzedni"
        renderOnZeroPageCount={null}
        activeClassName="selected" // dodanie klasy dla aktywnego elementu
        containerClassName="pagination" // dodanie klasy dla całej paginacji
      />
    </div>
  );
}
