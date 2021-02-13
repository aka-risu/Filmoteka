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
  // hideErrorMessage();
  refs.bodyRef.classList.add('js-my-library-watched');
  refs.headerRef.classList.remove('header-bg-home');
  refs.headerRef.classList.add('header-bg-lib');
  clearPage();
  setPaginationLibraryOptions();
  event.target.classList.add('current');
  renderLibraryButtons();
  if (!localStorage.getItem('moviesWatchedList')) {
    localStorage.setItem(
      'moviesWatchedList',
      JSON.stringify(myLibraryWatched.movies),
    );
  }
  if (!localStorage.getItem('moviesQueueList')) {
    localStorage.setItem(
      'moviesQueueList',
      JSON.stringify(myLibraryQueue.movies),
    );
  }
  renderWatchedList();
}

function renderMyLibraryList(event) {
  if (event.target.dataset.type === 'btn-watched') {
    event.target.classList.add('current-btn-library');
    const btnQueue = refs.btnsMyLibrary.querySelector(
      '[data-type="btn-queue"]',
    );
    console.log(btnQueue);
    btnQueue.classList.remove('current-btn-library');
    pagination.currentPage = 1;
    renderWatchedList();
  }

  if (event.target.dataset.type === 'btn-queue') {
    event.target.classList.add('current-btn-library');
    const btnWatched = refs.btnsMyLibrary.querySelector(
      '[data-type="btn-watched"]',
    );
    btnWatched.classList.remove('current-btn-library');
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
