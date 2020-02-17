import React, { useState, createContext, useEffect } from 'react';

export const MovieContext = createContext();

export const MovieProvider = props => {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/now_playing?api_key=35f31bc5ec65018dd8090674c49fe3d2'
    );
    const data = await response.json();
    setMovies(data.results);

    // console.log(data.results);
  };

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
      value={{ movies, setMovies, getMovies, getGenre, genre }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};
