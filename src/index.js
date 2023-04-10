import Swiper, { Keyboard, Autoplay, EffectCoverflow, Parallax} from 'swiper';
import '../node_modules/swiper/swiper.scss';
import API from './js/services/popularmoviesAPI';

const movieslider = new Swiper('.mySwiper', {
  modules: [Autoplay, EffectCoverflow],
  autoplay: {
    delay: 3000,
  },
  effect:['coverflow', 'parallax'],
  coverflowEffect: {
    rotate: 40,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  grabCursor: true,
  followFinger: true,
  slidesPerView: 4,
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  speed: 500,
});

window.addEventListener('wheel', function(e) {
  e.preventDefault();

  if (e.deltaY < 0) {
    movieslider.slidePrev();
  } else if (e.deltaY > 0) {
    movieslider.slideNext();
  }
});

const refs = {
  form: document.querySelector('.header__form'),
  movieContainer: document.querySelector('.swiper-wrapper'),
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
    } catch (error) {}
  }
      try {
      const { results } = await API.getPopularMovies();
      insertCardMarkup(results);
    } catch (error) {
      console.log(error);
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

      const movieData = {
        release_date,
        first_air_date,
      };
      let releaseDate;
      if (movieData.release_date) {
        releaseDate = movieData.release_date;
      } else if (movieData.first_air_date) {
        releaseDate = movieData.first_air_date;
      }
      return `
      <div class=swiper-slide><img class=image src=https://image.tmdb.org/t/p/original${poster_path} width=100 height=100/></div>`
    })
    .join('');

  refs.movieContainer.innerHTML = cardMarkup;
};




window.addEventListener('scroll', function() {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  var parallax = document.querySelector('.swiper__container ');
  parallax.style.transform = 'translate3d(0,' + scrollTop / 2 + 'px,0)';
});

// import { apiMovie } from "./serviseAPI";

// const insertCardMarkup = movies => {
//   const cardMarkup = movies
//     .map(({ title, release_date, poster_path, genre_ids, first_air_date }) => {
//       const getGenreNames = getGenresNames(genre_ids);

//       const movieData = {
//         release_date,
//         first_air_date,
//       };
//       let releaseDate;
//       if (movieData.release_date) {
//         releaseDate = movieData.release_date;
//       } else if (movieData.first_air_date) {
//         releaseDate = movieData.first_air_date;
//       }
//       return `
// <li class=film_card>
// <img class=film_poster src=https://image.tmdb.org/t/p/original${poster_path} width= 50 height= 50 alt= ${title}/>
// <p class=film_name>${title}</p>
// <p class=movie-gener>${getGenreNames}${releaseDate.slice(0,4)}</p>
// </li>`;
//     })
//     .join('');

//   refs.movieContainer.innerHTML = cardMarkup;
// };
// import { apiMovie } from "./serviseAPI";

// const trailerBox = document.querySelector('.trailer__list');

// window.addEventListener('load', fetchTrailers);

// async function fetchTrailers(e) {
//   e.preventDefault();
//   try {
//     const trailers = await apiMovie.fetchAllMovie(1);
//     id = trailers.results;
//   } catch (error) {
//     console.log(error);
//   }

//   const trailer = id.map(async ({ id }) => {
//     try {
//       const video = await apiMovie.fetchTrailerById(id);
//       return video.results;
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   const lastTry = await Promise.all(trailer);
//   trailerMarkup(lastTry.flat());
// }

// const trailerMarkup = async movies => {
//     const filteredMovies = await movies.filter(movie => movie.type === 'Trailer' && movie.name === 'Official Trailer')
//     console.log(filteredMovies);
    
//     const cardMarkup = await filteredMovies
//       .map(({ id, key, official }) => {   
//         return `
//         <li><iframe width="230" height="150" src="https://www.youtube.com/embed/${key}" title="YouTube video player" 
//         frameborder="0" allow="accelerometer; autoplay; 
//         clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></li>`;
//       })
//       .join('');
  
//       trailerBox.innerHTML = cardMarkup;
//   }