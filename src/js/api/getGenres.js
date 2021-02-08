export default function getGenres(array) {
  const API_KEY = '599b2da5737417d6d547b02cdbe7d5e8';

  return fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
  )
    .then(response => response.json())
    .then(result => result.genres)
    .then(genresArray => {
      const genres = array.map(obj => {
        const ids = obj.genre_ids;
        const genresArr = ids.map(
          id => genresArray.find(genreId => genreId.id === id).name,
        );
        // console.log(genres)
        return genresArr;
      });
      // console.log(genres)
      return array.map(function (obj, index) {
        obj.genres = genres[index];

        obj.release = parseInt(obj.release_date);
        return obj;
      });
      // .obj.genres.slice(0, 1);;
    });
}
