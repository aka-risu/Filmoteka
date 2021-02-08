import refs from './refs';
refs.searchFormRef.addEventListener('input', clearError);
function showErrorMessage() {
  refs.errorMessageRef.classList.remove('is-hidden');
}
function hideErrorMessage() {
  refs.errorMessageRef.classList.add('is-hidden');
}
function clearError(e) {
  if (e.target.value === '') hideErrorMessage();
}
export { showErrorMessage, hideErrorMessage, clearError };
