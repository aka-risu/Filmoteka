import refs from '../components/refs';

function renderSearchForm() {
  const searchForm = `<input class="search-input" type="text" name="query" autocomplete="off" placeholder="Search for movies"><button class="search-button" type="submit"></button> <p class="error-message is-hidden">
        Search result not successful. Enter the correct movie name
      </p>`;
  refs.searchFormRef.insertAdjacentHTML('beforeend', searchForm);
}
export default renderSearchForm;
