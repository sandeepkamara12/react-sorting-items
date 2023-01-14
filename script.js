const dragable_list = document.getElementById('dragable-list');
const check = document.getElementById('check');

const people = [
    'sandeep',
    'deepak',
    'anshdeep',
    'shilpa'
];

const listItems = [];
let dragStartIndex;

createList();

function createList() {
    [...people]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((name, index) => {
            let listItem = document.createElement('li');

            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `<span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
            <p class="person-name">${name}</p>
            <i class="fas fa-grip-lines"></i>
            </div>`;

            listItems.push(listItem);

            dragable_list.appendChild(listItem);
        })
    addEventListeners();
}
function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}
function dragEnter() {
    this.classList.add('over');
}
function dragLeave() {
    this.classList.remove('over');
}
function dragOver(e) {
    e.preventDefault();
}
function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}
// Check the order of list items
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();

        if (personName !== people[index]) {
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}
function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.dragable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    })
    dragListItems.forEach(item => {
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
    })
}
check.addEventListener('click', checkOrder);