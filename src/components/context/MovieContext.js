import React, { useState, createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  lang: 'ru-RU',
  loading: false,
  movies: [],
  singleMovie: {},
  singleMovieTrailer: {},
  screenshots: [],
  reviews: [],
  similarMovies: [],
  movieCast: [],
  movieCrew: [],
};

export const MovieContext = createContext(initialState);

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const url = 'https://api.themoviedb.org/3/movie';
  const key = process.env.REACT_APP_API_KEY;

  //Actions

  //Get movies for home page

  const getMovies = async () => {
    const res = await fetch(
      `${url}/now_playing?api_key=${key}&language=${state.lang}&page=1`
    );

    const { results } = await res.json();

    dispatch({ type: 'GET_MOVIES', payload: results });
  };

  //Get Single Movie Details

  const getMovieInfo = async (id) => {
    setLoading();

    const res = await fetch(
      `${url}/${id}?api_key=${key}&language=${state.lang}`
    );

    const data = await res.json();

    dispatch({ type: 'GET_MOVIE_INFO', payload: data });
  };

  //Get trailer for a current movie

  const getMovieTrailer = async (id) => {
    const res = await fetch(
      `${url}/${id}/videos?api_key=${key}&language=${state.lang}`
    );

    const { results } = await res.json();

    dispatch({ type: 'GET_MOVIE_TRAILER', payload: results });
  };

  //Clean up function for a trailer state

  const cleanUpTrailer = () => {
    dispatch({ type: 'CLEAN_UP_TRAILER' });
  };

  //Get screenshots for current movie

  const getScreenshots = async (id) => {
    setLoading();

    const res = await fetch(`${url}/${id}/images?api_key=${key}`);

    const { backdrops } = await res.json();

    dispatch({ type: 'GET_SCREENSHOTS', payload: backdrops });
  };

  //Get reviews for current movie

  const getReviews = async (id) => {
    setLoading();

    const res = await fetch(
      `${url}/${id}/reviews?api_key=${key}&language=${state.lang}`
    );
    const { results } = await res.json();

    dispatch({ type: 'GET_REVIEWS', payload: results });
  };

  //Get similar movies

  const getSimilarMovies = async (id) => {
    setLoading();

    const res = await fetch(
      `${url}/${id}/similar?api_key=${key}&language=${state.lang}`
    );

    const { results } = await res.json();

    dispatch({ type: 'GET_SIMILAR_MOVIES', payload: results });
  };

  //Get cast of the movie

  const getMovieCast = async (id) => {
    setLoading();

    const response = await fetch(`${url}/${id}/credits?api_key=${key}`);

    const data = await response.json();

    dispatch({ type: 'GET_MOVIE_CAST', payload: data });
  };

  //HomeReset
  const resetHome = () => {
    getMovies();
    setSearch({ active: false });
  };

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

  //Change language

  const changeLang = () => {
    dispatch({ type: 'CHANGE_LANG' });
  };

  //Set loading

  const setLoading = () => {
    dispatch({ type: 'SET_LOADING' });
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
        screenshots: state.screenshots,
        getScreenshots,
        reviews: state.reviews,
        getReviews,
        similarMovies: state.similarMovies,
        getSimilarMovies,
        cast: state.movieCast,
        crew: state.movieCrew,
        getMovieCast,
        search,
        setSearch,
        person,
        setPerson,
        personMovies,
        setPersonMovies,
        personCrew,
        setPersonCrew,
        resetHome,

        lang: state.lang,
        changeLang,
        loading: state.loading,
        setLoading,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
