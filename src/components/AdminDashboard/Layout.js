import React, { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import DepartmentList from '../Departments/Department/Department_list';

export default function Layout() {
  const [componentName, setComponentName] = useState(<DepartmentList />);
  return (
    <div className="d-flex row">
      <div className="col-4">
        <Sidebar setContent={(component) => setComponentName(component)} />
      </div>
      <div className="col-8">{componentName}</div>
    </div>
  );
}
