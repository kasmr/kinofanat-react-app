import React, { useContext, useEffect } from 'react';
import { MovieContext } from '../context/MovieContext';

const MovieDetail = match => {
  const { movie, setMovie } = useContext(MovieContext);

  useEffect(() => {
    getMovie();
  }, []);

  const getMovie = async () => {
    const getMovie = await fetch(
      `https://api.themoviedb.org/3/movie/${match.match.params.id}?api_key=35f31bc5ec65018dd8090674c49fe3d2`
    );

    const movie = await getMovie.json();
    setMovie(movie);
    console.log(movie);
  };

  // const style = {
  //   backgroundImage: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
  //   backgroundRepeat: ' no-repeat',
  //   backgroundPosition: 'center',
  //   backgroundSize: 'cover',
  //   height: '100vh',
  //   width: '100vw'
  // };

  return (
    <div>
      <h1>{movie.title}</h1>
      {movie.title === movie.original_title ? null : (
        <h4>{movie.original_title}</h4>
      )}
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
      <h4>Duration: {movie.runtime} min</h4>
      <h4>Release date {movie.release_date}</h4>
      {movie.homepage ? (
        <h4>
          Homepage of the movie <a href={movie.homepage}>{movie.homepage}</a>
        </h4>
      ) : null}
      <h4>
        Average rating: {movie.vote_average} votes: {movie.vote_count}
      </h4>
      <p>{movie.overview}</p>

      {/* <h3>Budget: {movie.budget} $</h3> */}
    </div>
  );
};

export default MovieDetail;
