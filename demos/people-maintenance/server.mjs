import * as http from 'http';
import * as os from 'os';
import path from 'path';
import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import { peopleRepo } from './data/peopleRepo.mjs';

const __dirname = path.resolve('.');

const port = "8124";
//Get express started.
const server = express();
server.use(express.urlencoded({extended: true}));
server.use(express.json());

// Send all people
server.get('/api/people', (req, res) => {
  res.json(peopleRepo.getPeople());
});

// Get one person at a time by id
server.get('/api/people/:id', (req, res) => {
  const id = +req.params.id;
  const person = peopleRepo.getPerson(id);
  if (person)
    res.json(person);
  else
    res.status(404).send(`No person with an id of ${id}`)
});

// Delete a person
server.delete('/api/people/:id', (req, res) => {
  const id = +req.params.id;
  console.log("someone is deleting person", id);
  peopleRepo.deletePerson(id);
  res.status(200).send();
});

// Add a person
server.post('/api/people', (req, res) => {
  const person = req.body;
  console.log("someone is addding", person);
  const newPerson = peopleRepo.addPerson(person);
  res.json(newPerson);
});

server.put('/api/people/:id', (req, res) => {
  const id = +req.params.id;
  const body = req.body;
  const person = body;
  console.log(`someone is updating person ${id}`, person);
  const newPerson = peopleRepo.updatePerson(id, person);
  res.json(newPerson);
});

// Serve all the static assets like pages, images, and so forth
server.use(express.static(path.join(__dirname, 'public')));

server.listen(port, 'localhost');
console.log(`Server is running on port ${port}`);