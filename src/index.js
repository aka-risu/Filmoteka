import 'normalize.css';
import './styles.scss';
import refs from './js/components/refs';
import './js/search/search';
import renderMyLibrary from './js/Library/renderMyLibrary';
import renderMainPage from './js/renderMainPage';
import footerModal from './js/footer/footerModal';
import modal from './js/modal';
import puzzle from './js/puzzle/puzzle';

window.addEventListener('DOMContentLoaded', renderMainPage);
refs.homeRef.addEventListener('click', renderMainPage);
refs.logoRef.addEventListener('click', renderMainPage);
refs.myLibraryRef.addEventListener('click', renderMyLibrary);
