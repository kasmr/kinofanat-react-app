import React, { useContext } from 'react';
import axios from 'axios';
import { MovieContext } from '../../context/MovieContext';

const Search = () => {
  const { moviesState, setMoviesState } = useContext(MovieContext);

  const handleInput = e => {
    let searchQuery = e.target.value;

    setMoviesState({ ...moviesState, searchQuery: searchQuery });
    console.log(searchQuery);
  };

  //   const searchSubmit = e => {
  //     axios(apiurl + moviesState.SearchQuery);
  //   };

  return (
    <form
      className='form-inline justify-content-center w-75'
      //   onSubmit={searchSubmit}
    >
      <input
        className='form-control mr-sm-2 w-50'
        type='search'
        placeholder='Введите название фильма...'
        aria-label='Search'
        onChange={handleInput}
      />
      <button className='btn btn-outline-light my-2 my-sm-0' type='submit'>
        Поиск
      </button>
    </form>
  );
};

export default Search;
