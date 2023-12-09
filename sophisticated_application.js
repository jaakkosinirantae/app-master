/**
 * Filename: sophisticated_application.js
 * 
 * Description: This code demonstrates a sophisticated application that manages a library system
 * It includes features such as:
 *   - Adding books to the library
 *   - Borrowing and returning books
 *   - Searching and filtering books
 *   - Tracking book history and statistics
 * 
 * Note: This is a simplified version of a library system and serves as a demonstration.
 *       It is not meant to be a complete and functioning system.
 */

// Library constructor function
function Library(name) {
  this.name = name;
  this.books = [];
  this.borrowedBooks = [];
  this.borrowHistory = {};
}

// Book constructor function
function Book(title, author, genre) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.available = true;
}

// Library prototype methods
Library.prototype.addBook = function(book) {
  this.books.push(book);
};

Library.prototype.borrowBook = function(book) {
  if (book.available) {
    book.available = false;
    this.borrowedBooks.push(book);
    this.updateBorrowHistory(book.title);
    console.log(`Successfully borrowed "${book.title}" by ${book.author}`);
  } else {
    console.log(`Sorry, "${book.title}" is currently not available.`);
  }
};

Library.prototype.returnBook = function(book) {
  book.available = true;
  this.borrowedBooks = this.borrowedBooks.filter(b => b !== book);
  console.log(`Successfully returned "${book.title}" by ${book.author}`);
};

Library.prototype.updateBorrowHistory = function(title) {
  if (!(title in this.borrowHistory)) {
    this.borrowHistory[title] = {
      count: 1,
      lastBorrowed: new Date().toUTCString(),
    };
  } else {
    const history = this.borrowHistory[title];
    history.count++;
    history.lastBorrowed = new Date().toUTCString();
  }
};

Library.prototype.filterBooks = function(filterFunc) {
  return this.books.filter(filterFunc);
};

Library.prototype.searchBooks = function(query) {
  query = query.toLowerCase();
  return this.books.filter(
    book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genre.toLowerCase().includes(query)
  );
};

// Create a library
const myLibrary = new Library("My Library");

// Add books to the library
myLibrary.addBook(new Book("The Great Gatsby", "F. Scott Fitzgerald", "Fiction"));
myLibrary.addBook(new Book("To Kill a Mockingbird", "Harper Lee", "Fiction"));
myLibrary.addBook(new Book("1984", "George Orwell", "Dystopian"));
myLibrary.addBook(new Book("Pride and Prejudice", "Jane Austen", "Romance"));

// Borrow a book
myLibrary.borrowBook(myLibrary.books[0]);

// Return the borrowed book
myLibrary.returnBook(myLibrary.borrowedBooks[0]);

// Filter books by genre
const filteredBooks = myLibrary.filterBooks(book => book.genre === "Fiction");
console.log("Filtered Books:", filteredBooks);

// Search books by title, author, or genre
const searchedBooks = myLibrary.searchBooks("gatsby");
console.log("Searched Books:", searchedBooks);

// Console log library's borrow history
console.log("Borrow History:", myLibrary.borrowHistory);