import loaderTemplate from './loader.hbs';
import refs from '../js/components/refs';
import camera from './img/camera.png';
import film from './img/film.png';
export default function addLoader() {
  console.log('Loader');
  refs.loaderRef.insertAdjacentHTML(
    'beforeend',
    loaderTemplate({ camera, film }),
  );
  console.log('Loader2');
}
//  addLoader;
