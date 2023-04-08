import swiper from './js/swiper';

import API from './js/services/popularmoviesAPI';

const refs = {
  form: document.querySelector('.header__form'),
  movieContainer: document.querySelector('.card__container'),
};

window.addEventListener('load', onLoad);

async function onLoad(e) {
  e.preventDefault();
  if (!window.localStorage.getItem('genres')) {
    try {
      const { genres } = await API.getGenreInfo();

      const genresToSave = genres.reduce((acc, { id, name }) => {
        acc[id] = name;
        return acc;
      }, {});
      window.localStorage.setItem('genres', JSON.stringify(genresToSave));
      const { results } = await API.getPopularMovies();
      insertCardMarkup(results);
    } catch (error) {
      console.log(error);
    }
  }
}

const getGenresNames = ids => {
  const savedGenres = JSON.parse(window.localStorage.getItem('genres'));
  const genresNames = Object.entries(savedGenres)
    .filter(([key]) => ids.includes(parseInt(key)))
    .map(([_, value]) => value);
  return genresNames;
};

const insertCardMarkup = movies => {
  const cardMarkup = movies
    .map(({ title, release_date, poster_path, genre_ids, first_air_date }) => {
      const getGenreNames = getGenresNames(genre_ids);   
      return `
<li class=film_card>
<img class=film_poster src=https://image.tmdb.org/t/p/original${poster_path} width= 50 height= 50 alt= ${title}/>
<p class=film_name>${title}</p>
<p class=movie-gener>${getGenreNames}${release_date}</p>
</li>`;
    })
    .join('');

  refs.movieContainer.innerHTML = cardMarkup;
};
