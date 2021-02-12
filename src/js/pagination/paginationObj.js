import Pagination from './paginator';
import movieCard from '../../templates/movieCard.hbs';

const paginationOptions = {
  currentPage: 1,
  pages: 20,
  template: movieCard,
  container: '.movies-list',
  paginationContainer: '.pagination',
  buttonsShown: 5,
  fullArray: true,
};
export default new Pagination(paginationOptions);
