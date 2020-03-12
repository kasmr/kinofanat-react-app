import React, { useContext } from 'react';
import { MovieContext } from './context/MovieContext';

const Alert = () => {
  const { alert } = useContext(MovieContext);

  return (
    <>
      {alert ? (
        <div className='alert alert-search'>
          <i className='fas fa-exclamation-circle'></i> {alert}
        </div>
      ) : null}
    </>
  );
};

export default Alert;
