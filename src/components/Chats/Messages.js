import React from 'react';
import Message from './Message';
export default function Messages(props) {
  // console.log(props.messages);

  return (
    <div>
      {props.messages
        ? props.messages.map((message) => (
            <Message {...message} user={props.user} />
          ))
        : null}
    </div>
  );
}
