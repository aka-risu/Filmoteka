import { puzzle } from 'jigsaw-puzzle';
// import picture from './Header.jpg';
import picture from '../../images/photo.jpeg';

// P.newGame(); // start over
// P.getState(); // save game
// P.setState(state); // load game
// P.destroy(); // kill puzzle
const el = document.querySelector('.modal-footer');
const init = async el =>
  await puzzle({
    element: el,
    pieces: { x: 2, y: 2 },
    // draggable: false,
    image: picture,
  });

// init(el);
export default init;
