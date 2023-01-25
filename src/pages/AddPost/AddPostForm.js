import React from 'react';
import Input from '../../components/UI/form/Input';
const AddPostForm = (props) => {
  return (
    <form className="row" onSubmit={props.onSubmit}>
      <div className="col-12 col-xl-3">
        <Input
          label="Nazwa postu"
          type="text"
          value={props.postName.value}
          onChange={(value) => props.onChange(value, 'postName')}
          error={props.postName.error}
          showError={props.postName.showError}
        />
      </div>
    </form>
  );
};

export default AddPostForm;
