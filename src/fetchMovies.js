 const API_KEY = "599b2da5737417d6d547b02cdbe7d5e8"

export default class FilmApiService {
    constructor() {
        this.page = 1
    }
    
fetchMovies() {
   
   return fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=2`).then(response => response.json()).then(object => object.results)
}
}
    
 