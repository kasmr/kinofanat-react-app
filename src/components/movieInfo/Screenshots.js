import React, { useContext, useEffect } from 'react';
import { MovieContext } from '../context/MovieContext';
import '../../movieDetails.scss';
import { Redirect } from 'react-router-dom';

const Screenshots = match => {
  const { screenshots, setScreenshots, search, lang } = useContext(
    MovieContext
  );

  useEffect(() => {
    getScreenShots();
  }, []);

  const getScreenShots = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${match.match.params.id}/images?api_key=35f31bc5ec65018dd8090674c49fe3d2`
    );
    const data = await response.json();
    setScreenshots(data.backdrops);
    console.log(data.backdrops);
  };

  if (search.redirect === true) {
    return <Redirect to='/' />;
  }

  return (
    <div className='screenshots-container container-fluid'>
      {screenshots.length !== 0 ? (
        screenshots.map(screenshot => (
          <a
            key={screenshot.file_path}
            href={`https://image.tmdb.org/t/p/original${screenshot.file_path}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              key={screenshot.file_path}
              className='screenshot'
              src={`https://image.tmdb.org/t/p/w400${screenshot.file_path}`}
              alt='#'
            />
          </a>
        ))
      ) : (
        <h1
          className='text-center position-absolute'
          style={{
            margin: 'auto',
            color: '#b10101',
            top: '50%',
            bottom: '0',
            left: '0',
            right: '0'
          }}
        >
          {lang === 'en-US'
            ? 'Unfortunately there are no any screenshots of certain film...'
            : 'К сожалению, у данного фильма нет скриншотов...'}
        </h1>
      )}
    </div>
  );
};

export default Screenshots;
