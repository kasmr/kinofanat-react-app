import React, { useContext, useEffect } from 'react';
import { MovieContext } from '../context/MovieContext';
import { Redirect, Link } from 'react-router-dom';
import Loader from '../layout/Loader';

const Similar = (match) => {
  const { similarMovies, getSimilarMovies, search, lang, loading } = useContext(
    MovieContext
  );

  const movieId = match.match.params.id;

  useEffect(() => {
    getSimilarMovies(movieId);
    //eslint-disable-next-line
  }, [lang, movieId]);

  if (search.redirect === true) {
    return <Redirect to='/' />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='container-fluid similar'>
      <h1 className='text-center mt-3'>
        {lang === 'en-US' ? 'Similar movies:' : 'Похожие фильмы:'}
      </h1>
      <div className='row pb-5'>
        {similarMovies.length !== 0 ? (
          similarMovies.map((movie) => (
            <div className='col cast' key={movie.backdrop_path}>
              <Link to={`/movie/${movie.id}`}>
                {' '}
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt='#'
                  />
                ) : (
                  <img src='/images/no_poster.jpg' alt='#' />
                )}
              </Link>
              <p>{movie.title}</p>
              <p className='second-text'>{movie.release_date.substr(0, 4)}</p>
            </div>
          ))
        ) : (
          <h1
            className='text-center position-absolute no-reviews'
            style={{
              margin: 'auto',
              color: '#b10101',
              top: '50%',
              bottom: '0',
              left: '0',
              right: '0',
            }}
          >
            {lang === 'en-US'
              ? 'Unfortunately there are no any similar movies...'
              : 'К сожалению, похожих фильмов нет...'}
          </h1>
        )}
      </div>
    </div>
  );
};

export default Similar;
