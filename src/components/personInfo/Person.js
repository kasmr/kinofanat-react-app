import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import '../../personDetails.scss';

const Person = match => {
  const { search, person, setPerson } = useContext(MovieContext);

  useEffect(() => {
    getPerson();
  }, []);

  const getPerson = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${match.match.params.id}?api_key=35f31bc5ec65018dd8090674c49fe3d2`
    );
    const data = await response.json();
    setPerson(data);
    console.log(data);
  };

  const {
    profile_path,
    name,
    birthday,
    deathday,
    place_of_birth,
    biography,
    homepage,
    also_known_as
  } = person;

  if (search.redirect === true) {
    return <Redirect to='/' />;
  }

  return (
    <div className='personDetails'>
      {profile_path !== null ? (
        <img src={`https://image.tmdb.org/t/p/w400${profile_path}`} alt='#' />
      ) : (
        <img alt='poster' src='/images/no_image.jpg' />
      )}
      <div className='content'>
        <h1 style={{ marginBottom: '0.3rem' }}>{name}</h1>
        {also_known_as && <h4 className='second-text'>{also_known_as[0]}</h4>}
        <h4>
          Date of birth:{' '}
          <span className='second-text'>
            {birthday
              ? { birthday }
              : 'Sorry, no information is available at this time'}
          </span>
        </h4>
        {deathday && (
          <h4>
            Date of death: <span className='second-text'>{deathday}</span>
          </h4>
        )}
        {place_of_birth && (
          <h4>
            Place of birth:{' '}
            <span className='second-text'>{place_of_birth}</span>
          </h4>
        )}
        {biography}
        {homepage && <h4>Homepage: {homepage}</h4>}
      </div>
    </div>
  );
};

export default Person;
