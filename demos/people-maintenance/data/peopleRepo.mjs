import fs from 'fs';
import path from 'path';

let db = {};
let people = [];
const dbFile = path.resolve('./database.json');

fs.readFile(dbFile, (err, data) => {
  if (err) console.log('Error reading database file', err);
  db = JSON.parse(data.toString())
  people = db.people;
});
function getBiggestId() {
  // Assume that the last thing has the biggest ID.
  return people[people.length-1].id;
}

function addPerson(person) {
  const newId = getBiggestId() + 1;
  const newPerson = {...person, id:newId};
  people.push(newPerson);
  saveToDatabase(people);
  return newPerson;
}

function getPeople() {
  return people;
}

function getPerson(id) {
  return people.find(p => p.id === id);
}

function deletePerson(id) {
  people = people.filter(p => p.id !== id);
  saveToDatabase(people);
}

function updatePerson(id, person) {
  const index = people.findIndex(p => p.id === id);
  people[index] = {...person};
  saveToDatabase(people);
}

function saveToDatabase(newPeople) {
  db.people = newPeople
  fs.writeFile(dbFile, JSON.stringify(db), (err, data) => {
    console.log('saved new data to the database');
  })
}

export const peopleRepo = {
  addPerson,
  deletePerson,
  getPeople,
  getPerson,
  updatePerson,
}