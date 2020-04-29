import React, { useState, createContext, useEffect, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  movies: [],
  lang: 'ru-RU',
  singleMovie: {},
  singleMovieTrailer: {},
};

export const MovieContext = createContext(initialState);

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const url = 'https://api.themoviedb.org';
  const key = process.env.REACT_APP_API_KEY;

  //Actions

  //Get movies for home page

  const getMovies = async () => {
    const res = await fetch(
      `${url}/3/movie/now_playing?api_key=${key}&language=${state.lang}&page=1`
    );
    const data = await res.json();
    dispatch({ type: 'GET_MOVIES', payload: data.results });
  };

  //Get Single Movie Details

  const getMovieInfo = async (id) => {
    const res = await fetch(
      `${url}/3/movie/${id}?api_key=${key}&language=${state.lang}`
    );

    const data = await res.json();

    dispatch({ type: 'GET_MOVIE_INFO', payload: data });
  };

  //Get trailer for a current movie

  const getMovieTrailer = async (id) => {
    const res = await fetch(
      `${url}/3/movie/${id}/videos?api_key=${key}&language=${state.lang}`
    );

    const data = await res.json();

    dispatch({ type: 'GET_MOVIE_TRAILER', payload: data.results });
  };

  //Clean up function for a trailer state
  const cleanUpTrailer = () => {
    dispatch({ type: 'CLEAN_UP_TRAILER' });
  };

  //HomeReset
  const resetHome = () => {
    getMovies();
    setSearch({ active: false });
  };

  //CastAndCrewState

  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

  //ScreenshotsState

  const [screenshots, setScreenshots] = useState([]);

  //ReviewsState
  const [reviews, setReviews] = useState([]);

  //SearchState

  const [search, setSearch] = useState({
    query: null,
    redirect: false,
    active: false,
  });

  //PersonState

  const [person, setPerson] = useState({});
  const [personMovies, setPersonMovies] = useState([]);
  const [personCrew, setPersonCrew] = useState([]);

  //SimilarMoviesState

  const [similar, setSimilar] = useState([]);

  //Change language

  const changeLang = () => {
    dispatch({ type: 'CHANGE_LANG' });
  };

  return (
    <MovieContext.Provider
      value={{
        movies: state.movies,
        getMovies,
        singleMovie: state.singleMovie,
        getMovieInfo,
        singleMovieTrailer: state.singleMovieTrailer,
        getMovieTrailer,
        cleanUpTrailer,
        search,
        setSearch,
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
        resetHome,
        similar,
        setSimilar,
        lang: state.lang,
        changeLang,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
