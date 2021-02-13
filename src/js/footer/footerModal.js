import Modal from './Modal';
import puzzle from '../puzzle/puzzle';

const options = {
  wrapper: '.modal-footer',
  content: '',
  button: true,
  onOpen: puzzle,
};
const footerModal = new Modal(options);

export default footerModal;
