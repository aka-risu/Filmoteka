export default class ModalWindow {
  constructor({ wrapper, content, button }) {
    this.refs = this.findRefs(wrapper);
    this.content = content;
    this.button = button ? button : false;
    this.createModal();

    // this.modal = this.refs.wrapper.querySelector('.modal');
  }
  findRefs = container => {
    return {
      // wrapper: document.querySelector(`${container}`),
      openRef: document.querySelector(`[data-action="open-footer-modal"]`),
      modalRef: document.querySelector(`${container}`),
      bodyRef: document.querySelector('body'),
    };
  };
  createModal() {
    const contentWithBtn = `<div class="overlay">
          <div class="modal-window">
          <button class="close-modal" data-action="close-modal"></button>
      ${this.content}
          </div>
        </div>`;
    const content = `<div class="overlay">
          <div class="modal-window">
          ${this.content}
          </div>
        </div>`;

    const modal = this.button ? contentWithBtn : content;

    // console.log(this.refs.openRef);
    // this.refs.modalRef.classList.add('js-modal');
    this.refs.modalRef.insertAdjacentHTML('beforeend', modal);
    this.refs.modalRef.classList.add('is-hidden');
    this.refs.openRef.addEventListener('click', this.openModal.bind(this));
  }
  openModal() {
    this.refs.modalRef.classList.add('js-modal');
    this.refs.modalRef.classList.remove('is-hidden');
    this.refs.bodyRef.classList.add('modal-open');
    window.addEventListener('click', this.closeModal.bind(this));
    window.addEventListener('keyup', this.closeModal.bind(this));
  }

  closeModal(event) {
    if (
      event.target.classList.value === 'overlay' ||
      event.keyCode === 27 ||
      event.target.dataset.action === 'close-modal'
    ) {
      this.refs.modalRef.classList.remove('js-modal');
      this.refs.modalRef.classList.add('is-hidden');
      this.refs.bodyRef.classList.remove('modal-open');
      window.removeEventListener('click', this.closeModal);
      window.removeEventListener('keyup', this.closeModal);
    }
  }
}
