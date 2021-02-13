import pagination from './paginationObj';
// import libraryMovieCard from '../../templates/myLibraryMovie.hbs';
import movieCard from '../../templates/movieCard.hbs';
import checkScreenWidth from '../components/checkScreenWidth';

function setPaginationLibraryOptions() {
  pagination.fullArray = false;
  pagination.itemsOnPage = 3;
  pagination.currentPage = 1;
  pagination.template = movieCard;
  setNumberOfPaginationButtons();
}
function setPaginationMainOptions() {
  pagination.fullArray = true;
  pagination.itemsOnPage = '';
  pagination.pages = 20;
  pagination.currentPage = 1;
  pagination.template = movieCard;
  setNumberOfPaginationButtons();
}
function setNumberOfPaginationButtons() {
  pagination.buttonsShown = checkScreenWidth() < 768 ? 3 : 5;
}
export { setPaginationLibraryOptions, setPaginationMainOptions };
