export default (state, action) => {
  switch (action.type) {
    case 'GET_MOVIES':
      return {
        ...state,
        movies: action.payload,
      };
    case 'GET_MOVIE_INFO':
      return {
        ...state,
        singleMovie: action.payload,
      };
    case 'GET_MOVIE_TRAILER':
      return {
        ...state,
        singleMovieTrailer: action.payload[0],
      };
    case 'CLEAN_UP_TRAILER':
      return {
        ...state,
        singleMovieTrailer: {},
      };
    case 'CHANGE_LANG':
      return {
        ...state,
        lang: state.lang === 'en-US' ? 'ru-RU' : 'en-US',
      };
    default:
      return state;
  }
};
