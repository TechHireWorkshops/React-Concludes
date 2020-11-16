import React from 'react';

export default function NameModal(props) {
  return (
    <div className='modal'>
      <p
        onClick={() => {
          props.setShowModal(false);
        }}
        className='close-modal'
      >
        X
      </p>
      <input
        placeholder='Enter name here'
        type='text'
        onChange={props.handleChangeName}
      />
    </div>
  );
}
