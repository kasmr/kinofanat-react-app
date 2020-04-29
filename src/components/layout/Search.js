import React, { useState, useContext } from 'react';
import { MovieContext } from '../context/MovieContext';

const Search = () => {
  const { setQuery, lang, changeLang } = useContext(MovieContext);

  const [searchQuery, setSearchQuery] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    setQuery(searchQuery);
    setSearchQuery('');
  };

  const onChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (lang === 'en-US') {
    return (
      <form className='form-inline justify-content-center' onSubmit={onSubmit}>
        <button
          className='btn btn-outline-primary active mr-lg-2'
          type='button'
          onClick={changeLang}
        >
          RU
        </button>
        <input
          className='form-control mr-sm-2 w-50'
          type='text'
          value={searchQuery}
          placeholder='Search for the movie...'
          onChange={onChange}
          required
        />
        <button className='btn btn-outline-light my-2' type='submit'>
          <i className='fas fa-search'></i>
        </button>
      </form>
    );
  } else {
    return (
      <form className='form-inline justify-content-center' onSubmit={onSubmit}>
        <button
          className='btn btn-outline-primary active mr-lg-2'
          type='button'
          onClick={changeLang}
        >
          EN
        </button>
        <input
          className='form-control mr-sm-2 w-50'
          type='text'
          value={searchQuery}
          placeholder='Поиск по фильмам...'
          onChange={onChange}
          required
        />
        <button className='btn btn-outline-light my-2' type='submit'>
          <i className='fas fa-search'></i>
        </button>
      </form>
    );
  }
};

export default Search;
