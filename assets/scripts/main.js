let library = [];
const addButton = document.querySelector('#addButton');

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  }
}

for (let i=0; i < 10; i++) {
  let booook = new Book(`title${i}`, `author${i}`, i);
  library.push(booook);
}

function addBookToLibrary() {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read');

  const book = new Book(title, author, pages, read);
  library.push(book);
  return library;
}
