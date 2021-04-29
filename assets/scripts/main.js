const addBookButton = document.querySelector('.addBook');
const openFormButton = document.querySelector('.addNewBook');
const bookForm = document.querySelector('.form');
const table = document.querySelector('tbody');

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}

let library = [];
const setLibraryStorage = () => localStorage.setItem('library', JSON.stringify(library));
const getLibraryStorage = () => JSON.parse(localStorage.getItem('library'));

if (getLibraryStorage() === null) {
  library.push(new Book('Offerkind', 'Rob Ruggenberg', 294));
  library.push(new Book('IJzerkop', 'Rob Jean-Claude van Rijckeghem', 367));
  library.push(new Book('Meerminnen Verdrinken Niet', 'Saskia Maaskant', 213));
  library.push(new Book('Trigo limpio', 'Juan Manuel Gil', 392));
  library.push(new Book('Confessions on the 7:45', 'Lisa Unger ', 368));
} else {
  library = getLibraryStorage();
}

const checkRead = (book, checkBox) => {
  if (book.read === true) {
    checkBox.checked = true;
  } else {
    checkBox.checked = false;
  }
};

const displayBook = (book) => {
  const tableRow = document.createElement('tr');
  const title = document.createElement('td');
  const author = document.createElement('td');
  const pages = document.createElement('td');
  const readCheck = document.createElement('td');
  const checkBox = document.createElement('input');
  const deleteAction = document.createElement('td');
  const link = document.createElement('a');

  deleteAction.setAttribute('data-attribute', library.indexOf(book));
  checkBox.setAttribute('data-index', library.indexOf(book));
  link.className = 'delete-item';
  checkBox.type = 'checkbox';
  checkRead(book, checkBox);

  title.appendChild(document.createTextNode(book.title));
  author.appendChild(document.createTextNode(book.author));
  pages.appendChild(document.createTextNode(book.pages));
  readCheck.appendChild(checkBox);
  link.innerHTML = '<i class="far fa-trash-alt"></i>';
  deleteAction.appendChild(link);

  tableRow.append(title, author, pages, readCheck, deleteAction);
  table.appendChild(tableRow);
};

for (let i = 0; i < library.length; i += 1) {
  displayBook(library[i]);
}

const clearTable = () => {
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
};

const updateTable = () => {
  library = getLibraryStorage();
  for (let i = 0; i < library.length; i += 1) {
    displayBook(library[i]);
  }
};

const addBookToLibrary = () => {
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const pages = document.querySelector('#pages');

  const book = new Book(title.value, author.value, pages.value);
  library.push(book);
  setLibraryStorage();

  title.value = '';
  author.value = '';
  pages.value = '';

  bookForm.classList.add('hide-form');
  displayBook(library[library.length - 1]);
};

const deleteBookFromLibrary = (e) => {
  if (e.target.parentElement.classList.contains('delete-item')) {
    const bookIndex = e.target.parentElement.parentElement.getAttribute('data-attribute');
    library.splice(Number(bookIndex), 1);
    setLibraryStorage();
    clearTable();
    updateTable();
  }
};

const openAddBookForm = () => {
  bookForm.classList.remove('hide-form');
};

const updateRead = (e) => {
  library = getLibraryStorage();
  if (e.target.getAttribute('data-index')) {
    const bookIndex = e.target.getAttribute('data-index');
    const book = library[bookIndex];

    if (e.target.checked === true) {
      book.read = true;
    } else if (e.target.checked === false) {
      book.read = false;
    }
    setLibraryStorage();
  }
};

// event liteners
openFormButton.addEventListener('click', openAddBookForm);
addBookButton.addEventListener('click', addBookToLibrary);
table.addEventListener('click', deleteBookFromLibrary);
table.addEventListener('click', updateRead);
