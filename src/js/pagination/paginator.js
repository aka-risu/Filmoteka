export default class Pagination {
  constructor({
    currentPage,
    pages,
    template,
    itemsOnPage,
    container,
    paginationContainer,
    buttonsShown,
    fullArray,
    callback,
  }) {
    this.currentPage = parseInt(currentPage);
    this.itemsOnPage = itemsOnPage ? itemsOnPage : 20;
    this.pages = pages ? parseInt(pages) : 0;
    this.template = template;

    this.refs = this.findRefs(container, paginationContainer);
    this.buttonsShown = buttonsShown ? buttonsShown : 5;
    this.fullArray = fullArray ? fullArray : false;
    this.callback = callback;
    // this.refs.paginationContainerRef.addEventListener('click', event =>
    //   this.handlePaginationClick(event, this.currentPage, this.callback),
    // );
  }
  updatePages() {
    this.pages = Math.ceil(this.items.length / this.itemsOnPage);
  }
  findRefs = (container, paginationContainer) => {
    return {
      containerRef: document.querySelector(`${container}`),
      paginationContainerRef: document.querySelector(`${paginationContainer}`),
    };
  };
  create(items) {
    this.items = items;
    this.pages = this.fullArray
      ? parseInt(this.pages)
      : Math.ceil(this.items.length / this.itemsOnPage);
    this.setUpPagination(
      this.items,
      this.refs.paginationContainerRef,
      this.pages,
      this.currentPage,
      this.buttonsShown,
    );
    this.displayList(
      this.items,
      this.refs.containerRef,
      this.template,
      this.pages,
      this.currentPage,
      this.itemsOnPage,
    );

    this.refs.paginationContainerRef.removeEventListener('click', this.click);
    this.refs.paginationContainerRef.addEventListener('click', this.click);
  }
  click = event => {
    this.handlePaginationClick(event, this.currentPage, this.callback);
  };
  currentPage(currentPage) {
    this.currentPage = currentPage;
  }

  displayList(items, wrapper, template, pages, currentPage, itemsOnPage) {
    wrapper.innerHTML = '';
    const pageItems = this.fullArray
      ? this.items
      : items.slice((currentPage - 1) * itemsOnPage, currentPage * itemsOnPage);
    const moviesShown = template(pageItems);
    wrapper.insertAdjacentHTML('beforeend', moviesShown);
  }

  setUpPagination(items, wrapper, pages, currentPage, buttonsShown) {
    currentPage = parseInt(currentPage);

    wrapper.innerHTML = '';

    if (pages <= 1) {
      let btn = paginationButton(currentPage, 1);
      wrapper.appendChild(btn);
      btn.dataset.index = 1;
      return;
    }

    addLeftBtn(wrapper, pages);
    addFirstButton(currentPage, wrapper);

    if (currentPage >= buttonsShown) {
      addSeparator(wrapper);
    }

    let start = currentPage <= 3 ? 2 : currentPage - 2;
    let btnShown = 2;

    switch (currentPage) {
      case 1:
        btnShown = 2;
        break;
      case 2:
        btnShown = 3;
        break;
      case 3:
        btnShown = 4;
        break;
      default:
        btnShown = 5;
    }

    for (let j = 0; j < btnShown; j++) {
      if (start > pages - 1) {
        break;
      }
      let btn = paginationButton(currentPage, start);

      wrapper.appendChild(btn);

      btn.dataset.index = start;
      start++;
    }

    if (currentPage <= pages - 4) {
      addSeparator(wrapper);
    }

    addLastButton(wrapper, currentPage, pages);
    addRightBtn(wrapper, pages);

    function addSeparator(wrapper) {
      let dots = document.createElement('button');
      dots.innerText = '...';
      wrapper.appendChild(dots);
      dots.disabled = true;
    }
    function addLeftBtn(wrapper, pages) {
      if (pages > 5) {
        navigationButton(wrapper, '', 'left');
      }
    }
    function addRightBtn(wrapper, pages) {
      if (pages > 5) {
        navigationButton(wrapper, '', 'right');
      }
    }
    function addLastButton(wrapper, currentPage, pages) {
      let lastBtn = paginationButton(currentPage, pages);
      wrapper.appendChild(lastBtn);
      lastBtn.dataset.index = pages;
    }
    function addFirstButton(currentPage, wrapper) {
      let firstBtn = paginationButton(currentPage, 1);
      wrapper.appendChild(firstBtn);
      firstBtn.dataset.index = 1;
    }
    function paginationButton(currentPage, page) {
      let button = document.createElement('button');
      button.innerText = page;
      if (currentPage === page) {
        button.classList.add('active');
      }
      return button;
    }
    function navigationButton(wrapper, text, type) {
      let navButton = document.createElement('button');
      navButton.innerText = text;
      wrapper.appendChild(navButton);
      navButton.classList.add(`${type}-button`);
    }
  }

  handlePaginationClick(event, currentPage, callback) {
    if (event.target.nodeName !== 'BUTTON') {
      return;
    }
    //   filmApiService.setPage(1);
    if (event.target.classList.value === 'left-button') {
      if (currentPage <= 1) {
        event.target.disabled = true;
        return;
      }
      this.currentPage = this.currentPage - 1;
    } else if (event.target.classList.value === 'right-button') {
      if (currentPage >= this.pages) {
        event.target.disabled = true;
        return;
      }
      this.currentPage = parseInt(this.currentPage) + 1;
      // filmApiService.setPage(parseInt(filmApiService.page) + 1);
    } else {
      const page = event.target.dataset.index;
      this.currentPage = page;
      // filmApiService.setPage(page);
    }
    console.log('handlePaginationClick');
    callback();
  }
}
