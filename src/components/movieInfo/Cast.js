import React, { useContext, useEffect } from 'react';
import { MovieContext } from '../context/MovieContext';
import { Redirect, Link } from 'react-router-dom';

const Cast = match => {
  const { cast, setCast, crew, setCrew, search, lang } = useContext(
    MovieContext
  );

  useEffect(() => {
    getCast();
  }, []);

  const getCast = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${match.match.params.id}/credits?api_key=35f31bc5ec65018dd8090674c49fe3d2`
    );
    const data = await response.json();
    setCast(data.cast);
    setCrew(data.crew);
  };

  if (search.redirect === true) {
    return <Redirect to='/' />;
  }

  return (
    <div className='container-fluid'>
      <h1 className='text-center mt-3'>
        {lang === 'en-US' ? 'Cast of the film:' : 'Актерский состав:'}
      </h1>
      <div className='row pb-5'>
        {cast.length !== 0 ? (
          cast.map(person => (
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
              <p className='second-text'>
                {lang === 'en-US' ? 'Character:' : null} {person.character}
              </p>
            </div>
          ))
        ) : (
          <h4 className='second-text w-100 text-center my-5'>
            {lang === 'en-US'
              ? 'There is no any information about the cast...'
              : 'К сожалению, нет информации о съемочной команде...'}
          </h4>
        )}
      </div>
      <h1 className='text-center mt-3'>
        {lang === 'en-US' ? 'Crew of the film:' : 'Cъемочная группа:'}
      </h1>
      <div className='row'>
        {crew.map(person => (
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
            <p className='second-text'>
              {lang === 'en-US' ? 'Job:' : null} {person.job}
            </p>
            <p className='second-text'>
              {lang === 'en-US' ? 'Department:' : null} {person.department}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cast;
