import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';

export function Searchbar({ onSubmit }) {
  const [filter, setFilter] = useState('');

  const handleFilterChange = event => {
    event.preventDefault();
    setFilter(event.currentTarget.value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (filter.trim() === '') {
      return toast.info('Type something for search');
    }

    onSubmit(filter);
    setFilter('');
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchForm_button}>
          <ImSearch size={20} />
          <span className={styles.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={styles.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={filter}
          onChange={handleFilterChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
