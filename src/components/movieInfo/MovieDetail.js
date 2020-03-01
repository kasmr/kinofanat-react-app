import React, { useContext, useEffect } from 'react';
import { MovieContext } from '../../context/MovieContext';
import { Link } from 'react-router-dom';
import '../../movieDetails.scss';

const MovieDetail = match => {
  const { movie, setMovie, trailers, setTrailers } = useContext(MovieContext);

  useEffect(() => {
    getMovie();
    getTrailer();

    return () => {
      setTrailers([]);
    };
  }, []);

  const getMovie = async () => {
    const getMovie = await fetch(
      `https://api.themoviedb.org/3/movie/${match.match.params.id}?api_key=35f31bc5ec65018dd8090674c49fe3d2`
    );

    const movie = await getMovie.json();
    setMovie(movie);
    console.log(movie);
  };

  const getTrailer = async () => {
    const getTrailer = await fetch(
      `https://api.themoviedb.org/3/movie/${match.match.params.id}/videos?api_key=35f31bc5ec65018dd8090674c49fe3d2`
    );

    const data = await getTrailer.json();
    data.results.filter(result =>
      result.type === 'Trailer' ? setTrailers(result) : null
    );
  };

  console.log(trailers);

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
    tagline
  } = movie;

  return (
    <div
      className='background-image'
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'top center bottom'
      }}
    >
      <div className='movieDetails'>
        {poster_path && (
          <img
            className='poster'
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt='#'
          />
        )}
        <div className='content'>
          <h1 style={{ marginBottom: '0' }}>{title}</h1>
          {title === original_title ? null : <h4>{original_title}</h4>}
          <p className='second-text'>{tagline}</p>
          <h4>Countries</h4>
          <ul>
            {production_countries &&
              production_countries.map(country => (
                <li key={country.iso_3166_1} className='second-text'>
                  {country.name}
                </li>
              ))}
          </ul>
          <h4>Genres</h4>
          <ul>
            {genres &&
              genres.map(genre => (
                <li key={genre.id} className='second-text'>
                  {genre.name}
                </li>
              ))}
          </ul>
          {production_companies && <h4>Production companies:</h4>}
          <ul
            className='companies'
            style={{
              gridTemplateColumns: `repeat(${production_companies &&
                production_companies.length}, 1fr)`
            }}
          >
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
            Duration: <span className='second-text'>{runtime} min</span>
          </h4>
          <h4>
            Release date: <span className='second-text'>{release_date}</span>
          </h4>
          {movie.homepage ? (
            <h4>
              Homepage of the movie: {''}
              <a href={homepage} target='_blank' rel='noopener noreferrer'>
                {homepage}
              </a>
            </h4>
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
          <h4>Plot</h4>
          <p className='overview second-text'>{overview}</p>
          <div className='links-group'>
            <Link to={`${id}/screenshots`}>
              <button type='button' className='btn btn-lg btn-outline-primary'>
                <i className='fas fa-images'></i>
                Screenshots
              </button>
            </Link>
            <Link to={`${id}/cast`}>
              <button type='button' className='btn btn-lg btn-outline-success'>
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
          </div>
          {trailers.key !== undefined ? (
            <div>
              <h3>Trailer</h3>
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
