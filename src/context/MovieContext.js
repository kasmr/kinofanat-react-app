import React, { useState, createContext } from 'react';

export const MovieContext = createContext();

export const MovieProvider = props => {
  const apiurl = 'http://api.kinopoisk.cf/searchFilms?keyword=';

  const [moviesState, setMoviesState] = useState({
    searchQuery: '',
    results: [],
    selected: {}
  });

  return (
    <MovieContext.Provider value={{ moviesState, setMoviesState }}>
      {props.children}
    </MovieContext.Provider>
  );
};
