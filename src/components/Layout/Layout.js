import React from 'react';

export default function Layout(props) {
  return (
    <div className='container'>
      <div className='mt-3'>{props.menu}</div>
      <div>{props.content}</div>
      <div>{props.footer}</div>
    </div>
  );
}
