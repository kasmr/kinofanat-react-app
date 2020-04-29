import React, { useEffect, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import Loader from '../layout/Loader';
import '../../personDetails.scss';

const Person = (match) => {
  const {
    search,
    personInfo,
    getPersonInfo,
    getPersonMovies,
    personCast,
    personCrew,
    loading,
    lang,
  } = useContext(MovieContext);

  const personId = match.match.params.id;

  useEffect(() => {
    getPersonInfo(personId);
    getPersonMovies(personId);
  }, [lang, personId]);

  const {
    profile_path,
    name,
    birthday,
    deathday,
    place_of_birth,
    biography,
    homepage,
    also_known_as,
  } = personInfo;

  if (search.redirect === true) {
    return <Redirect to='/' />;
  }

  if (loading) {
    return <Loader />;
  }

  if (lang === 'en-US') {
    return (
      <>
        <div className='personDetails'>
          <div className='mx-auto'>
            {profile_path !== undefined ? (
              <img
                src={`https://image.tmdb.org/t/p/w400${profile_path}`}
                alt='#'
              />
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
              Date of birth:{' '}
              {birthday ? (
                <span className='second-text'>{birthday}</span>
              ) : (
                <span className='second-text'>
                  Sorry, no information is available at this time
                </span>
              )}
            </h4>
            {deathday && (
              <h4>
                Date of death: <span className='second-text'>{deathday}</span>
              </h4>
            )}
            <h4>
              Place of birth:{' '}
              {place_of_birth ? (
                <span className='second-text'>{place_of_birth}</span>
              ) : (
                <span className='second-text'>
                  Sorry, no information is available at this time
                </span>
              )}
            </h4>
            <p>{biography}</p>
            <h4 className='d-flex flex-wrap'>
              Personal website:{' '}
              {homepage ? (
                <a href={homepage} target='_blank' rel='noopener noreferrer'>
                  {homepage}
                </a>
              ) : (
                <span className='second-text'>
                  Sorry, no information is available at this time
                </span>
              )}
            </h4>
            <h4>Filmography: </h4>
          </div>
        </div>
        <h4 className='text-center text-uppercase'>As an actor:</h4>
        {personCast.length !== 0 ? (
          <div>
            <table className='table table-bordered table-light table-hover table-striped table-responsive-sm'>
              <thead className='thead-dark'>
                <tr>
                  <th scope='col'>Movie title</th>
                  <th scope='col'>Character</th>
                  <th scope='col'>Release date</th>
                </tr>
              </thead>
              <tbody>
                {personCast &&
                  personCast
                    .sort((a, b) => (a.release_date > b.release_date ? -1 : 1))
                    .map((movie) => (
                      <tr key={movie.credit_id}>
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
          <span className='second-text second-text d-flex justify-content-center'>
            Sorry, no information is available at this time
          </span>
        )}
        <h4 className='text-center text-uppercase'>As a crew member:</h4>
        {personCrew.length !== 0 ? (
          <div>
            <table className='table table-bordered table-light table-hover table-striped table-responsive-sm'>
              <thead className='thead-dark'>
                <tr>
                  <th scope='col'>Movie title</th>
                  <th scope='col'>Job</th>
                  <th scope='col'>Release date</th>
                </tr>
              </thead>
              <tbody>
                {personCrew &&
                  personCrew
                    .sort((a, b) => (a.release_date > b.release_date ? -1 : 1))
                    .map((movie) => (
                      <tr key={movie.credit_id}>
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
          <span className='second-text second-text d-flex justify-content-center'>
            Sorry, no information is available at this time
          </span>
        )}
      </>
    );
  } else {
    return (
      <>
        <div className='personDetails'>
          <div className='mx-auto'>
            {profile_path !== undefined ? (
              <img
                src={`https://image.tmdb.org/t/p/w400${profile_path}`}
                alt='#'
              />
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
              Дата рождения:{' '}
              {birthday ? (
                <span className='second-text'>{birthday}</span>
              ) : (
                <span className='second-text'>
                  К сожалению, информация отсутсвует...
                </span>
              )}
            </h4>
            {deathday && (
              <h4>
                Дата смерти: <span className='second-text'>{deathday}</span>
              </h4>
            )}
            <h4>
              Место рождения:{' '}
              {place_of_birth ? (
                <span className='second-text'>{place_of_birth}</span>
              ) : (
                <span className='second-text'>
                  К сожалению, информация отсутсвует...
                </span>
              )}
            </h4>
            <p>{biography}</p>
            <h4 className='d-flex flex-wrap'>
              Веб-сайт:
              {homepage ? (
                <a href={homepage} target='_blank' rel='noopener noreferrer'>
                  {homepage}
                </a>
              ) : (
                <span className='second-text'>
                  К сожалению, информация отсутсвует...
                </span>
              )}
            </h4>
            <h4>Фильмография: </h4>
          </div>
        </div>
        <h4 className='text-center text-uppercase'>Актер :</h4>
        {personCast.length !== 0 ? (
          <div>
            <table className='table table-bordered table-light table-hover table-striped table-responsive-sm'>
              <thead className='thead-dark'>
                <tr>
                  <th scope='col'>Название</th>
                  <th scope='col'>{lang === 'en-US' ? 'Character' : 'Роль'}</th>
                  <th scope='col'>Дата релиза</th>
                </tr>
              </thead>
              <tbody>
                {personCast &&
                  personCast
                    .sort((a, b) => (a.release_date > b.release_date ? -1 : 1))
                    .map((movie) => (
                      <tr key={movie.credit_id}>
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
          <span className='second-text d-flex justify-content-center'>
            К сожалению, информация отсутсвует...
          </span>
        )}
        <h4 className='text-center text-uppercase'>Член съемочной группы</h4>
        {personCrew.length !== 0 ? (
          <div>
            <table className='table table-bordered table-light table-hover table-striped table-responsive-sm'>
              <thead className='thead-dark'>
                <tr>
                  <th scope='col'>Название</th>
                  <th scope='col'>Роль</th>
                  <th scope='col'>Дата релиза</th>
                </tr>
              </thead>
              <tbody>
                {personCrew &&
                  personCrew
                    .sort((a, b) => (a.release_date > b.release_date ? -1 : 1))
                    .map((movie) => (
                      <tr key={movie.credit_id}>
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
          <span className='second-text d-flex justify-content-center'>
            К сожалению, информация отсутсвует...
          </span>
        )}
      </>
    );
  }
};

export default Person;
