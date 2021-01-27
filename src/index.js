import './styles.css';
import './fetchMovies';
import FilmApiService from './fetchMovies';
import getGenres from './getGenres';
import movieCard from './movieCard.hbs'

const refs = {
    movieListRef: document.querySelector(".movies-list"),
    homeRef: document.querySelector(".navigation-home"),
    myLibraryRef: document.querySelector(".navigation-my-library"),
    searchFormRef: document.querySelector(".search-form"),
    errorMessageRef: document.querySelector(".error-message"),
}
const filmApiService = new FilmApiService
filmApiService.fetchMovies().then(array => getGenres(array)).then(array => {
    console.log(array)
   refs.movieListRef.insertAdjacentHTML('beforeend', movieCard(array))
})