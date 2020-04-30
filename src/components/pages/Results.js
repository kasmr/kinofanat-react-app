import React, { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import { Link } from 'react-router-dom';
import '../../index.scss';
import Loader from '../layout/Loader';

const Results = () => {
  const { results, lang, loading } = useContext(MovieContext);

  if (loading) {
    return <Loader />;
  }

  if (results.length === 0) {
    return (
      <div className='d-flex justify-content-center flex-column align-items-center vh-90 '>
        <h1>{lang === 'ru-RU' ? 'Ничего не найдено' : 'No movie was found'}</h1>
        <img src='images/no_results.png' alt='no_results' className='w-25' />
      </div>
    );
  }

  if (lang === 'en-US') {
    return (
      <div>
        <div>
          <h1 className='home-heading'>These are your search results</h1>
        </div>
        <div className='home'>
          {results &&
            results.map((movie) => (
              <div className='movie-card' key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  {movie.poster_path !== null ? (
                    <img
                      alt='poster'
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    />
                  ) : (
                    <img alt='poster' src='/images/no_poster.jpg' />
                  )}
                </Link>
                <div>
                  <div className='movie-info'>
                    <Link to={`/movie/${movie.id}`}>
                      <h3>{movie.title}</h3>
                    </Link>

                    <h4>
                      {movie.release_date}{' '}
                      <i className='far fa-calendar-alt text-primary' />
                    </h4>
                    <h4>
                      Average rating :{' '}
                      <span
                        className={
                          movie.vote_average > 7.0
                            ? 'text-success'
                            : 'text-warning'
                        }
                      >
                        {movie.vote_average}
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <h1 className='home-heading'>Результаты поиска:</h1>
        </div>
        <div className='home'>
          {results &&
            results.map((movie) => (
              <div className='movie-card' key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  {movie.poster_path !== null ? (
                    <img
                      alt='poster'
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    />
                  ) : (
                    <img alt='poster' src='/images/no_poster.jpg' />
                  )}
                </Link>
                <div>
                  <div className='movie-info'>
                    <Link to={`/movie/${movie.id}`}>
                      <h3>{movie.title}</h3>
                    </Link>

                    <h4>
                      {movie.release_date}{' '}
                      <i className='far fa-calendar-alt text-primary' />
                    </h4>
                    <h4>
                      Средний рейтинг :{' '}
                      <span
                        className={
                          movie.vote_average > 7.0
                            ? 'text-success'
                            : 'text-warning'
                        }
                      >
                        {movie.vote_average}
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
};

export default Results;
