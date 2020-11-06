const malefirstnames = ["Joe", "Larry", "Curly", "Smoe", "Charlie", "Jerry", "Buddy", "Gene", "Red"]
const femalefirstnames = require('./raw-data/given-names.json');
const lastnames = require('./raw-data/family-names.json');

function Getmalename() {
  return malefirstnames[Math.floor(Math.random() * malefirstnames.length)]
};
function Getfemalename() {
  return femalefirstnames[Math.floor(Math.random() * femalefirstnames.length)]
}
function Getlastname() {
  return lastnames[Math.floor(Math.random() * lastnames.length)]
}

function getRandomName(gender) {
  let firstname = "";
  let lastname = "";
  if (gender === "male") {
    firstname = Getmalename();
  } else {
    firstname = Getfemalename();
  }
  lastname = Getlastname();
  return {
    first: firstname,
    last: lastname,
  };


}

module.exports = { getRandomName:getRandomName };