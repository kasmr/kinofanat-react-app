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
    <div>
      {reviews.length !== 0 ? (
        <div className='container-fluid'>
          <h1 className='text-center mt-3'>Reviews</h1>
          <div className=' container-fluid d-block p-3'>
            {reviews &&
              reviews.map((review, index) => (
                <div
                  key={review.id}
                  className='card p-3 text-left text-dark w-75 my-5 mx-auto'
                >
                  <h4 className='mx-auto mb-3'>Review #{index + 1}</h4>

                  <blockquote className='blockquote mb-0'>
                    <p className='p-5'>{review.content}</p>
                    <h4 className='text-dark mt-5'>
                      Written by:{' '}
                      <cite title='Source Title'>{review.author}</cite>
                    </h4>
                  </blockquote>
                </div>
              ))}
          </div>
        </div>
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
