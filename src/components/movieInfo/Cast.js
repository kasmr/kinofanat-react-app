import React, { useContext, useEffect } from 'react';
import { MovieContext } from '../context/MovieContext';
import { Redirect, Link } from 'react-router-dom';
import Loader from '../layout/Loader';

const Cast = (match) => {
  const { cast, getMovieCast, crew, redirect, lang, loading } = useContext(
    MovieContext
  );

  const movieId = match.match.params.id;

  useEffect(() => {
    getMovieCast(movieId);
    //eslint-disable-next-line
  }, [movieId]);

  if (redirect) {
    return <Redirect to='/search' />;
  }

  if (loading) {
    return <Loader />;
  }

  if (lang === 'en-US') {
    return (
      <div className='container-fluid' id='cast-container'>
        <h1 className='text-center mt-3'>Cast of the film:</h1>
        <div className='row pb-lg-5'>
          {cast.length ? (
            cast.map((person) => (
              <div className='col cast' key={person.cast_id}>
                <Link to={`/person/${person.id}`}>
                  {' '}
                  {person.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                      alt='#'
                    />
                  ) : (
                    <img src='/images/no_image.png' alt='#' />
                  )}
                </Link>
                <h4>{person.name}</h4>
                <p className='second-text'>Character : {person.character}</p>
              </div>
            ))
          ) : (
            <h4 className='second-text w-100 text-center my-5'>
              There is no any information about the cast...
            </h4>
          )}
        </div>
        <h1 className='text-center mt-3'>Crew of the film:</h1>
        <div className='row'>
          {crew.map((person) => (
            <div className='col cast' key={person.credit_id}>
              <Link to={`/person/${person.id}`}>
                {person.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                    alt='#'
                  />
                ) : (
                  <img src='/images/no_image.png' alt='#' />
                )}
              </Link>
              <h4>{person.name}</h4>
              <p className='second-text'>Job: {person.job}</p>
              <p className='second-text'>Department: {person.department}</p>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className='container-fluid' id='cast-container'>
        <h1 className='text-center mt-3'>Актерский состав:</h1>
        <div className='row pb-lg-5'>
          {cast.length ? (
            cast.map((person) => (
              <div className='col cast' key={person.cast_id}>
                <Link to={`/person/${person.id}`}>
                  {' '}
                  {person.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                      alt='#'
                    />
                  ) : (
                    <img src='/images/no_image.png' alt='#' />
                  )}
                </Link>
                <h4>{person.name}</h4>
                <p className='second-text'>{person.character}</p>
              </div>
            ))
          ) : (
            <h4 className='second-text w-100 text-center my-5'>
              К сожалению, нет информации о съемочной команде...
            </h4>
          )}
        </div>
        <h1 className='text-center mt-3'>Cъемочная группа:</h1>
        <div className='row'>
          {crew.map((person) => (
            <div className='col cast' key={person.credit_id}>
              <Link to={`/person/${person.id}`}>
                {person.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                    alt='#'
                  />
                ) : (
                  <img src='/images/no_image.png' alt='#' />
                )}
              </Link>
              <h4>{person.name}</h4>
              <p className='second-text'>{person.job}</p>
              <p className='second-text'>{person.department}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default Cast;
