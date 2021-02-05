import { template } from 'handlebars';
import movieCard from './movieCard.hbs';
export default function createPagination(items, currentPage, pages = 0, template) {
const list_element = document.getElementById('movies-list')
const pagination_element = document.getElementById('pagination')

let current_page = currentPage
let rows = 20
    let page_count = pages === 0 ? Math.ceil(items.length / rows) : pages    
    // console.log(page_count)
    DisplayList(items, list_element, template)
    // if (items.length === 0)
SetUpPagination(items, pagination_element, page_count)
    
function DisplayList(items, wrapper, template) {
    wrapper.innerHTML = ""
    wrapper.insertAdjacentHTML('beforeend', template(items))

}
    function SetUpPagination(items, wrapper, page_count) {
    // console.log(pages)
    wrapper.innerHTML = ""
    // let page_count = Math.ceil(items.length / rows_per_page)
    // let page_count = pages
    let pages_shown = 5
    let currentPage = parseInt(current_page)
    
        if (page_count <= 1) {
            let btn = PaginationButton(1);
            wrapper.appendChild(btn);
            btn.dataset.index = 1
            return
        }
        if (page_count > 5) {
            navigationButton(wrapper, "<", "left")
        }
    let firstBtn = PaginationButton(1, items)
    wrapper.appendChild(firstBtn)
    firstBtn.dataset.index = 1

    if (currentPage >= pages_shown) {
        let dots = document.createElement('button')
        dots.innerText = "..."
        wrapper.appendChild(dots)
        dots.disabled = true
    }
    let start = currentPage <= 3 ? 2 : currentPage - 2
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
   
    for (let j = 0; j < btnShown; j++){ 
        if (start > page_count-1) {break}
        let btn = PaginationButton(start);
        
        wrapper.appendChild(btn);
        
        btn.dataset.index = start
        start++
    }
    if (currentPage <= page_count-4) {
        let dots = document.createElement('button')
    dots.innerText = "..."
    wrapper.appendChild(dots)
    dots.disabled = true
    }
    let lastBtn = PaginationButton(page_count)
    wrapper.appendChild(lastBtn)
    lastBtn.dataset.index = page_count
    if (page_count > 5) {
          navigationButton(wrapper, ">", "right")
    }
        } 
function navigationButton (wrapper, text, type) {
let navButton = document.createElement('button')
    navButton.innerText = text
    wrapper.appendChild(navButton);
    navButton.classList.add(`${type}-button`)
}
function PaginationButton(page) {
    let button = document.createElement('button')
    button.innerText = page
    if (current_page == page) {
        button.classList.add('active')
    }
return button
}

}