let books = [];

books[100] = {isbn:100, title:"Jaws", price: 14.95};

export const findBook = isbn => books[isbn];
export const updateBook = (isbn,book) => books[isbn] = book;
export const addBook = (book) => books[book.isbn] = book;
export const deleteBook = isbn => books = books.filter(b => b.isbn !== isbn)