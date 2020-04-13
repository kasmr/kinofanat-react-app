import React, { useState, createContext, useEffect } from 'react';

export const MovieContext = createContext();

export const MovieProvider = (props) => {
  //MoviesState
  const [movies, setMovies] = useState([]);
  const [lang, setLang] = useState('ru-RU');

  const changeLang = () => {
    if (lang === 'en-US') {
      setLang('ru-RU');
    } else {
      setLang('en-US');
    }
    setSearch({ active: false });
  };

  const getMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=35f31bc5ec65018dd8090674c49fe3d2&language=${lang}&page=1`
    );
    const data = await response.json();
    setMovies(data.results);
  };

  useEffect(() => {
    getMovies();
  }, [lang]);

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
    active: false,
  });

  //PersonState

  const [person, setPerson] = useState({});
  const [personMovies, setPersonMovies] = useState([]);
  const [personCrew, setPersonCrew] = useState([]);

  //SimilarMoviesState

  const [similar, setSimilar] = useState([]);

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
        resetHome,
        similar,
        setSimilar,
        lang,
        setLang,
        changeLang,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};
