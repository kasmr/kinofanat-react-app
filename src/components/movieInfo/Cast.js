import React, { useContext, useEffect } from 'react';
import { MovieContext } from '../context/MovieContext';
import { Redirect, Link } from 'react-router-dom';

const Cast = match => {
  const { cast, setCast, crew, setCrew, search } = useContext(MovieContext);

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
      <h1 className='text-center mt-3'>Cast of the film:</h1>
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
              <p className='second-text'>Character: {person.character}</p>
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
            <p className='second-text'>Job: {person.job}</p>
            <p className='second-text'>Department: {person.department}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cast;
