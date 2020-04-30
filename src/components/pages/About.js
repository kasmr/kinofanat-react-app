import React from 'react';

const About = () => {
  return (
    <div className='vh-90 d-flex align-items-center justify-content-center flex-column text-center'>
      <h3>React app build using useContext + useReducer + theMovieDB API</h3>
      <h1>
        <a
          className='text-primary'
          href='https://github.com/kasmr/kinofanat-react-app'
        >
          <i className='fab fa-github'></i>
          Github
        </a>
      </h1>
    </div>
  );
};

export default About;
