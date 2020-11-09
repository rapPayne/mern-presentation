import express from 'express';
import bodyParser from 'body-parser';
import { addBook, deleteBook, findBook, updateBook } from './data_access.mjs';

const port = 3001;

const app = express();
app.use(bodyParser.json());

app.get('/books/:isbn', (req, res) => {
  const { isbn } = req.params;
  const book = findBook(isbn);
  if (book) {
    res.status(200).send(book);
  } else {
    res.status(404).send();
  }
});

app.delete('/books/:isbn', (req, res) => {
  const { isbn } = req.params;
  const book = findBook(isbn);
  if (!book) res.status(404).send(`No book found with an ISBN of ${isbn}`);
  deleteBook(isbn);
  res.status(200).send(`Book ${isbn} deleted.`);
})

app.put('/books/:isbn', (req, res) => {
  const { isbn } = req.params;
  const newBook = req.body;
  if ( ! isbn ) res.status(400).send("We need an isbn.")
  if ( ! newBook ) res.status(400).send("We need a book to update.")
  const oldBook = findBook(isbn);
  if ( ! oldBook ) res.status(404).send("No book with that ISBN was found");
  updateBook(isbn, newBook)
  res.status(200).send(`Book ${isbn} was updated`);
});

app.post('/books', (req, res) => {
  const newBook = req.body;
  console.log(req, "POST")
  if (!newBook) res.status(400).send("We need a book to add")
  addBook(newBook);
  res.status(201).send();
})

console.log(`API server starting on http://localhost:${port}`)
app.listen(port);