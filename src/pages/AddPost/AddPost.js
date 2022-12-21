import React, { useState } from 'react';
import Editor from '../../components/Editor/Editor';
import AddPostForm from './AddPostForm';
const AddPost = () => {
  const [form] = useState({
    postName: {
      value: '',
      error: '',
      showError: false,
      rules: ['requierd', { rule: 'nick' }],
    },
    descPost: {
      value: '',
      error: '',
      showError: false,
      rules: ['requierd', { rule: 'email' }],
    },
  });
  return (
    <div>
      <div className="card-header">Logowanie</div>;
      <div>
        <AddPostForm descPost={form.descPost} postName={form.postName} />
        <Editor />
      </div>
    </div>
  );
};

export default AddPost;
