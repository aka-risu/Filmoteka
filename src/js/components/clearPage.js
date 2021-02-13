import refs from './refs';
import { hideErrorMessage } from './errorMessage';
function clearPage() {
  refs.searchFormRef.innerHTML = '';
  refs.btnsMyLibrary.innerHTML = '';
  refs.movieListRef.innerHTML = '';
  refs.paginationRef.innerHTML = '';
  // refs.searchFormRef.elements.query.value = '';
  refs.homeLinkRef.classList.remove('current');
  refs.myLibraryLinkRef.classList.remove('current');
  refs.bodyRef.classList.remove('js-my-library-queue');
  refs.bodyRef.classList.remove('js-my-library-watched');
  // hideErrorMessage();
}
export default clearPage;
