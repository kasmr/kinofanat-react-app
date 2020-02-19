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

  //MovieDetailState

  const [movie, setMovie] = useState({});

  //GenreState

  const [genre, setGenre] = useState([]);

  const getGenre = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=35f31bc5ec65018dd8090674c49fe3d2&language=en-US'
    );
    const data = await response.json();
    setGenre(prevState => [...prevState, data.genres]);
    // console.log(genre);
  };

  // const [search, setSearch] = useState('');
  // const [query, setQuery] = useState('');

  return (
    <MovieContext.Provider
      value={{ movies, setMovies, getMovies, getGenre, genre, movie, setMovie }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};
