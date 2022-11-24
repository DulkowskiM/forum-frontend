import React from 'react';
import styles from './Department.module.css';
import DepartmentRow from './DepartmentRow/DepartmentRow';

export default function Department(props) {
  return (
    <div className={`row ${styles.main} mt-3`}>
      <div className='card p-0'>
        <div className={`col-12 ps-4 p-2 ${styles.name}`}> {props.name} </div>
        <div className='card-body p-0'>
          <table className='table table-striped'>
            <thead className='card-header'>
              <tr>
                <th className={`col-8 ps-4 ${styles.headers}`}> Forum</th>
                <th className={`col-1 text-center ${styles.headers}`}>Topic</th>
                <th className={`col-1 text-center ${styles.headers}`}>Posts</th>
                <th
                  className={`col-1 text-center ${styles.headers}`}
                  style={{ border: 'none' }}
                >
                  Last Post
                </th>
              </tr>
            </thead>
            <tbody>
              {props.forums.map((forum, index) => (
                <DepartmentRow key={index} {...forum} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
