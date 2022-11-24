import React from 'react';
import styles from './DepartmentRow.module.css';

export default function DepartmentRow(props) {
  return (
    <tr>
      <td className={`col-8 ps-4 pt-3 ${styles.headers}`}>
        <h5 className='card-title'>{props.title}</h5>
        <p className='card-text'>{props.summary}</p>
      </td>
      <td className={`col-1 text-center ${styles.headers}`}>30</td>
      <td className={`col-1 text-center ${styles.headers}`}>50</td>
      <td
        className={`col-2 text-center ${styles.headers}`}
        style={{ border: 'none' }}
      >
        <div> Post name</div>
        <div> Author name</div>
        <div> 06/07/2021</div>
        <div> 20:04</div>
      </td>
    </tr>
  );
}
