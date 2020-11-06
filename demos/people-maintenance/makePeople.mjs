import fs from 'fs';
import countryTools from './country-tools.cjs';
const { getAllCountries } = countryTools;

import nameTools from './random-name-tools.js';
const getRandomName = nameTools.getRandomName;

import streetAddressTools from './random-street-getter.js';
const getRandomStreetAddress = streetAddressTools.getRandomStreetAddress;

import { getRandomCity, getRandomState, getRandomPostcode } from './random-address-tools.mjs';

import emailTools from './random-email-getter.mjs';
const { getRandomEmail } = emailTools; 

import phoneTools from './random-phone-tools.js';
const { getRandomPhone } = phoneTools;

/* Create the database file */
const databaseFilename = `./database.json`;
fs.writeFileSync(databaseFilename, JSON.stringify({people: {}, countries: {}}))

/* Gather country data */
getAllCountries()
.then(countries => {
  const db = JSON.parse(fs.readFileSync(databaseFilename).toString());
  db.countries = countries;
  fs.writeFileSync(databaseFilename, JSON.stringify(db));
})
.catch(err => console.error("Writing countries messed up", err))

/*
Node script to create ...
Rap - X Random people
Frank - Random first and last name (given a gender)
Angela - Random phone number and cell number
Andre - Random City, State, Postcode
Evan - Random Street address
Corrine - Random email address
*/

const people = [];
const howManyPeople = 170;

for (let i = 1; i <= howManyPeople; i++) {
  const person = {};
  person.id = i;
  person.gender = getRandomGender();
  person.name = getRandomName(person.gender);
  person.phone = getRandomPhone();
  person.cell = getRandomPhone();
  person.location = {}
  person.location.street = getRandomStreetAddress();
  person.location.city = getRandomCity();
  person.location.state = getRandomState();
  person.location.postcode = getRandomPostcode();
  person.email = getRandomEmail();
  people.push(person);
}

// Put the people in the database file
const db = JSON.parse(fs.readFileSync(databaseFilename).toString());
db.people = people;
fs.writeFileSync(databaseFilename, JSON.stringify(db));

function getRandomGender() {
  const randomNumber = Math.random();
  if (randomNumber > 0.5)
    return "female"
  else
    return "male"
}