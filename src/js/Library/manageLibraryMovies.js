import 

function manageMyLibraryMovie(event) {
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
