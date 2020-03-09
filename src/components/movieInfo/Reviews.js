import React, { useContext, useEffect } from 'react';
import { MovieContext } from '../context/MovieContext';
import { Redirect } from 'react-router-dom';

const Cast = match => {
  const { reviews, setReviews, search } = useContext(MovieContext);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${match.match.params.id}/reviews?api_key=35f31bc5ec65018dd8090674c49fe3d2`
    );
    const data = await response.json();
    setReviews(data.results);
    console.log(data);
  };

  if (search.redirect === true) {
    return <Redirect to='/' />;
  }

  return (
    <div class='card-deck flex-column m-0'>
      <h1 className='text-center mt-3'>Reviews</h1>
      {reviews.length !== 0 ? (
        reviews.map((review, index) => (
          <div className='card text-dark mx-5 my-4' key={review.id}>
            <div class='card-body'>
              <h4 class='card-title'>Written by: {review.author}</h4>
              <p class='card-text'>{review.content}</p>
            </div>
            <div class='card-footer'>
              <small class='text-muted'>Review #{index + 1}</small>
            </div>
          </div>
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
          Unfortunately there are no any reviews about certain film...
        </h1>
      )}
    </div>
  );
};

export default Cast;
