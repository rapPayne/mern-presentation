

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function getRandomStreetAddress() {
  const addressNumbers = [`1337`, `8675309`, `145`, `65535`]
  const number = addressNumbers[randomInteger(0, addressNumbers.length)]
  const streetNames = [`Bagel Explosion Ave.`, `Confused Walrus St.`, `Turn Back Now Death Is Imminent Blvd.`, `Why Are You Here? Ct.`]
  const street = streetNames[randomInteger(0, streetNames.length)]
  return { number, name: street }
}

module.exports.getRandomStreetAddress = getRandomStreetAddress;