const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;

const mongoUrl = 'mongodb://localhost:27017';
let db;
mongoClient.connect(mongoUrl, (err, client) => {
  if (err) {
    console.error(`Can't connect to ${mongoUrl}: `, err);
  } else {
    console.log(`Connected to ${mongoUrl}`);
    db = client.db("namePicker");
  }
});

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.get("/api/people/random", (req, res) => {
  db.collection("people").find().toArray((err, people) => {
    if (err) {
      console.error("Can't read people!", err);
      res.status(500).send("Can't read people for some reason.");
    } else {
      const randomPerson = people[Math.floor(Math.random()*people.length)];
      res.status(200).send(randomPerson);
    }
  });
});

app.listen(port, () => {
  console.log(`API server listening on port ${port}`)
});