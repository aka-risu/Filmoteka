export default class ModalWindow {
  constructor({ wrapper, content }) {
    this.refs = this.findRefs(wrapper);
    this.content = content;
    this.createModal();
    // this.modal = this.refs.wrapper.querySelector('.modal');
  }
  findRefs = container => {
    return {
      wrapper: document.querySelector(`${container}`),
      openRef: document.querySelector(`[data-action="open-footer-modal"]`),
      modalRef: document.querySelector('.modal-footer'),
      bodyRef: document.querySelector('body'),
    };
  };
  createModal() {
    const modal = `<div class="overlay">
          <div class="modal-window">
      <div>${this.content}<div>
          </div>
        </div>`;
    // console.log(this.refs.openRef);
    this.refs.modalRef.insertAdjacentHTML('beforeend', modal);
    this.refs.modalRef.classList.add('is-hidden');
    this.refs.openRef.addEventListener('click', this.openModal.bind(this));
  }
  openModal(event) {
    this.refs.modalRef.classList.remove('is-hidden');
    this.refs.bodyRef.classList.add('modal-open');
    window.addEventListener('click', this.closeModal.bind(this));
    window.addEventListener('keyup', this.closeModal.bind(this));
  }

  closeModal(event) {
    if (event.target.classList.value === 'overlay' || event.keyCode === 27) {
      this.refs.modalRef.classList.add('is-hidden');
      this.refs.bodyRef.classList.remove('modal-open');
      this.refs.wrapper.removeEventListener('click', this.closeModal);
      window.removeEventListener('keyup', this.closeModal);
    }
  }
}
