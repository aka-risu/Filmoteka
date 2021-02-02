import './styles.css';
import './fetchMovies';
import FilmApiService from './fetchMovies';
import getGenres from './getGenres';
import createPagination from "./paginator";
import modalMovieCard from "./modalMovieCard.hbs";


const refs = {
    movieListRef: document.querySelector(".movies-list"),
    homeRef: document.querySelector(".navigation-home"),
    myLibraryRef: document.querySelector(".navigation-my-library"),
    searchFormRef: document.querySelector(".search-form"),
    errorMessageRef: document.querySelector(".error-message"),
    paginationRef: document.querySelector(".pagination"),
    modalRef: document.querySelector(".js-modal"),
    bodyRef: document.querySelector("body"),
}


const filmApiService = new FilmApiService
filmApiService.fetchTrendingMovies().then(array => getGenres(array)).then(array => {
    // filmApiService.setPage(1)
    createPagination(array, filmApiService.page, filmApiService.totalPages)
    // const paginator = document.querySelector(".pagination")
    // paginator.addEventListener("click", handleSearch)
    // paginator.removeEventListener("click", handleSearch )
    // return pagID
})
    // .finally(paginator.removeEventListener("click", handleSearch))

// createPagination(filmApiService.fetchTrendingMovies().then(array => getGenres(array)), filmApiService.page)
const paginator = document.querySelector(".pagination")
paginator.addEventListener("click", trendingSearch)
refs.searchFormRef.addEventListener("submit", search)
refs.movieListRef.addEventListener("click", handleClickOnMovie)
refs.modalRef.addEventListener("click", closeModal)

function trendingSearch(event) {
    // filmApiService.setPage(1)
  handleSearch(event, getTrendingMovies)
}
function handleSearch(event, callback) {
        // console.log(filmApiService.page)
        // console.dir(event.target.classList.value)
    // paginator.removeEventListener("click", searchFilms)
    
    if (event.target.nodeName !== "BUTTON") {
        // console.log(":(")
        return
    }
        if (event.target.classList.value === 'left-button') {
        if (filmApiService.page <= 1) return
           filmApiService.setPage(filmApiService.page-1)
        } else if (event.target.classList.value === 'right-button') {
            if (filmApiService.page >= filmApiService.totalPages) return
            filmApiService.setPage(parseInt(filmApiService.page)+1)
        } else {
            const page = event.target.dataset.index
            // console.log(page)
        filmApiService.setPage(page)
        }
                console.log(filmApiService.page)
     callback()
}
    
function getTrendingMovies() {
filmApiService.fetchTrendingMovies().then(array => getGenres(array)).then(array => {
        createPagination(array, filmApiService.page, filmApiService.totalPages)
        })    
}
function searchMovies() {
filmApiService.fetchMovieByWord().then(array => getGenres(array)).then(array => {
        createPagination(array, filmApiService.page, filmApiService.totalPages)
        })
}
function search(e) {

    e.preventDefault()
    filmApiService.setPage(1)
    
    filmApiService.query = e.currentTarget.elements.query.value
    // paginator.removeEventListener("click", event => handleSearch(event, getTrendingMovies()))
    paginator.removeEventListener("click", trendingSearch)
    paginator.removeEventListener("click", searchFilms)
    paginator.addEventListener("click", searchFilms)
    
    console.log(filmApiService.query)
    searchMovies()
    
//    return filmApiService.fetchMovieByWord().then(array => getGenres(array)).then(array => {
//         createPagination(array, filmApiService.page)
//         })
}
function searchFilms(event) {
    return  handleSearch(event, searchMovies)
}
function handleClickOnMovie(event) {
    event.preventDefault()
    if (event.target.nodeName !== "A") return

    console.log(event.target.id)
    filmApiService.movieID = event.target.id
    filmApiService.fetchMovieInfo().then(obj => {
        refs.modalRef.innerHTML = ""
        refs.modalRef.insertAdjacentHTML('beforeend', modalMovieCard(obj))
        console.log(obj)
        refs.modalRef.classList.remove("is-hidden")
    })
    console.dir(event.target.classList.value)
    refs.bodyRef.classList.add("modal-open")
    // if(event.target.class)
// .then(console.log(r))
}
function closeModal(event) {
    //  event.preventDefault()
    if (event.target.classList.value !== "overlay") return
    refs.modalRef.classList.add("is-hidden")
    refs.bodyRef.classList.remove("modal-open")
}
    