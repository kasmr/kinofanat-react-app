import React, { useState, createContext } from 'react';

export const MovieContext = createContext();

export const MovieProvider = props => {
  const [movies, setMovies] = useState({
    results: [],
    selected: {}
  });

  const getMovies = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/550?api_key=35f31bc5ec65018dd8090674c49fe3d2'
    );
    const data = await response.json();
    setMovies(data);

    console.log(data);
  };

  // const [search, setSearch] = useState('');
  // const [query, setQuery] = useState('');

  return (
    <MovieContext.Provider value={{ movies, setMovies, getMovies }}>
      {props.children}
    </MovieContext.Provider>
  );
};
