import React from 'react';
import { NavLink } from 'react-router-dom';

export default function MenuLink(props) {
  const activeLinkClass = 'active';

  const activeStyles = {
    borderBottom: `1px solid ${props.color}`,
    paddingBottom: '5px',
  };

  const iconStyles = {
    backgroundColor: `${props.color}4d`,
    borderRadius: '45px',
    width: '35px',
    height: '35px',
    padding: '5px 5px',
  };

  return (
    <NavLink
      id='navbarNavAltMarkup'
      end
      to={props.to}
      style={({ isActive }) => (isActive ? activeStyles : undefined)}
      className={({ isActive }) =>
        isActive ? `nav-link  ${activeLinkClass}` : 'nav-link'
      }
    >
      <div className='d-flex justify-content-center align-items-center'>
        {React.cloneElement(props.children, { style: iconStyles })}
        <span className='text-center ms-1'> {props.label} </span>
      </div>
    </NavLink>
  );
}
