import axios from 'axios';

const API_KEY = 'e2aff662c395c2714c9c8f21667cff02';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const getPopularMovies = async () => {
  const res = await axios.get(`/trending/all/week?api_key=${API_KEY}`);
  return res.data;
};

const getGenreInfo = async () => {
  const res = await axios.get(`/genre/movie/list?api_key=${API_KEY}`);
  return res.data;
};

const API = {
  getPopularMovies,
  getGenreInfo,
};
export default API;
