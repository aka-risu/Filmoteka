export default class MyLibrary {
    constructor() {
      this.moviesList = []  
    }
    addMovie(movieObj) {
        if (this.moviesList.find(obj => obj.id === movieObj.id)) return
        this.moviesList.push(movieObj)
    }
    deleteMovie(movieId) {
        const index = this.moviesList.findIndex(obj => parseInt(obj.id) === parseInt(movieId))
        console.log(index)
        this.moviesList.splice(index, 1)
    }
    findMovie(movieId) {
      return this.moviesList.find(obj => obj.id === movieId)
    }
    get movies(){
        return this.moviesList
    }
    set movies(array) {
        this.moviesList = array
    }
}