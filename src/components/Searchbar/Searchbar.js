import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export default function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleChange = event => {
    const { value } = event.currentTarget;
    setImageName(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (imageName.trim() === '') {
      toast.error('empty search field');
      return;
    }
    onSubmit(imageName);
    reset();
  };

  const reset = () => {
    setImageName('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm">
        <button
          type="submit"
          className="SearchForm-button"
          onClick={handleSubmit}
        >
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          name="imageName"
          onChange={handleChange}
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
