import React, { useContext, useEffect } from 'react';
import { MovieContext } from '../context/MovieContext';
import { Link } from 'react-router-dom';
import '../../index.scss';

const Home = () => {
  const { movies, search, lang, getMovies } = useContext(MovieContext);

  useEffect(() => {
    getMovies();
    //eslint-disable-next-line
  }, [lang]);

  if (lang === 'en-US') {
    return (
      <div>
        {movies.length !== 0 ? (
          <div>
            {search.active !== true ? (
              <h1 className='home-heading'>Popular movies Today</h1>
            ) : (
              <h1 className='home-heading'>These are your search results</h1>
            )}
          </div>
        ) : null}
        <div className='home'>
          {movies.map((movie) => (
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
        {movies.length !== 0 ? (
          <div>
            {search.active !== true ? (
              <h1 className='home-heading'>Популярные фильмы сегодня</h1>
            ) : (
              <h1 className='home-heading'>Результаты поиска:</h1>
            )}
          </div>
        ) : null}
        <div className='home'>
          {movies.map((movie) => (
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

export default Home;
