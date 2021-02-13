import refs from './refs';

refs.searchFormRef.addEventListener('input', clearError);
function showErrorMessage() {
  const errorMessage = document.querySelector('.error-message');
  errorMessage.classList.remove('is-hidden');
}
function hideErrorMessage() {
  const errorMessage = document.querySelector('.error-message');
  errorMessage.classList.add('is-hidden');
}
function clearError(e) {
  if (e.target.value === '') hideErrorMessage();
}
export { showErrorMessage, hideErrorMessage, clearError };
