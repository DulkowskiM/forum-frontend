import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../Main.module.css';
import ReactPaginate from 'react-paginate';
export default function Department() {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const tokenData = JSON.parse(localStorage.getItem('token-data'));
  const isAuthenticated = tokenData && tokenData.isAuthenticated;
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  let { id_dep, id_sub, id_cat } = useParams();
  useEffect(() => {
    fetchCategory();
  }, []);
  const fetchCategory = async (pageNumber) => {
    await axios
      .get(`http://localhost:8000/api/category/${id_cat}?page=${pageNumber}`)
      .then(({ data }) => {
        setCurrentPage(pageNumber);
        setCategory(data.category);
        setTotalPageCount(data.category.topics.last_page);
        console.log(data);
      });
  };
  const handlePageClick = (event) => {
    console.log(event.selected + 1);
    fetchCategory(event.selected + 1);
  };
  // console.log(category);
  return (
    <div className="homepage">
      <div className={`${styles.department}`}>{category.name}</div>
      {isAuthenticated && (
        <button
          className={`btn ${styles.newTopicBtn}`}
          onClick={() =>
            navigate(`/forum/${id_dep}/${id_sub}/${id_cat}/addPost`)
          }
        >
          Nowy temat
        </button>
      )}
      {category.topics ? (
        <ul>
          {category.topics.data.map((top) => (
            <div
              key={top.id_category}
              className={`${styles.subdepartments}`}
              onClick={() => navigate(`${top.id}`)}
            >
              {top.name}
            </div>
          ))}
        </ul>
      ) : null}

      <ReactPaginate
        breakLabel="..."
        nextLabel="następna >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPageCount}
        previousLabel="< poprzednia"
        renderOnZeroPageCount={null}
        activeClassName="selected" // dodanie klasy dla aktywnego elementu
        containerClassName="pagination" // dodanie klasy dla całej paginacji
      />
    </div>
  );
}
