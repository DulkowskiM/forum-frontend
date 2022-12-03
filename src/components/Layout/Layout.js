import React from 'react';

export default function Layout(props) {
  return (
    <div className="">
      <div className="">{props.menu}</div>
      <div className="mb-5 container">{props.content}</div>
      <div>{props.footer}</div>
    </div>
  );
}
