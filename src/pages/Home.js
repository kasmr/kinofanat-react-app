import React, { useEffect, useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { movies, getMovies, getGenre, genre } = useContext(MovieContext);
  console.log(genre);

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    getGenre();
  }, []);

  return (
    <div>
      <h1>Movies Today</h1>
      {movies.map(movie => (
        <div key={movie.id}>
          <Link to={`/movie/${movie.id}`}>
            <h1>{movie.title}</h1>
          </Link>
          {movie.title === movie.original_title ? null : (
            <h4>{movie.original_title}</h4>
          )}
          <h4>Average rating: {movie.vote_average}</h4>
          <h4>
            Genre
            {movie.genre_ids.map(id => (
              <p key={id}>{id}</p>
              // <p>{genre.id === id ? genre.name : null}</p>
            ))}
          </h4>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <p>
            Plot <br />
            {movie.overview}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Home;
