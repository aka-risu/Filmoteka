import pagination from './pagination/paginationObj';
import filmApiService from './api/filmApiServiceObj';
import addLoader from '../loader/loader';
import refs from './components/refs';
function renderTrendingMovies() {
  // window.addEventListener('load', clearLoader);
  // addLoader();
  pagination.callback = renderTrendingMovies;
  const page = pagination.currentPage ? pagination.currentPage : 1;
  const loader = addLoader;
  filmApiService
    .fetchTrendingMovies(page)
    // .then((refs.loaderRef.innerHTML = ''))
    .then(array => {
      pagination.create(array);
      // window.addEventListener('load', clearLoader);
      // if (document.readyState == 'complete') {
      //   clearLoader();
      // }
      // setTimeout(clearLoader, 3000);
    });
  function clearLoader() {
    refs.loaderRef.innerHTML = '';
  }
  // .then((refs.loaderRef.innerHTML = ''));
  // .finally((refs.loaderRef.innerHTML = ''));
}
export default renderTrendingMovies;
