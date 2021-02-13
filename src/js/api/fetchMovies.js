import getGenres from './getGenres';
import addLoader from '../../loader/loader';
import refs from '../components/refs';
import fallbackImg from '../../images/gallery/fallback.png';

const API_KEY = '599b2da5737417d6d547b02cdbe7d5e8';

export default class FilmApiService {
  constructor() {
    this.page = 1;
    this.query = '';
    this.totalPages = 20;
    this.movieID = '';
  }

  fetchTrendingMovies(page) {
    this.clearLoader();
    addLoader();
    this.page = page;
    return (
      fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${this.page}`,
      )
        // .then(addLoader())
        .then(response => response.json())
        .then(object => {
          // console.log(object);
          // refs.loaderRef.innerHTML = '';
          this.totalPages = 20;
          return object.results;
        })
        .then(array => {
          return getGenres(array).then(array => {
            this.clearLoader();
            return array;
          });
        })
      // .finally((refs.loaderRef.innerHTML = ''))
    );
  }

  fetchMovieByWord(page) {
    this.clearLoader();
    addLoader();
    this.page = page;
    return fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${this.query}&language=en-US&page=${this.page}&include_adult=false`,
    )
      .then(response => response.json())
      .then(obj => {
        // console.log(obj.total_pages)
        // console.log(obj.results);
        this.totalPages = obj.total_pages < 20 ? obj.total_pages : 20;
        console.log(this.totalPages);
        return obj.results;
      })
      .then(array => {
        return getGenres(array).then(array => {
          this.clearLoader();
          return array;
        });
      });
  }
  fetchMovieInfo() {
    this.clearLoader();
    addLoader();
    return fetch(
      `https://api.themoviedb.org/3/movie/${this.movieID}?api_key=${API_KEY}&language=en-US`,
    )
      .then(response => response.json())
      .then(obj => {
        obj.release = parseInt(obj.release_date);
        obj.fallback = fallbackImg;
        // console.log(obj);
        obj.genres = obj.genres.map(el => el.name);
        // console.log(obj.genres);
        // console.log(obj.total_pages)
        // console.log(this.totalPages)
        this.clearLoader();
        return obj;
      });
  }
  setPage(pageNumber) {
    this.page = pageNumber;
  }
  clearLoader() {
    refs.loaderRef.innerHTML = '';
  }
}
