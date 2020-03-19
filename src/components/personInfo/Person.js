import React, { useEffect, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import '../../personDetails.scss';

const Person = match => {
  const {
    search,
    person,
    setPerson,
    personMovies,
    setPersonMovies,
    personCrew,
    setPersonCrew,
    lang
  } = useContext(MovieContext);

  useEffect(() => {
    getPerson();
    getPersonMovies();
  }, [lang]);

  const getPerson = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${match.match.params.id}?api_key=35f31bc5ec65018dd8090674c49fe3d2&language=${lang}`
    );
    const data = await response.json();
    setPerson(data);
  };

  const getPersonMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${match.match.params.id}/movie_credits?api_key=35f31bc5ec65018dd8090674c49fe3d2&language=${lang}`
    );
    const data = await response.json();
    setPersonMovies(data.cast);
    setPersonCrew(data.crew);
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
      <div className='mx-auto'>
        {profile_path !== undefined ? (
          <img src={`https://image.tmdb.org/t/p/w400${profile_path}`} alt='#' />
        ) : (
          <img alt='poster' src='/images/no_image.png' />
        )}
      </div>
      <div className='content container-fluid flex-wrap mx-lg-5 mx-md-2'>
        <h1 className=' text-center mb-0'>{name}</h1>
        {also_known_as && (
          <h4 className=' text-center second-text'>{also_known_as[0]}</h4>
        )}
        <h4>
          {lang === 'en-US' ? 'Date of birth: ' : 'Дата рождения: '}
          {birthday ? (
            <span className='second-text'>{birthday}</span>
          ) : (
            <span className='second-text'>
              {lang === 'en-US'
                ? 'Sorry, no information is available at this time'
                : 'К сожалению, информация отсутсвует...'}
            </span>
          )}
        </h4>
        {deathday && (
          <h4>
            {lang === 'en-US' ? 'Date of death: ' : 'Дата смерти: '}
            <span className='second-text'>{deathday}</span>
          </h4>
        )}
        <h4>
          {lang === 'en-US' ? 'Place of birth: ' : 'Место рождения: '}
          {place_of_birth ? (
            <span className='second-text'>{place_of_birth}</span>
          ) : (
            <span className='second-text'>
              {lang === 'en-US'
                ? 'Sorry, no information is available at this time'
                : 'К сожалению, информация отсутсвует...'}
            </span>
          )}
        </h4>
        <p>{biography}</p>
        <h4>
          {lang === 'en-US' ? 'Personal website: ' : 'Веб-сайт: '}
          {homepage ? (
            <a href={homepage} target='_blank' rel='noopener noreferrer'>
              {homepage}
            </a>
          ) : (
            <span className='second-text'>
              {lang === 'en-US'
                ? 'Sorry, no information is available at this time'
                : 'К сожалению, информация отсутсвует...'}
            </span>
          )}
        </h4>
        <h4>{lang === 'en-US' ? 'Filmography:' : 'Фильмография: '}</h4>
        <h4 className='text-center text-uppercase'>
          {lang === 'en-US' ? 'As an actor:' : 'Актер :'}
        </h4>
        {personMovies.length !== 0 ? (
          <div>
            <table className='table table-bordered table-light table-hover table-striped table-responsive-sm'>
              <thead className='thead-dark'>
                <tr>
                  <th scope='col'>№</th>
                  <th scope='col'>
                    {lang === 'en-US' ? 'Movie title' : 'Название'}
                  </th>
                  <th scope='col'>{lang === 'en-US' ? 'Character' : 'Роль'}</th>
                  <th scope='col'>
                    {lang === 'en-US' ? 'Release date' : 'Дата релиза'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {personMovies &&
                  personMovies
                    .sort((a, b) => (a.release_date > b.release_date ? -1 : 1))
                    .map((movie, index) => (
                      <tr key={movie.credit_id}>
                        <th scope='row'>{index + 1}</th>
                        <td>
                          <Link
                            to={`/movie/${movie.id}`}
                            style={{ color: 'black' }}
                          >
                            {movie.title}
                          </Link>
                        </td>
                        <td>{movie.character ? movie.character : 'Unknown'}</td>
                        <td>
                          {movie.release_date ? movie.release_date : 'Unknown'}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        ) : (
          <span className='second-text'>
            {lang === 'en-US'
              ? 'Sorry, no information is available at this time'
              : 'К сожалению, информация отсутсвует...'}
          </span>
        )}
        <h4 className='text-center text-uppercase'>
          {lang === 'en-US' ? 'As a crew member: ' : 'Член съемочной группы :'}
        </h4>
        {personCrew.length !== 0 ? (
          <div>
            <table className='table table-bordered table-light table-hover table-striped table-responsive-sm'>
              <thead className='thead-dark'>
                <tr>
                  <th scope='col'>№</th>
                  <th scope='col'>
                    {lang === 'en-US' ? 'Movie title' : 'Название'}
                  </th>
                  <th scope='col'>{lang === 'en-US' ? 'Job' : 'Роль'}</th>
                  <th scope='col'>
                    {lang === 'en-US' ? 'Release date' : 'Дата релиза'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {personCrew &&
                  personCrew
                    .sort((a, b) => (a.release_date > b.release_date ? -1 : 1))
                    .map((movie, index) => (
                      <tr key={movie.credit_id}>
                        <th scope='row'>{index + 1}</th>
                        <td>
                          <Link
                            to={`/movie/${movie.id}`}
                            style={{ color: 'black' }}
                          >
                            {movie.title}
                          </Link>
                        </td>
                        <td>{movie.job ? movie.job : 'Unknown'}</td>
                        <td>
                          {movie.release_date ? movie.release_date : 'Unknown'}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        ) : (
          <span className='second-text'>
            {lang === 'en-US'
              ? 'Sorry, no information is available at this time'
              : 'К сожалению, информация отсутсвует...'}
          </span>
        )}
      </div>
    </div>
  );
};

export default Person;
