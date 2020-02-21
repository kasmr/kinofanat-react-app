import React, { useContext, useEffect } from 'react';
import { MovieContext } from '../context/MovieContext';
import '../movieDetails.scss';

const MovieDetail = match => {
  const { movie, setMovie, trailers, setTrailers } = useContext(MovieContext);

  useEffect(() => {
    getMovie();
    getTrailer();
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

  const {
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
        backgroundImage: `url(https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.backdrop_path})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'left'
      }}
    >
      <div className='movieDetails'>
        {poster_path && (
          <img
            className='poster'
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          />
        )}
        <div className='content'>
          <h1>{title}</h1>
          {title === original_title ? null : <h4>{original_title}</h4>}
          <p>{tagline}</p>
          <ul>
            {production_countries &&
              production_countries.map(country => (
                <li key={country.iso_3166_1}>{country.name}</li>
              ))}
          </ul>
          <ul>
            {genres &&
              genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
          </ul>
          <ul>
            {production_companies ? <h4>Production companies:</h4> : null}
            {production_companies &&
              production_companies.map(company => (
                <div style={{ backgroundColor: '#fff' }} key={company.id}>
                  {company.logo_path === null ? null : (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                    />
                  )}
                </div>
              ))}
          </ul>
          <h4>Duration: {runtime} min</h4>
          <h4>Release date {release_date}</h4>
          {movie.homepage ? (
            <h4>
              Homepage of the movie <a href={homepage}>{homepage}</a>
            </h4>
          ) : null}
          <h4>
            Average rating: {vote_average} votes: {vote_count}
          </h4>
          <p>{overview}</p>
          <div>
            <h3>Trailer</h3>
            <iframe
              key={trailers.id}
              width='560'
              height='315'
              src={`https://www.youtube.com/embed/${trailers.key}`}
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen'
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
