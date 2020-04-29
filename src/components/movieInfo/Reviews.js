import React, { useContext, useEffect } from 'react';
import { MovieContext } from '../context/MovieContext';
import { Redirect } from 'react-router-dom';
import Loader from '../layout/Loader';

const Cast = (match) => {
  const { reviews, getReviews, search, lang, loading } = useContext(
    MovieContext
  );

  const movieId = match.match.params.id;

  useEffect(() => {
    getReviews(movieId);
    //eslint-disable-next-line
  }, [lang, movieId]);

  if (loading) {
    return <Loader />;
  }

  if (search.redirect === true) {
    return <Redirect to='/' />;
  }

  if (lang === 'en-US') {
    return (
      <div className='card-deck flex-column m-0'>
        <h1 className='text-center mt-3'>Reviews</h1>
        {reviews.length !== 0 ? (
          reviews.map((review, index) => (
            <div className='card text-dark mx-lg-5 my-lg-4' key={review.id}>
              <div className='card-body'>
                <h4 className='card-title'>Written by: {review.author}</h4>
                <p className='card-text'>{review.content}</p>
              </div>
              <div className='card-footer'>
                <small className='text-muted'>Review №{index + 1}</small>
              </div>
            </div>
          ))
        ) : (
          <h1
            className='text-center position-absolute no-reviews'
            style={{
              margin: 'auto',
              color: '#b10101',
              top: '50%',
              bottom: '0',
              left: '0',
              right: '0',
            }}
          >
            Unfortunately there are no any reviews about certain film...
          </h1>
        )}
      </div>
    );
  } else {
    return (
      <div className='card-deck flex-column m-0'>
        <h1 className='text-center mt-3'>Рецензии</h1>
        {reviews.length !== 0 ? (
          reviews.map((review, index) => (
            <div className='card text-dark mx-lg-5 my-lg-4' key={review.id}>
              <div className='card-body'>
                <h4 className='card-title'>Автор: {review.author}</h4>
                <p className='card-text'>{review.content}</p>
              </div>
              <div className='card-footer'>
                <small className='text-muted'>Рецензия №{index + 1}</small>
              </div>
            </div>
          ))
        ) : (
          <h1
            className='text-center position-absolute no-reviews'
            style={{
              margin: 'auto',
              color: '#b10101',
              top: '50%',
              bottom: '0',
              left: '0',
              right: '0',
            }}
          >
            К сожалению, у данного фильма нет рецензий...
          </h1>
        )}
      </div>
    );
  }
};

export default Cast;
