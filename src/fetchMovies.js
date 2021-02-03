 const API_KEY = "599b2da5737417d6d547b02cdbe7d5e8"

export default class FilmApiService {
    constructor() {
        this.page = 1;
        this.query = "";
        this.totalPages = 20;
        this.movieID = "";
    }
    
    fetchTrendingMovies() {
   
        return fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${this.page}`).then(response => response.json()).then(object => object.results)
    }
    
    fetchMovieByWord() {
        return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${this.query}&language=en-US&page=${this.page}&include_adult=false`).then(response => response.json()).then(obj => {
            // console.log(obj.total_pages)
            // console.log(obj.results)
            this.totalPages = obj.total_pages<20?obj.total_pages:20
            // console.log(this.totalPages)
           return obj.results
        }
            )
    }
    fetchMovieInfo() {
        
        return fetch(`https://api.themoviedb.org/3/movie/${this.movieID}?api_key=${API_KEY}&language=en-US`).then(response => response.json()).then(obj => {
            // console.log(obj.total_pages)
            // console.log(obj)
            // console.log(this.totalPages)
           return obj
        }
            )
    }
    setPage(pageNumber) {
        this.page = pageNumber
    }
}
    
 