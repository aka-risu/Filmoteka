import pagination from './paginationObj';
import libraryMovieCard from '../../templates/myLibraryMovie.hbs';
import movieCard from '../../templates/movieCard.hbs';
function setPaginationLibraryOptions() {
  pagination.fullArray = false;
  pagination.itemsOnPage = 3;
  pagination.currentPage = 1;
  pagination.template = libraryMovieCard;
}
function setPaginationMainOptions() {
  pagination.fullArray = true;
  pagination.itemsOnPage = '';
  pagination.pages = 20;
  pagination.currentPage = 1;
  pagination.template = movieCard;
}
export { setPaginationLibraryOptions, setPaginationMainOptions };
