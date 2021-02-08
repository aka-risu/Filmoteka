import 'normalize.css';
import './styles.scss';
import refs from './js/components/refs';
import './js/search/search';
import renderMyLibrary from './js/Library/handleMyLibrary';
import renderMainPage from './js/renderMainPage';
import modal from './js/modal';

window.addEventListener('DOMContentLoaded', renderMainPage);
refs.homeRef.addEventListener('click', renderMainPage);
refs.logoRef.addEventListener('click', renderMainPage);
refs.myLibraryRef.addEventListener('click', renderMyLibrary);
