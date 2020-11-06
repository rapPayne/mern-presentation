//random email addresses
import fs from 'fs';

const mailServersString = fs.readFileSync('./raw-data/mail-servers.json', 'utf8');
const mailServers = JSON.parse(mailServersString);

function getRandomEmail() {
  return getRandomEmailName() + '@' + getrandomserver();
}
function getrandomserver() {
  const randomnumber = Math.floor(Math.random() * mailServers.length);
  return mailServers[randomnumber]
}
function getRandomLetter() {
  const letters = "aaaeeeiiiooouuuabcdefghijklmnopqrstuvwxyz1234567890".split("");
  return letters[Math.floor(Math.random() * letters.length)];
}
function getRandomEmailName() {
  const randomLetters = [];
  for (let i = 0; i < 10; i++) {
    const rand = getRandomLetter()
    randomLetters.push(rand);
  }
  return randomLetters.join("");
}

//module.exports = { getRandomEmail };
export default { getRandomEmail };