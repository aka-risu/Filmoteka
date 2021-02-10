import { myLibraryQueue, myLibraryWatched } from './myLibraryObj';
import filmApiService from '../api/filmApiServiceObj';

function manageMyLibraryMovie(event) {
  if (event.target.dataset.action !== 'add') return;

  //   localStorage.setItem(
  //     'moviesWatchedList',
  //     JSON.stringify(myLibraryWatched.movies),
  //   );
  const localQueueMovies = localStorage.getItem('moviesQueueList');
  myLibraryQueue.movies = JSON.parse(localQueueMovies);
  const localWatchedMovies = localStorage.getItem('moviesWatchedList');
  myLibraryWatched.movies = JSON.parse(localWatchedMovies);

  if (event.target.classList.value === 'btn-remove-watched') {
    myLibraryWatched.deleteMovie(filmApiService.movieID);
    setLocalStorage('moviesWatchedList', myLibraryWatched);
    // localStorage.setItem(
    //   'moviesWatchedList',
    //   JSON.stringify(myLibraryWatched.movies),
    // );
    handleButton(event, 'watched', 'add');
  } else if (event.target.classList.value === 'btn-add-watched') {
    filmApiService.fetchMovieInfo().then(obj => {
      myLibraryWatched.addMovie(obj);
      setLocalStorage('moviesWatchedList', myLibraryWatched);
      //     localStorage.setItem(
      //     'moviesWatchedList',
      //     JSON.stringify(myLibraryWatched.movies),
      //   );
      handleButton(event, 'watched', 'remove');
    });
  }
  if (event.target.classList.value === 'btn-remove-queue') {
    console.log(filmApiService.movieID);
    myLibraryQueue.deleteMovie(filmApiService.movieID);
    setLocalStorage('moviesQueueList', myLibraryQueue);
    // localStorage.setItem(
    //   'moviesQueueList',
    //   JSON.stringify(myLibraryQueue.movies),
    // );
    handleButton(event, 'queue', 'add');
  } else if (event.target.classList.value === 'btn-add-queue') {
    filmApiService.fetchMovieInfo().then(obj => {
      myLibraryQueue.addMovie(obj);
      setLocalStorage('moviesQueueList', myLibraryQueue);
      //   localStorage.setItem(
      //     'moviesQueueList',
      //     JSON.stringify(myLibraryQueue.movies),
      //   );

      handleButton(event, 'queue', 'remove');
    });
  }
}
function setLocalStorage(name, array) {
  localStorage.setItem(name, JSON.stringify(array.movies));
}
function handleButton(event, button, action) {
  const addAction = action === 'add' ? 'add' : 'remove';
  const removeAction = action === 'add' ? 'remove' : 'add';
  event.target.textContent = `${addAction} from ${button}`;
  event.target.classList.remove(`btn-${removeAction}-${button}`);
  event.target.classList.add(`btn-${addAction}-${button}`);
}
export default manageMyLibraryMovie;
