import React, { useState } from 'react';
import Editor from '../../components/Editor/Editor';
import AddPostForm from './AddPostForm';
const AddPost = () => {
  const [form, setForm] = useState({
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
  <div className="card-header">Logowanie</div>;
  return (
    <div>
      <AddPostForm descPost={form.descPost} postName={form.postName} />
      <Editor />
    </div>
  );
};

export default AddPost;
