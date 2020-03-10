import React, { useContext, useEffect } from 'react';
import { MovieContext } from '../context/MovieContext';

const Search = () => {
  const {
    search,
    setSearch,
    setMovies,
    setAlert,
    lang,
    changeLang
  } = useContext(MovieContext);

  const searchMovies = async e => {
    e.preventDefault();
    if (search.query === '') {
      setAlert(
        lang === 'en-US'
          ? 'Please enter something...'
          : 'Пожалуйста, введите что-нибудь...'
      );
      setTimeout(() => {
        setAlert('');
      }, 5000);
    } else {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=35f31bc5ec65018dd8090674c49fe3d2&language=${lang}&query=${search.query}&include_adult=false`
      );
      const data = await response.json();
      setMovies(data.results);
      if (data.results.length === 0) {
        setAlert(
          lang === 'en-US'
            ? 'There is no any results of what you are looking for... please check your spelling...'
            : 'По данному запросу нет результатов... Пожалуйста, проверьте правописание...'
        );
        setTimeout(() => {
          setAlert('');
        }, 5000);
      }
      setSearch({ query: '', redirect: true, active: true });
      setTimeout(() => {
        setSearch({ redirect: false, active: true });
      }, 100);
    }
  };

  const updateSearch = e => {
    setSearch({ query: e.target.value });
  };

  // if (search.redirect === true) {
  //   return <Redirect to='/' />;
  // }

  return (
    <form
      className='form-inline justify-content-center w-75'
      onSubmit={searchMovies}
    >
      <button
        className='btn btn-outline-primary active mr-2'
        type='button'
        onClick={changeLang}
      >
        {lang !== 'en-US' ? 'EN' : 'RU'}
      </button>
      <input
        className='form-control mr-sm-2 w-50'
        type='text'
        value={search.query}
        placeholder={
          lang === 'en-US'
            ? 'Search for the movie, person, tv show...'
            : 'Фильмы, Персоны, ТВ-шоу...'
        }
        onChange={updateSearch}
      />
      <button className='btn btn-outline-light my-2' type='submit'>
        {lang === 'en-US' ? 'Search' : 'Поиск'}
      </button>
    </form>
  );
};

export default Search;
