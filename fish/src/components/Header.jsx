import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ name, setShowModal }) {
  return (
    <header>
      <Link to='/'>
        <h1>Fish!</h1>
      </Link>
      <Link to='/create'>
        <p>Add a Fish!</p>
      </Link>
      {name ? (
        <p>Hello {name}</p>
      ) : (
        <button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Log in
        </button>
      )}
    </header>
  );
}
