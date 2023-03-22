import React, { useState } from 'react';
import styles from './Sidebar.css';
import DepartmentList from '../../Departments/Department/Department_list';
import SubDepartmentList from '../../Departments/Department/SubDepartments/SubDepartment_list';
import Category_list from '../../Departments/Department/SubDepartments/Categories/Category_list';
import UserList from '../../Users/Users_list';

export default function Sidebar(props) {
  return (
    <div className={styles.admin}>
      <h1 className={styles.title}>Panel Administratora</h1>
      <div className="row">
        <div className="col-3">
          <ul>
            <div>
              <button
                className={'button'}
                onClick={() => props.setContent(<DepartmentList />)}
              >
                Edycja działów
              </button>
            </div>
            <div>
              <button
                className={'button'}
                onClick={() => props.setContent(<SubDepartmentList />)}
              >
                Edycja pod działu
              </button>
            </div>
            <div>
              <button
                className={'button'}
                onClick={() => props.setContent(<Category_list />)}
              >
                Edycja kategorii
              </button>
            </div>
            <button
              className={'button'}
              onClick={() => props.setContent(<UserList />)}
            >
              Edycja użytkowników
            </button>
          </ul>
        </div>
        {/* <div className="col-9">{content()}</div> */}
      </div>
    </div>
  );
}
