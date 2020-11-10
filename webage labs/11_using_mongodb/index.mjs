import express from 'express';
import bodyParser from 'body-parser';
import { addBook, deleteBook, findBook, updateBook } from './data_access.mjs';

const port = 3001;

const app = express();
app.use(bodyParser.json());

app.get('/books/:isbn', (req, res) => {
  const { isbn } = req.params;
  findBook(isbn, (err, book) => {
    if (err) {
      const mesg = "Error getting a book."
      console.error(`${mesg}`, err);
      res.status(500).send(`${mesg} Check the logs for details.`);
      return;
    }
    if (book) {
      res.status(200).send(book);
    } else {
      res.status(404).send();
    }
  });
});

app.delete('/books/:isbn', (req, res) => {
  const { isbn } = req.params;
  findBook(isbn, (err, book) => {
    if (err) {
      const mesg = "Error getting a book."
      console.error(`${mesg}`, err);
      res.status(500).send(`${mesg} Check the logs for details.`);
      return;
    }
    if (!book) {
      res.status(404).send("No book with that ISBN so nothing to delete.");
      return;
    }
    deleteBook(isbn, (err, book) => {
      if (err) {
        const mesg = "Error deleting a book."
        console.error(`${mesg}`, err);
        res.status(500).send(`${mesg} Check the logs for details.`);
        return;
      }
      res.status(200).send(book);
      return;
    });
  });
});

  app.put('/books/:isbn', (req, res) => {
    const { isbn } = req.params;
    const newBook = req.body;
    if (!isbn) {
      res.status(400).send("We need an isbn.")
      return;
    }
    if (!newBook) {
      res.status(400).send("We need a book to update.")
      return;
    }

    findBook(isbn, (err, book) => {
      if (err) {
        const mesg = "Error getting a book."
        console.error(`${mesg}`, err);
        res.status(500).send(`${mesg} Check the logs for details.`);
        return;
      }
      if (!book) {
        res.status(404).send("No book with that ISBN. :-(");
        return;
      }
      updateBook(isbn, newBook, (err, book) => {
        if (err) {
          const mesg = "Error updating a book."
          console.error(`${mesg}`, err);
          res.status(500).send(`${mesg} Check the logs for details.`);
          return;
        }
        res.status(200).send(book);
        return;
      });
    });
  });

  app.post('/books', (req, res) => {
    const newBook = req.body;
    if (!newBook) {
      res.status(400).send("We need a book to add");
      return;
    }
    addBook(newBook, (err, addedBook) => {
      if (err) {
        const mesg = "Error adding a book."
        console.error(`${mesg}`, err);
        res.status(500).send(`${mesg} Check the logs for details.`);
        return;
      }
      res.status(201).send(addedBook);
      return;
    });
  })

  console.log(`API server starting on http://localhost:${port}`)
  app.listen(port);