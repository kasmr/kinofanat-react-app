import React, { useState, createContext, useEffect } from 'react';

export const MovieContext = createContext();

export const MovieProvider = props => {
  //MoviesState
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/now_playing?api_key=35f31bc5ec65018dd8090674c49fe3d2&page=1'
    );
    const data = await response.json();
    setMovies(data.results);
  };

  useEffect(() => {
    getMovies();
  }, []);

  //HomeReset
  const resetHome = () => {
    getMovies();
    setSearch({ active: false });
  };

  //MovieDetailState

  const [movie, setMovie] = useState([]);

  //CastAndCrewState

  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

  //ScreenshotsState

  const [screenshots, setScreenshots] = useState([]);

  //ReviewsState
  const [reviews, setReviews] = useState([]);

  //TrailerState

  const [trailers, setTrailers] = useState([]);

  //SearchState

  const [search, setSearch] = useState({
    query: '',
    redirect: false,
    active: false
  });
  const [query, setQuery] = useState('');

  //PersonState

  const [person, setPerson] = useState({});
  const [personMovies, setPersonMovies] = useState([]);
  const [personCrew, setPersonCrew] = useState([]);

  //AlertState

  const [alert, setAlert] = useState('');

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        getMovies,
        movie,
        setMovie,
        search,
        setSearch,
        query,
        setQuery,
        alert,
        setAlert,
        trailers,
        setTrailers,
        screenshots,
        setScreenshots,
        cast,
        setCast,
        crew,
        setCrew,
        reviews,
        setReviews,
        person,
        setPerson,
        personMovies,
        setPersonMovies,
        personCrew,
        setPersonCrew,
        resetHome
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};
