import React, { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import { Link } from 'react-router-dom';
import '../index.scss';

const Home = () => {
  const { movies } = useContext(MovieContext);

  return (
    <div>
      <h1 className='home-heading'>Movies Today</h1>
      <div className='home'>
        {movies.map(movie => (
          <div className='movie-card' key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img
                alt='poster'
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
            </Link>
            <div>
              <div className='movie-info'>
                <Link to={`/movie/${movie.id}`}>
                  <h3>{movie.title}</h3>
                </Link>

                <h4>
                  Release Date: {movie.release_date}{' '}
                  <i className='far fa-calendar-alt' />
                </h4>
                <h4>
                  Average rating:{' '}
                  <span
                    className={
                      movie.vote_average > 7.0 ? 'text-success' : 'text-warning'
                    }
                  >
                    {movie.vote_average}
                  </span>
                </h4>
                {movie.overview.length > 200 ? (
                  <p>{movie.overview.slice(0, 200) + '...'}</p>
                ) : (
                  <p>{movie.overview}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
