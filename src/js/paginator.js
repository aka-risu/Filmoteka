export default class Pagination {
  constructor(
    // items,
    {
      // items,
      currentPage,
      pages,
      template,
      rows,
      container,
      paginationContainer,
      pagesShown,
      fullArray,
    },
  ) {
    // this.items = [];
    this.currentPage = parseInt(currentPage);
    this.rows = rows ? rows : 20;
    if (!pages) {
      this.pages = 0;
    } else
      this.pages = pages
        ? parseInt(pages)
        : Math.ceil(this.items.length / rows);
    this.template = template;

    this.refs = this.findRefs(container, paginationContainer);
    this.pagesShown = pagesShown ? pagesShown : 5;
    this.fullArray = fullArray ? fullArray : false;
  }
  findRefs = (container, paginationContainer) => {
    return {
      containerRef: document.querySelector(`${container}`),
      paginationContainerRef: document.querySelector(`${paginationContainer}`),
    };
  };
  create(items) {
    this.items = items;
    this.pages = this.pages
      ? parseInt(this.pages)
      : Math.ceil(this.items.length / this.rows);
    this.setUpPagination(
      this.items,
      this.refs.paginationContainerRef,
      this.pages,
      this.currentPage,
      this.pagesShown,
    );
    this.displayList(
      this.items,
      this.refs.containerRef,
      this.template,
      this.pages,
      this.currentPage,
      this.rows,
    );
  }
  currentPage(currentPage) {
    this.currentPage = currentPage;
  }
  //   container = document.getElementById('movies-list');
  //   paginationContainer = document.getElementById('pagination');

  //   current_page = currentPage;
  //   rows = 20;
  //   page_count = pages === 0 ? Math.ceil(items.length / rows) : pages;

  //   displayList(this.items, container, template);
  // if (items.length === 0)
  //   SetUpPagination(items, paginationContainer, page_count);

  displayList(items, wrapper, template, pages, currentPage, rows) {
    wrapper.innerHTML = '';

    //   const moviesShown = template(items)

    //   for (i = 0; i < pages; i++) {

    const pageItems = this.fullArray
      ? this.items
      : items.slice((currentPage - 1) * rows, currentPage * rows);
    //   }
    const moviesShown = template(pageItems);
    wrapper.insertAdjacentHTML('beforeend', moviesShown);
  }
  setUpPagination(items, wrapper, pages, currentPage, pagesShown) {
    // console.log(parseInt(currentPage));
    currentPage = parseInt(currentPage);
    // console.log(pages)
    wrapper.innerHTML = '';
    // let page_count = Math.ceil(items.length / rows_per_page)
    // let page_count = pages
    // let pagesShown = 5;
    // let currentPage = parseInt(this.currentPage);

    if (pages <= 1) {
      let btn = this.paginationButton(currentPage, 1);
      wrapper.appendChild(btn);
      btn.dataset.index = 1;
      return;
    }
    if (pages > 5) {
      this.navigationButton(wrapper, '<', 'left');
    }
    let firstBtn = this.paginationButton(currentPage, 1);
    wrapper.appendChild(firstBtn);
    firstBtn.dataset.index = 1;

    if (currentPage >= pagesShown) {
      let dots = document.createElement('button');
      dots.innerText = '...';
      wrapper.appendChild(dots);
      dots.disabled = true;
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
      let btn = this.paginationButton(currentPage, start);

      wrapper.appendChild(btn);

      btn.dataset.index = start;
      start++;
    }
    if (currentPage <= pages - 4) {
      let dots = document.createElement('button');
      dots.innerText = '...';
      wrapper.appendChild(dots);
      dots.disabled = true;
    }
    let lastBtn = this.paginationButton(currentPage, pages);
    wrapper.appendChild(lastBtn);
    lastBtn.dataset.index = pages;
    if (pages > 5) {
      this.navigationButton(wrapper, '>', 'right');
    }
  }
  navigationButton(wrapper, text, type) {
    let navButton = document.createElement('button');
    navButton.innerText = text;
    wrapper.appendChild(navButton);
    navButton.classList.add(`${type}-button`);
  }
  paginationButton(currentPage, page) {
    let button = document.createElement('button');
    button.innerText = page;
    if (currentPage === page) {
      button.classList.add('active');
    }
    return button;
  }
}
