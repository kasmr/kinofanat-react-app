import React, { useEffect, useContext } from 'react';
import { MovieContext } from '../context/MovieContext';

const Home = () => {
  const { movies, getMovies } = useContext(MovieContext);

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <h1>Movies Today</h1>
      <h1>{movies.title}</h1>
      <h1>{movies.budget}</h1>
      <h1>{movies.vote_average}</h1>
      <img src={`https://image.tmdb.org/t/p/w400/${movies.poster_path}`} />
    </div>
  );
};

export default Home;
