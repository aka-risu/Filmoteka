import pagination from '../pagination/paginationObj';
import filmApiService from '../api/filmApiServiceObj';
import refs from '../components/refs';
import renderLibraryButtons from './renderLibraryButtons';
import { hideErrorMessage } from '../components/errorMessage';
import MyLibrary from './myLibrary';
import clearPage from '../components/clearPage';

import { setPaginationLibraryOptions } from '../pagination/paginationSettings';
import { myLibraryQueue, myLibraryWatched } from './myLibraryObj';

refs.btnsMyLibrary.addEventListener('click', renderMyLibraryList);

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
function renderMyLibrary(event) {
  event.preventDefault();
  hideErrorMessage();
  refs.bodyRef.classList.add('js-my-library-watched');
  refs.headerRef.classList.remove('header-bg-home');
  refs.headerRef.classList.add('header-bg-lib');
  clearPage();
  setPaginationLibraryOptions();

  renderLibraryButtons();

  renderWatchedList();
}

function renderMyLibraryList(event) {
  if (event.target.classList.value === 'btn-watched') {
    pagination.currentPage = 1;
    renderWatchedList();
  }
  if (event.target.classList.value === 'btn-queue') {
    pagination.currentPage = 1;
    renderQueueList();
  }
}
function renderWatchedList() {
  refs.bodyRef.classList.add('js-my-library-watched');
  refs.bodyRef.classList.remove('js-my-library-queue');
  const localMovies = localStorage.getItem('moviesWatchedList');
  myLibraryWatched.movies = JSON.parse(localMovies);

  pagination.callback = renderWatchedList;
  pagination.create(myLibraryWatched.movies);
}
function renderQueueList() {
  refs.bodyRef.classList.add('js-my-library-queue');
  refs.bodyRef.classList.remove('js-my-library-watched');
  const localMovies = localStorage.getItem('moviesQueueList');
  myLibraryQueue.movies = JSON.parse(localMovies);

  pagination.callback = renderQueueList;
  pagination.create(myLibraryQueue.movies);
}
export default renderMyLibrary;
