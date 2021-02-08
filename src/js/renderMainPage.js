import clearPage from './components/clearPage';
import renderSearchForm from './search/renderSearchForm';
import { setPaginationMainOptions } from './pagination/paginationSettings';
import renderTrendingMovies from './renderTrendingMovies';

export default function renderMainPage(event) {
  event.preventDefault();
  clearPage();

  renderSearchForm();
  setPaginationMainOptions();
  renderTrendingMovies();
}
