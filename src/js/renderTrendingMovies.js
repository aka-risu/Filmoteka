import pagination from './pagination/paginationObj';
import filmApiService from './api/filmApiServiceObj';
import addLoader from '../loader/loader';
import refs from './components/refs';
function renderTrendingMovies() {
  // addLoader();
  pagination.callback = renderTrendingMovies;
  const page = pagination.currentPage ? pagination.currentPage : 1;
  const loader = addLoader;
  filmApiService
    .fetchTrendingMovies(page)
    // .then((refs.loaderRef.innerHTML = ''))
    .then(array => pagination.create(array));
  // .finally((refs.loaderRef.innerHTML = ''));
}
export default renderTrendingMovies;
