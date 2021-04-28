const library = [];
const addBookButton = document.querySelector('.addBook');
const openFormButton = document.querySelector('.addNewBook');
const bookForm = document.querySelector('.form');

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}

for (let i = 0; i < 10; i += 1) {
  const booook = new Book(`title${i}`, `author${i}`, i);
  library.push(booook);
}

const addBookToLibrary = () => {
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const pages = document.querySelector('#pages');
  const read = document.querySelector('#read');

  const book = new Book(title.value, author.value, pages.value, read);
  library.push(book);

  title.value = '';
  author.value = '';
  pages.value = '';

  bookForm.classList.add('hide-form');
};

const openAddBookForm = () => {
  bookForm.classList.remove('hide-form');
};

// event liteners
openFormButton.addEventListener('click', openAddBookForm);
addBookButton.addEventListener('click', addBookToLibrary);
