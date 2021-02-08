import pagination from './pagination/paginationObj';
import filmApiService from './api/filmApiServiceObj';

function renderTrendingMovies() {
  pagination.callback = renderTrendingMovies;
  const page = pagination.currentPage ? pagination.currentPage : 1;

  filmApiService
    .fetchTrendingMovies(page)
    .then(array => pagination.create(array));
}
export default renderTrendingMovies;
