import mongodb from 'mongodb';
const url = "mongodb://localhost:27017/biblio_db";
let dbpool;

mongodb.MongoClient.connect(url, (err, client) => {
  if (err) {
    console.error("Couldn't connect to the database!")
  } else {
    dbpool = client.db('biblio_db');
  }
})
// let books = [];
// books[100] = {isbn:100, title:"Jaws", price: 14.95};

//export const findBook = isbn => books[isbn];
export const findBook = (isbn, callback) => {
  const coll = dbpool.collection("books");
  coll.find({ isbn: isbn }).toArray((err, books) => {
    if (err) {
      callback(err);
    } else {
      callback(undefined, books[0]);
    }
  })

}
// export const updateBook = (isbn,book) => books[isbn] = book;
export const updateBook = (isbn, book, callback) => {
  const coll = dbpool.collection("books");
  coll.updateOne({ isbn: isbn }, {$set: {
    isbn: isbn,
    title: book.title,
    price: book.price,
  }},
    callback);
}
//export const addBook = (book) => books[book.isbn] = book;
export const addBook = (book, callback) => {
  const coll = dbpool.collection("books");
  coll.insertOne(book, (err, newBook) => {
    if (err) {
      callback(err);
    } else {
      callback(undefined, newBook.ops[0])
    }
  });
}
//export const deleteBook = isbn => books = books.filter(b => b.isbn !== isbn)
export const deleteBook = (isbn, callback) => {
  
}