import React, { useContext, useEffect } from 'react';
import { MovieContext } from '../context/MovieContext';
import { Link, Redirect } from 'react-router-dom';
import '../../movieDetails.scss';

const MovieDetail = match => {
  const movieId = match.match.params.id;

  const { movie, setMovie, trailers, setTrailers, search, lang } = useContext(
    MovieContext
  );

  useEffect(() => {
    getMovie();
    getTrailer();
    return () => {
      setTrailers([]);
    };
  }, [lang]);

  const getMovie = async () => {
    const getMovie = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=35f31bc5ec65018dd8090674c49fe3d2&language=${lang}`
    );

    const movie = await getMovie.json();
    setMovie(movie);
  };

  const getTrailer = async () => {
    const getTrailer = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=35f31bc5ec65018dd8090674c49fe3d2&language=${lang}`
    );

    const data = await getTrailer.json();
    data.results.filter(result =>
      result.type === 'Trailer' ? setTrailers(result) : null
    );
  };

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
    backdrop_path
  } = movie;

  if (search.redirect === true) {
    return <Redirect to='/' />;
  }

  return (
    <div
      className='background-image'
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'top center bottom',
        minHeight: '92.8vh'
      }}
    >
      <div className='movieDetails d-flex'>
        <div>
          {poster_path !== null ? (
            <img
              className='poster'
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt='#'
            />
          ) : (
            <img
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
          <h4>{lang === 'en-US' ? 'Countries' : 'Страна производства'}</h4>
          <ul>
            {production_countries &&
              production_countries.map(country => (
                <li key={country.iso_3166_1} className='second-text'>
                  {country.name}
                </li>
              ))}
          </ul>
          <h4>{lang === 'en-US' ? 'Genres' : 'Жанры'}</h4>
          <ul>
            {genres &&
              genres.map(genre => (
                <li key={genre.id} className='second-text'>
                  {genre.name}
                </li>
              ))}
          </ul>
          {production_companies && (
            <h4>
              {lang === 'en-US' ? 'Production companies' : 'Компания издатель'}
            </h4>
          )}
          <ul className='companies'>
            {production_companies &&
              production_companies
                .filter(company => company.logo_path !== null)
                .map(company => (
                  <li className='prod-company' key={company.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt='#'
                    />
                  </li>
                ))}
          </ul>
          <h4>
            {lang === 'en-US' ? 'Duration:' : 'Продолжительность:'}{' '}
            <span className='second-text'>{runtime}</span>
          </h4>
          <h4>
            {lang === 'en-US' ? 'Release date: ' : 'Дата релиза: '}{' '}
            <span className='second-text'>{release_date}</span>
          </h4>
          {movie.homepage ? (
            <h4>
              {lang === 'en-US'
                ? 'Homepage of the movie: '
                : 'Веб-сайт фильма: '}
              {''}
              <a href={homepage} target='_blank' rel='noopener noreferrer'>
                {homepage}
              </a>
            </h4>
          ) : null}

          <h4>
            {lang === 'en-US' ? 'Average rating: ' : 'Средний рейтинг : '}
            <span
              className={vote_average > 7.0 ? 'text-success' : 'text-warning'}
            >
              {vote_average}
            </span>{' '}
            {lang === 'en-US' ? 'votes: ' : 'голосов : '}{' '}
            <span className='second-text'>{vote_count}</span>
          </h4>
          <h4>{lang === 'en-US' ? 'Plot: ' : 'Сюжет : '}</h4>
          <p className='overview second-text'>{overview}</p>
          <div className='links-group'>
            <Link to={`${id}/screenshots`}>
              <button type='button' className='btn btn-lg btn-outline-primary'>
                <i className='fas fa-images'></i>
                {lang === 'en-US' ? 'Screenshots' : 'Скриншоты'}
              </button>
            </Link>
            <Link to={`${id}/cast`}>
              <button type='button' className='btn btn-lg btn-outline-success'>
                <i className='fas fa-users'></i>
                {lang === 'en-US' ? 'Cast of the movie' : 'Cъемочная группа'}
              </button>
            </Link>
            <Link to={`${id}/reviews`}>
              <button
                type='button'
                className='btn btn-lg btn-outline-warning review-btn'
              >
                <i className='fas fa-comment-alt'></i>
                {lang === 'en-US' ? 'Reviews' : 'Рецензии'}
              </button>
            </Link>
            <Link to={`${id}/similar`}>
              <button
                type='button'
                className='btn btn-lg btn-outline-danger review-btn'
              >
                <i className='fas fa-film'></i>
                {lang === 'en-US' ? 'Similar movies' : 'Рекомендации'}
              </button>
            </Link>
          </div>
          {trailers.key !== undefined ? (
            <div>
              <h4 className='mb-3'>
                {lang === 'en-US' ? 'Trailer: ' : 'Трейлер: '}
              </h4>
              <iframe
                key={trailers.id}
                width='560'
                height='315'
                src={`https://www.youtube.com/embed/${trailers.key}`}
                allow='accelerometer; autoplay; encrypted-media; 
                gyroscope; picture-in-picture; fullscreen'
                title='trailer'
              ></iframe>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
