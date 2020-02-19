import React, { useContext, useEffect } from 'react';
import { MovieContext } from '../../context/MovieContext';

const Search = () => {
  const { search, setSearch, setQuery, query, setMovies } = useContext(
    MovieContext
  );

  const searchMovies = async e => {
    e.preventDeafault();
    setQuery(search);
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=35f31bc5ec65018dd8090674c49fe3d2&language=en-US&query=${query}&include_adult=false`
    );
    const data = await response.json();
    setMovies(data);
    console.log(data);
    setSearch('');
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  return (
    <form
      className='form-inline justify-content-center w-75'
      onSubmit={searchMovies}
    >
      <input
        className='form-control mr-sm-2 w-50'
        type='text'
        value={search}
        placeholder='Search for the movie, person, tv show...'
        onChange={updateSearch}
      />
      <button className='btn btn-outline-light my-2 my-sm-0' type='submit'>
        Search
      </button>
    </form>
  );
};

export default Search;
