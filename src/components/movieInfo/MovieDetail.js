import React, { useContext, useEffect } from 'react';
import { MovieContext } from '../context/MovieContext';
import { Link, Redirect } from 'react-router-dom';
import '../../movieDetails.scss';
import Loader from '../layout/Loader';

const MovieDetail = (match) => {
  const movieId = match.match.params.id;

  const {
    singleMovie,
    getMovieInfo,
    singleMovieTrailer,
    getMovieTrailer,
    cleanUpTrailer,
    search,
    lang,
    loading,
  } = useContext(MovieContext);

  useEffect(() => {
    getMovieInfo(movieId);
    getMovieTrailer(movieId);
    return () => {
      cleanUpTrailer();
    };
    //eslint-disable-next-line
  }, [lang, movieId]);

  const {
    id,
    title,
    genres,
    original_title,
    poster_path,
    release_date,
    runtime,
    homepage,
    vote_average,
    vote_count,
    overview,
    production_companies,
    production_countries,
    tagline,
    backdrop_path,
  } = singleMovie;

  if (search.redirect === true) {
    return <Redirect to='/' />;
  }

  if (loading) {
    return <Loader />;
  }

  if (lang === 'en-US') {
    return (
      <div
        className='background-image'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${
            backdrop_path && backdrop_path
          })`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'top center bottom',
          minHeight: '94.4vh',
        }}
      >
        <div className='movieDetails d-flex'>
          <div>
            {poster_path ? (
              <img
                className='poster'
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt='#'
              />
            ) : (
              <img
                className='poster'
                alt='poster'
                src='/images/no_poster.jpg'
                style={{ height: '100%' }}
              />
            )}
          </div>
          <div className='content'>
            <h1 style={{ marginBottom: '0' }}>{title}</h1>
            {title === original_title ? null : (
              <h1 className='second-text'>{original_title}</h1>
            )}
            <p className='second-text'>{tagline}</p>
            <h4>Countries</h4>
            <ul>
              {production_countries &&
                production_countries.map((country) => (
                  <li key={country.iso_3166_1} className='second-text'>
                    {country.name}
                  </li>
                ))}
            </ul>
            <h4>Genres</h4>
            <ul>
              {genres &&
                genres.map((genre) => (
                  <li key={genre.id} className='second-text'>
                    {genre.name}
                  </li>
                ))}
            </ul>
            {production_companies && <h4>Production companies</h4>}
            <ul className='companies'>
              {production_companies &&
                production_companies
                  .filter((company) => company.logo_path !== null)
                  .map((company) => (
                    <li className='prod-company' key={company.id}>
                      <img
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt='#'
                      />
                    </li>
                  ))}
            </ul>
            <h4>
              Duration: <span className='second-text'>{runtime}</span>
            </h4>
            <h4>
              Release date: <span className='second-text'>{release_date}</span>
            </h4>
            {singleMovie.homepage ? (
              <div className='homepage container-fluid'>
                <h4>Homepage of the movie:</h4>
                <a href={homepage} target='_blank' rel='noopener noreferrer'>
                  {homepage}
                </a>
              </div>
            ) : null}
            <h4>
              Average rating:{' '}
              <span
                className={vote_average > 7.0 ? 'text-success' : 'text-warning'}
              >
                {vote_average}
              </span>{' '}
              votes: <span className='second-text'>{vote_count}</span>
            </h4>
            <h4>Plot: </h4>
            <p className='overview second-text'>{overview}</p>
            <div className='links-group'>
              <Link to={`${id}/screenshots`}>
                <button
                  type='button'
                  className='btn btn-lg btn-outline-primary'
                >
                  <i className='fas fa-images'></i>
                  Screenshots
                </button>
              </Link>
              <Link to={`${id}/cast`}>
                <button
                  type='button'
                  className='btn btn-lg btn-outline-success'
                >
                  <i className='fas fa-users'></i>
                  Cast of the movie
                </button>
              </Link>
              <Link to={`${id}/reviews`}>
                <button
                  type='button'
                  className='btn btn-lg btn-outline-warning review-btn'
                >
                  <i className='fas fa-comment-alt'></i>
                  Reviews
                </button>
              </Link>
              <Link to={`${id}/similar`}>
                <button
                  type='button'
                  className='btn btn-lg btn-outline-danger review-btn'
                >
                  <i className='fas fa-film'></i>
                  Similar movies
                </button>
              </Link>
            </div>
            {singleMovieTrailer && (
              <div>
                <h4 className='mb-3'>Trailer:</h4>
                <iframe
                  key={singleMovieTrailer.id}
                  width='560'
                  height='315'
                  src={`https://www.youtube.com/embed/${singleMovieTrailer.key}`}
                  allow='accelerometer; autoplay; encrypted-media; 
                  gyroscope; picture-in-picture; fullscreen'
                  title='trailer'
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className='background-image'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'top center bottom',
          minHeight: '94.4vh',
        }}
      >
        <div className='movieDetails d-flex'>
          <div>
            {poster_path ? (
              <img
                className='poster'
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt='#'
              />
            ) : (
              <img
                className='poster'
                alt='poster'
                src='/images/no_poster.jpg'
                style={{ height: '100%' }}
              />
            )}
          </div>
          <div className='content'>
            <h1 style={{ marginBottom: '0' }}>{title}</h1>
            {title === original_title ? null : (
              <h1 className='second-text'>{original_title}</h1>
            )}
            <p className='second-text'>{tagline}</p>
            <h4>Страна производства</h4>
            <ul>
              {production_countries &&
                production_countries.map((country) => (
                  <li key={country.iso_3166_1} className='second-text'>
                    {country.name}
                  </li>
                ))}
            </ul>
            <h4>Жанры</h4>
            <ul>
              {genres &&
                genres.map((genre) => (
                  <li key={genre.id} className='second-text'>
                    {genre.name}
                  </li>
                ))}
            </ul>
            {production_companies && <h4>Компания издатель</h4>}
            <ul className='companies'>
              {production_companies &&
                production_companies
                  .filter((company) => company.logo_path !== null)
                  .map((company) => (
                    <li className='prod-company' key={company.id}>
                      <img
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt='#'
                      />
                    </li>
                  ))}
            </ul>
            <h4>
              Продолжительность: <span className='second-text'>{runtime}</span>
            </h4>
            <h4>
              Дата релиза: <span className='second-text'>{release_date}</span>
            </h4>
            {singleMovie.homepage ? (
              <div className='homepage container-fluid'>
                <h4>Веб-сайт фильма:</h4>
                <a href={homepage} target='_blank' rel='noopener noreferrer'>
                  {homepage}
                </a>
              </div>
            ) : null}
            <h4>
              Средний рейтинг :{' '}
              <span
                className={vote_average > 7.0 ? 'text-success' : 'text-warning'}
              >
                {vote_average}
              </span>{' '}
              голосов : <span className='second-text'>{vote_count}</span>
            </h4>
            <h4>Сюжет : </h4>
            <p className='overview second-text'>{overview}</p>
            <div className='links-group'>
              <Link to={`${id}/screenshots`}>
                <button
                  type='button'
                  className='btn btn-lg btn-outline-primary'
                >
                  <i className='fas fa-images'></i>
                  Скриншоты
                </button>
              </Link>
              <Link to={`${id}/cast`}>
                <button
                  type='button'
                  className='btn btn-lg btn-outline-success'
                >
                  <i className='fas fa-users'></i>
                  Cъемочная группа
                </button>
              </Link>
              <Link to={`${id}/reviews`}>
                <button
                  type='button'
                  className='btn btn-lg btn-outline-warning review-btn'
                >
                  <i className='fas fa-comment-alt'></i>
                  Рецензии
                </button>
              </Link>
              <Link to={`${id}/similar`}>
                <button
                  type='button'
                  className='btn btn-lg btn-outline-danger review-btn'
                >
                  <i className='fas fa-film'></i>
                  Рекомендации
                </button>
              </Link>
            </div>
            {singleMovieTrailer && (
              <div>
                <h4 className='mb-3'>Трейлер:</h4>
                <iframe
                  key={singleMovieTrailer.id}
                  width='560'
                  height='315'
                  src={`https://www.youtube.com/embed/${singleMovieTrailer.key}`}
                  allow='accelerometer; autoplay; encrypted-media; 
                  gyroscope; picture-in-picture; fullscreen'
                  title='trailer'
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default MovieDetail;
