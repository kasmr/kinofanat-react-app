import React, { useContext, useEffect } from 'react';
import { MovieContext } from '../../context/MovieContext';
import '../../movieDetails.scss';

const Screenshots = match => {
  const { screenshots, setScreenshots } = useContext(MovieContext);

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

  return (
    <div className='screenshots-container container-fluid'>
      {screenshots.map(screenshot => (
        <a
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
      ))}
    </div>
  );
};

export default Screenshots;
