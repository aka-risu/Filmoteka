import refs from '../components/refs';

function createMyLibraryButtons() {
  const buttons = `<button class="btn-watched" data-type="btn-watched">Watched</button><button class="btn-queue" data-type="btn-queue">Queue</button>`;
  refs.btnsMyLibrary.insertAdjacentHTML('beforeend', buttons);
}
export default createMyLibraryButtons;
