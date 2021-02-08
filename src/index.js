import 'normalize.css';
import './styles.scss';
import refs from './js/components/refs';
import './js/search/search';
import './js/Library/handleMyLibrary';
import renderMainPage from './js/renderMainPage';
import modal from './js/modal';

window.addEventListener('DOMContentLoaded', renderMainPage);
refs.homeRef.addEventListener('click', renderMainPage);
