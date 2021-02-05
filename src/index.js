import './styles.css';
import './fetchMovies';
import myLibraryMovie from './myLibraryMovie.hbs';
import modalMovieCard from './modalMovieCard.hbs';
import FilmApiService from './fetchMovies';
import getGenres from './getGenres';
import createPagination from './paginator';
import movieCard from './movieCard.hbs';

import myLibrary from './myLibrary';
import './modal.js';

const refs = {
  movieListRef: document.querySelector('.movies-list'),
  navigationRef: document.querySelector('.navigation'),
  logoRef: document.querySelector('.navigation-logo'),
  homeRef: document.querySelector('.navigation-home'),
  myLibraryRef: document.querySelector('.navigation-my-library'),
  searchFormRef: document.querySelector('.search-form'),
  errorMessageRef: document.querySelector('.error-message'),
  paginationRef: document.querySelector('.pagination'),
  modalRef: document.querySelector('.js-modal'),
  bodyRef: document.querySelector('body'),
  btnWatchedRef: document.querySelector('.btn-watched'),
  btnQueueRef: document.querySelector('.btn-queue'),
  btnMyLibrary: document.querySelector('.my-library-buttons'),
  btnAddWatched: document.querySelector('.btn-add-watched'),
  btnAddQueue: document.querySelector('.btn-add-queue'),
};

const filmApiService = new FilmApiService();
const myLibraryWatched = new myLibrary();
const myLibraryQueue = new myLibrary();
const paginator = document.querySelector('.pagination');
renderTrendingMovies();
// refs.navigationRef.addEventListener('click', renderMainPage)
refs.homeRef.addEventListener('click', renderMainPage);
refs.logoRef.addEventListener('click', renderMainPage);
refs.myLibraryRef.addEventListener('click', renderMyLibrary);

paginator.addEventListener('click', trendingSearch);
refs.searchFormRef.addEventListener('submit', search);
refs.searchFormRef.addEventListener('input', clearError);
refs.movieListRef.addEventListener('click', handleClickOnMovie);

refs.btnMyLibrary.addEventListener('click', renderMyLibraryList);
function renderMainPage(e) {
  e.preventDefault();
  console.log(e.target);
  // if (e.target.classList.value !== "navigation-logo" || e.target.classList.value !=="navgation-home") return

  filmApiService.setPage(1);
  // refs.btnWatchedRef.classList.add('is-hidden')
  // refs.btnQueueRef.classList.add('is-hidden')
  refs.searchFormRef.innerHTML = '';
  const searchForm = `<input class="search-input" type="text" name="query" autocomplete="off" placeholder="Search for movies"><button class="search-button" type="submit">Search</button>`;
  refs.searchFormRef.insertAdjacentHTML('beforeend', searchForm);
  refs.btnMyLibrary.innerHTML = '';
  refs.searchFormRef.elements.query.value = '';
  // refs.searchFormRef.classList.remove('is-hidden')
  renderTrendingMovies();
}
function renderTrendingMovies() {
  filmApiService
    .fetchTrendingMovies()
    .then(array => getGenres(array))
    .then(array => {
      createPagination(
        array,
        filmApiService.page,
        filmApiService.totalPages,
        movieCard,
      );
    });
}

function trendingSearch(event) {
  // filmApiService.setPage(1)
  handleSearch(event, getTrendingMovies);
}
function handleSearch(event, callback) {
  // console.log(filmApiService.page)
  // console.dir(event.target.classList.value)
  // paginator.removeEventListener("click", searchFilms)

  if (event.target.nodeName !== 'BUTTON') {
    // console.log(":(")
    return;
  }
  if (event.target.classList.value === 'left-button') {
    if (filmApiService.page <= 1) return;
    filmApiService.setPage(filmApiService.page - 1);
  } else if (event.target.classList.value === 'right-button') {
    if (filmApiService.page >= filmApiService.totalPages) return;
    filmApiService.setPage(parseInt(filmApiService.page) + 1);
  } else {
    const page = event.target.dataset.index;
    // console.log(page)
    filmApiService.setPage(page);
  }
  // console.log(filmApiService.page)
  callback();
}

function getTrendingMovies() {
  filmApiService
    .fetchTrendingMovies()
    .then(array => getGenres(array))
    .then(array => {
      createPagination(
        array,
        filmApiService.page,
        filmApiService.totalPages,
        movieCard,
      );
    });
}

function searchMovies() {
  filmApiService
    .fetchMovieByWord()
    .then(array => getGenres(array))
    .then(array => {
      if (array.length === 0) {
        showErrorMessage();
        return;
      }
      if (array.length > 0) {
        hideErrorMessage();
        createPagination(
          array,
          filmApiService.page,
          filmApiService.totalPages,
          movieCard,
        );
      }
    });
}

function showErrorMessage() {
  refs.errorMessageRef.classList.remove('is-hidden');
}

function hideErrorMessage() {
  refs.errorMessageRef.classList.add('is-hidden');
}

function clearError(e) {
  if (e.target.value === '') hideErrorMessage();
}

function search(e) {
  e.preventDefault();
  filmApiService.setPage(1);

  filmApiService.query = e.currentTarget.elements.query.value;
  // paginator.removeEventListener("click", event => handleSearch(event, getTrendingMovies()))
  paginator.removeEventListener('click', trendingSearch);
  paginator.removeEventListener('click', searchFilms);
  paginator.addEventListener('click', searchFilms);

  // console.log(filmApiService.query)
  searchMovies();
}
function searchFilms(event) {
  return handleSearch(event, searchMovies);
}
function handleClickOnMovie(event) {
  event.preventDefault();
  // console.log(event.target)
  if (event.target.nodeName !== 'A') return;

  // console.log(event.target.id)
  filmApiService.movieID = event.target.id;
  filmApiService.fetchMovieInfo().then(obj => {
    refs.modalRef.innerHTML = '';
    refs.modalRef.insertAdjacentHTML('beforeend', modalMovieCard(obj));
    refs.modalRef.classList.remove('is-hidden');

    if (myLibraryWatched.findMovie(obj.id)) {
      const btnWatched = document.querySelector('.btn-add-watched');
      btnWatched.textContent = 'Remove from watched';
      btnWatched.classList.remove('btn-add-watched');
      btnWatched.classList.add('btn-remove-watched');
    }
    if (myLibraryQueue.findMovie(obj.id)) {
      const btnWatched = document.querySelector('.btn-add-queue');
      btnWatched.textContent = 'Remove from queue';
      btnWatched.classList.remove('btn-add-queue');
      btnWatched.classList.add('btn-remove-queue');
    }
  });

  refs.bodyRef.classList.add('modal-open');
  refs.modalRef.addEventListener('click', handleMyLibraryMovie);
  refs.modalRef.addEventListener('click', closeModal);
  window.addEventListener('keyup', closeModal);
}
function handleMyLibraryMovie(event) {
  if (event.target.dataset.action !== 'add') return;

  if (event.target.classList.value === 'btn-remove-watched') {
    console.log(filmApiService.movieID);
    myLibraryWatched.deleteMovie(filmApiService.movieID);

    localStorage.setItem(
      'moviesWatchedList',
      JSON.stringify(myLibraryWatched.movies),
    );

    event.target.textContent = 'Add to watched';
    event.target.classList.remove('btn-remove-watched');
    event.target.classList.add('btn-add-watched');
  } else if (event.target.classList.value === 'btn-add-watched') {
    filmApiService.fetchMovieInfo().then(obj => {
      myLibraryWatched.addMovie(obj);
      localStorage.setItem(
        'moviesWatchedList',
        JSON.stringify(myLibraryWatched.movies),
      );

      event.target.textContent = 'Remove from watched';
      event.target.classList.remove('btn-add-watched');
      event.target.classList.add('btn-remove-watched');
    });
  }
  if (event.target.classList.value === 'btn-remove-queue') {
    console.log(filmApiService.movieID);
    myLibraryQueue.deleteMovie(filmApiService.movieID);

    localStorage.setItem(
      'moviesQueueList',
      JSON.stringify(myLibraryQueue.movies),
    );

    event.target.textContent = 'Add to queue';
    event.target.classList.remove('btn-remove-queue');
    event.target.classList.add('btn-add-queue');
  } else if (event.target.classList.value === 'btn-add-queue') {
    filmApiService.fetchMovieInfo().then(obj => {
      myLibraryQueue.addMovie(obj);
      localStorage.setItem(
        'moviesQueueList',
        JSON.stringify(myLibraryQueue.movies),
      );

      event.target.textContent = 'Remove from queue';
      event.target.classList.remove('btn-add-queue');
      event.target.classList.add('btn-remove-queue');
    });
  }
}

function closeModal(event) {
  if (event.target.classList.value === 'overlay' || event.keyCode === 27) {
    refs.modalRef.classList.add('is-hidden');
    refs.bodyRef.classList.remove('modal-open');
    refs.modalRef.removeEventListener('click', closeModal);
    window.removeEventListener('keyup', closeModal);
    refs.modalRef.removeEventListener('click', handleMyLibraryMovie);

    const localMovies = localStorage.getItem('moviesWatchedList');
    myLibraryWatched.movies = JSON.parse(localMovies);

    createPagination(myLibraryWatched.movies, 1, 0, myLibraryMovie);
  }
}
function renderMyLibrary(e) {
  e.preventDefault();
  console.log(e.target.classList.value);
  refs.searchFormRef.innerHTML = '';
  refs.btnMyLibrary.innerHTML = '';
  const buttons = `<button class="btn-watched">Watched</button><button class="btn-queue">Queue</button>`;
  refs.btnMyLibrary.insertAdjacentHTML('beforeend', buttons);

  const localMovies = localStorage.getItem('moviesWatchedList');
  myLibraryWatched.movies = JSON.parse(localMovies);
  createPagination(myLibraryWatched.movies, 1, 0, myLibraryMovie);
}
function renderMyLibraryList(e) {
  if (e.target.classList.value === 'btn-watched') {
    const localMovies = localStorage.getItem('moviesWatchedList');
    myLibraryWatched.movies = JSON.parse(localMovies);
    console.log(myLibraryWatched.movies);
    createPagination(myLibraryWatched.movies, 1, 0, myLibraryMovie);
  }
  if (e.target.classList.value === 'btn-queue') {
    const localMovies = localStorage.getItem('moviesQueueList');
    myLibraryQueue.movies = JSON.parse(localMovies);
    console.log(myLibraryQueue.movies);
    createPagination(myLibraryQueue.movies, 1, 0, myLibraryMovie);
  }
}
