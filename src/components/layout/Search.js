import React, { useContext, useEffect } from 'react';
import { MovieContext } from '../../context/MovieContext';

const Search = () => {
  // const { movies, setMovies, search, setSearch, query, setQuery } = useContext(
  //   MovieContext
  // );

  // // const apiurl = 'http://www.omdbapi.com/?apikey=b55e3028';

  // useEffect(() => {
  //   getMovies();
  // }, []);

  // const updateSearch = e => {
  //   setSearch(e.target.value);
  // };

  // const getSearch = async e => {
  //   e.preventDeafault();
  //   setQuery(search);
  //   setSearch('');
  // };

  return (
    <form
      className='form-inline justify-content-center w-75'
      // onSubmit={getSearch}
    >
      <input
        className='form-control mr-sm-2 w-50'
        type='text'
        // value={search}
        placeholder='Введите название фильма...'
        // onChange={updateSearch}
      />
      <button className='btn btn-outline-light my-2 my-sm-0' type='submit'>
        Поиск
      </button>
    </form>
  );
};

export default Search;
