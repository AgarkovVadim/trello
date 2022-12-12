const lists = document.querySelectorAll('.lists');
const btns = document.querySelectorAll('.add-btn');
const addBtns = document.querySelectorAll('.add-item-btn');
const cancelBtns = document.querySelectorAll('.cansel-item-btn');
const textareas = document.querySelectorAll('.textarea');
const forms = document.querySelectorAll('.form');
const buttons = document.querySelectorAll('.buttons');
const listItems = document.querySelectorAll('.list-item');
const newBoard = document.querySelector('.add-board-btn');
let value;

btns.forEach((btn, key) => {
    btn.addEventListener('click', () => {
        textareas[key].style.display = 'block';
        cancelBtns[key].style.display = 'block'
        btns[key].style.display = 'none';
        textareas[key].addEventListener('input', (event) => {
            value = event.target.value
            if (value) {
                addBtns[key].style.display = 'block';
            } else {
                addBtns[key].style.display = 'none';
            };
        });
    });
});

cancelBtns.forEach((cancelBtns, key) => {
    cancelBtns.addEventListener('click', () => {
        textareas[key].value = '';
        textareas[key].style.display = 'none';
        cancelBtns.style.display = 'none';
        addBtns[key].style.display = 'none';
        btns[key].style.display = 'block';
    });
});

addBtns.forEach((addBtns, key) => {
    addBtns.addEventListener('click', function () {
        const newItem = document.createElement('div');
        newItem.classList.add('list-item');
        newItem.draggable = true;
        newItem.id = idGenerator();
        newItem.textContent = value;
        lists[key].append(newItem);
        value = '';
        textareas[key].value = '';
        textareas[key].style.display = 'none';
        cancelBtns[key].style.display = 'none';
        addBtns.style.display = 'none';
        btns[key].style.display = 'block';
        newItem = null;
        dragNdrop();
    });
});

newBoard.addEventListener('click', () => {
    const boards = document.querySelector('.boards');
    const board = document.createElement('div');
    board.classList.add("board-item");
    board.draggable = 'true';
    board.innerHTML = `<span class="tittle" contenteditable="true">Введите название доски</span>
    <div class="lists">
    <div class='list-item' draggable="true" >Название</div>
    </div>`;
    boards.append(board);
    dragNdrop();
    changeTitle();
});

function idGenerator() {
    const idItems = document.querySelectorAll('.list-item');
    let newId;
    const id = [];
    for (let i = 0; i < idItems.length; i++) {
        let isId = idItems[i].id;
        id.push(isId);
    }
    id.sort(function (a, b) {
        return a - b;
    });
    newId = id[id.length - 1];
    newId = Number(newId) + 1;
    return newId;
};

function changeTitle() {
    const tittles = document.querySelectorAll('.tittle');
    tittles.forEach(tittle => {
        tittle.addEventListener('click', e => e.target.textContent = '');
    });
};

let draggedItem = null;
function dragNdrop() {
    const listItems = document.querySelectorAll('.list-item');
    const lists = document.querySelectorAll('.lists');
    for (let i = 0; i < listItems.length; i++) {
        const item = listItems[i];

        item.addEventListener('dragstart', () => {
            draggedItem = item;
            setTimeout(() => {
                item.style.display = 'none';
            }, 0);
        });

        item.addEventListener('dragend', () => {
            setTimeout(() => {
                item.style.display = 'block';
                draggedItem = null;
            }, 0);
        });

        item.addEventListener('dblclick', () => {
            item.remove();
        });

        for (let j = 0; j < lists.length; j++) {
            const list = lists[j];
            list.addEventListener('dragover', (e) => e.preventDefault());

            list.addEventListener('dragover', function (e) {
                e.preventDefault();
                this.style.backgroundColor = 'rgba(0,0,0,.4)';
            });

            list.addEventListener('dragleave', function (e) {
                e.preventDefault();
                this.style.backgroundColor = '';
            });

            list.addEventListener('drop', function (e) {

                this.style.backgroundColor = '';
                this.append(draggedItem);
            });
        };
    };
};

dragNdrop();
changeTitle();