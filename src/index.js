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
      console.log(genres);
      
      const genresToSave = genres.reduce((acc, { id, name }) => {
        acc[id] = name ;
        return acc;
      }, {});
      window.localStorage.setItem('genres', JSON.stringify(genresToSave));
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

// fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=YOUR_API_KEY')
//   .then(response => response.json())
//   .then(data => {
//     const genres = data.genres;
//     const genreId = 28; // пример идентификатора жанра
//     const genre = genres.find(genre => genre.id === genreId);
//     if (genre) {
//       console.log(genre.name); // вывод названия жанра
//     }
//   })
//   .catch(error => console.error(error));

const getGenresNames = id => {

  const savedGenres = JSON.parse(window.localStorage.getItem('genres'));
  console.log(Object.keys(savedGenres));

  for (const id in savedGenres) {
    // if(gengeId === id){
    //   console.log('we fount it');
  }
  // const element = savedGenres[id];

  // }
};
// const genre = savedGenres.find(genre)

// }
getGenresNames();

const insertCardMarkup = movies => {
  const cardMarkup = movies
    .map(({ title, release_date, poster_path, genre_ids, first_air_date }) => {
      console.log(release_date);
      
      return `
<li class=film_card>
<img class=film_poster src=https://image.tmdb.org/t/p/original${poster_path} width= 50 height= 50 alt= ${title}/>
<p class=film_name>${title}</p>
<p class=movie-gener>${genre_ids}${release_date}</p>
</li>`;
    })
    .join('');

  refs.movieContainer.innerHTML = cardMarkup;
};
