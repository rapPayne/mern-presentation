const fetch = require('node-fetch');

function getAllCountries() {
  const url = `https://restcountries.eu/rest/v2/all`;
  return fetch(url)
  .then(res => res.json());
}

module.exports = { getAllCountries }