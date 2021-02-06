import './styles.scss';
import './js/fetchMovies';
import myLibraryMovie from './templates/myLibraryMovie.hbs';
import modalMovieCard from './templates/modalMovieCard.hbs';
import FilmApiService from './js/fetchMovies';
import getGenres from './js/getGenres';
import Pagination from './js/paginator';
import movieCard from './templates/movieCard.hbs';

import myLibrary from './js/myLibrary';
import './js/modal.js';

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

const paginationOptions = {
  // items: array,
  currentPage: filmApiService.page,
  pages: filmApiService.totalPages,
  template: movieCard,
  container: '.movies-list',
  paginationContainer: '.pagination',
  fullArray: true,
};
const paginationLibraryOptions = {
  currentPage: 1,
  template: myLibraryMovie,
  container: '.movies-list',
  paginationContainer: '.pagination',
  rows: 3,
};
// createPagination(myLibraryWatched.movies, 1, 0, myLibraryMovie);
const pagination = new Pagination(paginationOptions);
const paginationLibrary = new Pagination(paginationLibraryOptions);
const paginator = document.querySelector('.pagination');

document.addEventListener('DOMContentLoaded', renderMainPage);

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
  filmApiService.setPage(1);

  refs.searchFormRef.innerHTML = '';
  hideErrorMessage();
  createSearchForm();

  refs.btnMyLibrary.innerHTML = '';
  refs.searchFormRef.elements.query.value = '';
  refs.bodyRef.classList.remove('js-my-library-queue');
  refs.bodyRef.classList.remove('js-my-library-watched');
  paginator.removeEventListener('click', searchFilms);
  renderTrendingMovies();
  paginator.addEventListener('click', trendingSearch);
}
function createSearchForm() {
  const searchForm = `<input class="search-input" type="text" name="query" autocomplete="off" placeholder="Search for movies"><button class="search-button" type="submit">Search</button>`;
  refs.searchFormRef.insertAdjacentHTML('beforeend', searchForm);
}

function renderTrendingMovies() {
  filmApiService
    .fetchTrendingMovies()
    .then(array => getGenres(array))
    .then(array => {
      pagination.currentPage = filmApiService.page;
      pagination.create(array);
    });
}

function trendingSearch(event) {
  handleSearch(event, renderTrendingMovies);
}

function handleSearch(event, callback) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  if (event.target.classList.value === 'left-button') {
    if (filmApiService.page <= 1) {
      event.target.disabled = true;
      return;
    }
    filmApiService.setPage(filmApiService.page - 1);
  } else if (event.target.classList.value === 'right-button') {
    if (filmApiService.page >= filmApiService.totalPages) {
      event.target.disabled = true;
      return;
    }
    filmApiService.setPage(parseInt(filmApiService.page) + 1);
  } else {
    const page = event.target.dataset.index;
    filmApiService.setPage(page);
  }
  console.log(filmApiService.page);
  callback();
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
      hideErrorMessage();
      pagination.currentPage = filmApiService.page;
      pagination.pages = filmApiService.totalPages;
      pagination.create(array);
      //   new Pagination(array, paginationOptions);
      //   createPagination(
      //     array,
      //     filmApiService.page,
      //     filmApiService.totalPages,
      //     movieCard,
      //   );
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
  if (e.currentTarget.elements.query.value === '') return;
  filmApiService.setPage(1);

  filmApiService.query = e.currentTarget.elements.query.value;

  paginator.removeEventListener('click', trendingSearch);
  paginator.removeEventListener('click', searchFilms);
  paginator.addEventListener('click', searchFilms);

  searchMovies();
}
function showLibraryFilmPagination(event) {
  handleSearch(event, renderWatchedList);
}
function searchFilms(event) {
  handleSearch(event, searchMovies);
}
function handleClickOnMovie(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'A') return;

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
    if (refs.bodyRef.classList.value === 'js-my-library-watched') {
      renderWatchedList();
    }
    // refs.bodyRef.classList.add('js-my-library')
  }
}
function renderMyLibrary(e) {
  e.preventDefault();
  hideErrorMessage();
  refs.searchFormRef.innerHTML = '';
  refs.btnMyLibrary.innerHTML = '';

  createMyLibraryButtons();
  renderWatchedList();
  paginator.addEventListener('click', showLibraryFilmPagination);
  refs.bodyRef.classList.add('js-my-library-watched');
}
function createMyLibraryButtons() {
  const buttons = `<button class="btn-watched">Watched</button><button class="btn-queue">Queue</button>`;
  refs.btnMyLibrary.insertAdjacentHTML('beforeend', buttons);
}
function renderMyLibraryList(e) {
  if (e.target.classList.value === 'btn-watched') {
    renderWatchedList();
  }
  if (e.target.classList.value === 'btn-queue') {
    renderQueueList();
  }
}
function renderWatchedList() {
  refs.bodyRef.classList.add('js-my-library-watched');
  refs.bodyRef.classList.remove('js-my-library-queue');
  const localMovies = localStorage.getItem('moviesWatchedList');
  myLibraryWatched.movies = JSON.parse(localMovies);
  paginationLibrary.currentPage = 1;
  paginationLibrary.create(myLibraryWatched.movies);
  console.log(paginationLibrary.pages);

  //   new Pagination(myLibraryWatched.movies, paginationLibraryOptions);
  //   createPagination(myLibraryWatched.movies, 1, 0, myLibraryMovie);
}
function renderQueueList() {
  refs.bodyRef.classList.add('js-my-library-queue');
  refs.bodyRef.classList.remove('js-my-library-watched');
  const localMovies = localStorage.getItem('moviesQueueList');
  myLibraryQueue.movies = JSON.parse(localMovies);
  paginationLibrary.create(myLibraryQueue.movies);
  //   createPagination(myLibraryQueue.movies, 1, 0, myLibraryMovie);
}
