//random city state postcode
export function getRandomCity(){
  const cities = ["New York", "ATL", "LA"]
  const randomnumber = Math.floor(Math.random()*cities.length);
  const city = cities [randomnumber];
  return city 
}
export function getRandomState(){
  const states = ["New York", "New Jersey", "Georgia"]
  const randomnumber = Math.floor(Math.random()*states.length);
  const state = states [randomnumber];
  return state;
}
export function getRandomPostcode(){
  const postcodes = ["21001","21002","07747"]
  const randomnumber = Math.floor(Math.random()*postcodes.length);
  const postcode = postcodes [randomnumber];
  return postcode
}

// module.exports = {
//   getRandomCity:getRandomCity, 
//   getRandomState:getRandomState, 
//   getRandomPostcode:getRandomPostcode};