import loaderTemplate from './loader.hbs';
import refs from '../js/components/refs';
export default function addLoader() {
  refs.loaderRef.insertAdjacentHTML('beforeend', loaderTemplate());
}
