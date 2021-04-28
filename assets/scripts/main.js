const library = [];
const addBookButton = document.querySelector('.addBook');
const openFormButton = document.querySelector('.addNewBook');
const bookForm = document.querySelector('.form');
const table = document.querySelector('table');

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}

for (let i = 0; i < 10; i += 1) {
  const booook = new Book(`title${i}`, `author${i}`, (i*2)+85+i);
  library.push(booook);
}

const displayBook = (book) => {
  const tableRow = document.createElement('tr');
  const title = document.createElement('td');
  const author = document.createElement('td');
  const pages = document.createElement('td');
  const readCheck = document.createElement('td');
  const checkBox = document.createElement('input');

  title.appendChild(document.createTextNode(book.title));
  author.appendChild(document.createTextNode(book.author));
  pages.appendChild(document.createTextNode(book.pages));
  checkBox.type = 'checkbox';
  readCheck.appendChild(checkBox);

  tableRow.append(title, author, pages, readCheck);
  table.appendChild(tableRow);
};

const addBookToLibrary = () => {
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const pages = document.querySelector('#pages');

  const book = new Book(title.value, author.value, pages.value, read);
  library.push(book);

  title.value = '';
  author.value = '';
  pages.value = '';

  bookForm.classList.add('hide-form');
  displayBook(library[library.length - 1]);
};

const openAddBookForm = () => {
  bookForm.classList.remove('hide-form');
};

for (let i = 0; i < library.length; i += 1) {
  displayBook(library[i]);
}

// event liteners
openFormButton.addEventListener('click', openAddBookForm);
addBookButton.addEventListener('click', addBookToLibrary);
