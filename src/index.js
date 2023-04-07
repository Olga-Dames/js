import swiper from './js/swiper';

import API from './js/services/popularmoviesAPI';

const refs = {
  form: document.querySelector('.header__form'),
  movieContainer: document.querySelector('.card__container'),
};

// refs.form.addEventListener('submit', onSubmit);
window.addEventListener('load', onLoad);

async function onLoad(e) {
  e.preventDefault();
  if (!window.localStorage.getItem('genres')) {
    try {
      const { genres } = await API.getGenreInfo();
      const dataToSave = genres.reduce((acc, { id, name }) => {
        acc[id] = { name };
        return acc;
      }, {});
      window.localStorage.setItem('genres', JSON.stringify(dataToSave));
    } catch (error) {
      console.log(error);
    }
  }

  try {
    const { results } = await API.getPopularMovies();
    insertCardMarkup(results);
  } catch (error) {
    console.log(error);
  }
}


const getGenresNames =() => {
const savedGenres = window.localStorage.getItem('genres')
console.log(savedGenres);

}
const insertCardMarkup = (movies) => {
  const cardMarkup = movies
    .map(({ title, release_date, poster_path, genre_ids, first_air_date }) => {
      // console.log(release_date);

      return `
<li class=movie__item>
<img src=https://image.tmdb.org/t/p/original${poster_path} width= 50 height= 50 alt= ${title}/>
<p class=movie__title>${title}</p>
<p class=movie__genre>${genre_ids}${release_date}</p>
</li>`;
    })
    .join('');

  refs.movieContainer.innerHTML = cardMarkup;
};

const getGenresInfo = () => {};
