import clearPage from './components/clearPage';
import renderSearchForm from './search/renderSearchForm';
import { setPaginationMainOptions } from './pagination/paginationSettings';
import renderTrendingMovies from './renderTrendingMovies';
import refs from './components/refs';

export default function renderMainPage(event) {
  event.preventDefault();
  clearPage();
  refs.headerRef.classList.add('header-bg-home');
  refs.headerRef.classList.remove('header-bg-lib');
  renderSearchForm();
  setPaginationMainOptions();
  renderTrendingMovies();
}
