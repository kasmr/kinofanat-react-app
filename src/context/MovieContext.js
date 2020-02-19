import React, { useState, createContext, useEffect } from 'react';

export const MovieContext = createContext();

export const MovieProvider = props => {
  //MoviesState
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/now_playing?api_key=35f31bc5ec65018dd8090674c49fe3d2'
    );
    const data = await response.json();
    setMovies(data.results);
  };

  useEffect(() => {
    getMovies();
  }, []);

  //MovieDetailState

  const [movie, setMovie] = useState([]);

  //SearchState

  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        getMovies,
        movie,
        setMovie,
        search,
        setSearch,
        query,
        setQuery
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};
