export default class ModalWindow {
  constructor({ wrapper, content }) {
    this.refs = this.findRefs(wrapper);
    this.content = content;
  }
  findRefs = container => {
    return {
      wrapper: document.querySelector(`${container}`),
    };
  };
  openModal() {
    const modal = `<div class="modal">
      
        <div class="overlay">
          <div class="modal-window">
      <div>${this.content}<div>
          </div>
        </div>
      </div>`;
    this.refs.wrapper.insertAdjacentHTML('beforeend', modal);
  }
}
