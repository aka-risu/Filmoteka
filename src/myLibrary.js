export default class MyLibrary {
    constructor() {
      this.moviesList = []  
    }
    addMovie(movieObj) {
        if (this.moviesList.find(obj => obj.id === movieObj.id)) return
        this.moviesList.push(movieObj)
    }
    get movies (){
        return this.moviesList
    }
    set movies(array) {
        this.moviesList = array
    }
}