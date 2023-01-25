import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function Editor(props) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data="<p>Wprowadź zawartość postu
      </p>"
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        console.log('Gotowe do użycia', editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        props.onChange(data);

        // console.log({ event, editor, data });
      }}
      onBlur={(event, editor) => {
        console.log('Blur.', editor);
      }}
      onFocus={(event, editor) => {
        console.log('Focus.', editor);
      }}
    />
  );
}
