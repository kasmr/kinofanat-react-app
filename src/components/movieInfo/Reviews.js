import React, { useContext, useEffect } from 'react';
import { MovieContext } from '../context/MovieContext';
import { Redirect } from 'react-router-dom';

const Cast = match => {
  const { reviews, setReviews, search, lang } = useContext(MovieContext);

  useEffect(() => {
    getReviews();
  }, [lang]);

  const getReviews = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${match.match.params.id}/reviews?api_key=35f31bc5ec65018dd8090674c49fe3d2&language=${lang}`
    );
    const data = await response.json();
    setReviews(data.results);
    console.log(data);
  };

  if (search.redirect === true) {
    return <Redirect to='/' />;
  }

  return (
    <div className='card-deck flex-column m-0'>
      <h1 className='text-center mt-3'>
        {lang === 'en-US' ? 'Reviews' : 'Рецензии'}
      </h1>
      {reviews.length !== 0 ? (
        reviews.map((review, index) => (
          <div className='card text-dark mx-lg-5 my-lg-4' key={review.id}>
            <div className='card-body'>
              <h4 className='card-title'>
                {lang === 'en-US' ? 'Written by:' : 'Автор:'} {review.author}
              </h4>
              <p className='card-text'>{review.content}</p>
            </div>
            <div className='card-footer'>
              <small className='text-muted'>
                {lang === 'en-US' ? 'Review №' : 'Рецензия №'}
                {index + 1}
              </small>
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
            right: '0'
          }}
        >
          {lang === 'en-US'
            ? 'Unfortunately there are no any reviews about certain film...'
            : 'К сожалению, у данного фильма нет рецензий...'}
        </h1>
      )}
    </div>
  );
};

export default Cast;
