import React, { useContext, useEffect } from 'react';
import { MovieContext } from '../context/MovieContext';
import { Redirect, Link } from 'react-router-dom';

const Similar = match => {
  const { similar, setSimilar, search, lang } = useContext(MovieContext);

  useEffect(() => {
    getSimilar();
  }, [lang]);

  const getSimilar = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${match.match.params.id}/similar?api_key=35f31bc5ec65018dd8090674c49fe3d2&language=${lang}`
    );
    const data = await response.json();
    setSimilar(data.results);
    console.log(data.results);
  };

  if (search.redirect === true) {
    return <Redirect to='/' />;
  }

  return (
    <div className='container-fluid similar'>
      <h1 className='text-center mt-3'>
        {lang === 'en-US' ? 'Similar movies:' : 'Похожие фильмы:'}
      </h1>
      <div className='row pb-5'>
        {similar.length !== 0 ? (
          similar.map(movie => (
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
          <h4 className='w-100 text-center my-5'>
            {lang === 'en-US'
              ? 'Unfortunately There is no similar movies...'
              : 'К сожалению, похожих фильмов нет...'}
          </h4>
        )}
      </div>
    </div>
  );
};

export default Similar;
