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

function renderMyLibrary(event) {
  event.preventDefault();
  hideErrorMessage();
  refs.bodyRef.classList.add('js-my-library-watched');
  refs.headerRef.classList.remove('header-bg-home');
  refs.headerRef.classList.add('header-bg-lib');
  clearPage();
  setPaginationLibraryOptions();
  event.target.classList.add('current');
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
