import refs from '../components/refs';
import filmApiService from '../api/filmApiServiceObj';
import pagination from '../pagination/paginationObj';
import { showErrorMessage, hideErrorMessage } from '../components/errorMessage';

refs.searchFormRef.addEventListener('submit', searchMovies);

function searchMovies(event) {
  console.log(event);
  event.preventDefault();
  console.log(event.currentTarget.elements.query.value);
  filmApiService.query = event.currentTarget.elements.query.value;
  pagination.currentPage = 1;

  renderMovieSearch();
}

function renderMovieSearch() {
  pagination.callback = renderMovieSearch;
  console.log(pagination);
  const page = pagination.currentPage ? pagination.currentPage : 1;

  filmApiService.fetchMovieByWord(page).then(array => {
    if (array.length === 0) {
      console.log('bebe');
      showErrorMessage();
      console.log('bebe');
      return;
    }
    hideErrorMessage();
    pagination.pages = filmApiService.totalPages;
    pagination.create(array);
  });
}

export default searchMovies;
