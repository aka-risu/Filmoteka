import refs from './components/refs';
import filmApiService from './api/filmApiServiceObj';
import modalMovieCard from '../templates/modalMovieCard.hbs';
import renderWatchedList from './Library/renderMyLibrary';
import { myLibraryQueue, myLibraryWatched } from '../js/Library/myLibraryObj';
import manageLibraryMovies from './Library/manageLibraryMovies';

refs.movieListRef.addEventListener('click', handleClickOnMovie);
refs.modalRef.addEventListener('click', manageLibraryMovies);
function handleClickOnMovie(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'LI') return;

  filmApiService.movieID = event.target.id;
  filmApiService.fetchMovieInfo().then(obj => {
    refs.modalRef.insertAdjacentHTML('beforeend', modalMovieCard(obj));
    refs.modalRef.classList.remove('is-hidden');
    console.log(myLibraryWatched);
    if (myLibraryWatched.findMovie(obj.id)) {
      console.log('Hey');
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
  // refs.modalRef.addEventListener('click', handleMyLibraryMovie);
  refs.modalRef.addEventListener('click', closeModal);
  window.addEventListener('keyup', closeModal);
}

function closeModal(event) {
  if (event.target.classList.value === 'overlay' || event.keyCode === 27) {
    refs.modalRef.innerHTML = '';
    refs.modalRef.classList.add('is-hidden');
    refs.bodyRef.classList.remove('modal-open');
    refs.modalRef.removeEventListener('click', closeModal);
    window.removeEventListener('keyup', closeModal);
    // refs.modalRef.removeEventListener('click', handleMyLibraryMovie);
    if (refs.bodyRef.classList.value === 'js-my-library-watched') {
      renderWatchedList();
    }
  }
}
