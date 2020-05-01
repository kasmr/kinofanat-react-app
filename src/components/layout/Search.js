import React, { useState, useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import { withRouter } from 'react-router-dom';
import '../../index.scss';

const Search = ({ history, location: { pathname } }) => {
  const { setQuery, lang, changeLang, searchMovies } = useContext(MovieContext);

  const [searchQuery, setSearchQuery] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    setQuery(searchQuery);
    searchMovies(searchQuery);
    setSearchQuery('');
    history.push('/search');
  };

  const onChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (pathname === '/search') {
    if (lang === 'en-US') {
      return (
        <form
          className='form-inline justify-content-center'
          onSubmit={onSubmit}
        >
          <input
            className='form-control mr-sm-2 w-65 '
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
        <form
          className='form-inline justify-content-center'
          onSubmit={onSubmit}
        >
          <input
            className='form-control mr-sm-2 w-65'
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
  } else {
    if (lang === 'en-US') {
      return (
        <form
          className='form-inline justify-content-center'
          onSubmit={onSubmit}
        >
          <button
            className='btn btn-outline-primary active mr-lg-2'
            type='button'
            onClick={changeLang}
          >
            RU
          </button>
          <input
            className='form-control mr-sm-2 w-65'
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
        <form
          className='form-inline justify-content-center'
          onSubmit={onSubmit}
        >
          <button
            className='btn btn-outline-primary active mr-lg-2'
            type='button'
            onClick={changeLang}
          >
            EN
          </button>
          <input
            className='form-control mr-sm-2 w-65 '
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
  }
};

export default withRouter(Search);
