import React from 'react';
import { Spinner } from 'react-bootstrap';
import '../../movieDetails.scss';

const Loader = () => {
  return (
    <div className='spinner-container'>
      <Spinner
        className='spinner-border'
        animation='border'
        variant='primary'
      />
    </div>
  );
};

export default Loader;
