# Name picker demonstration

In this demo, we'll build a React app that picks one person from a group. 

## Creating the database
Before we begin, you'll need mongoDB. If it isn't installed, go install it.
1. Make sure the DB server is running:  
`$ mongod --dbpath <Path to your db directory>`  
On my system, it is:  
`$ mongod --dbpath $HOME/data/db`
2. Open a new terminal/command window
3. Load all the people: 
(You'll find the names.dat file in the in the starters directory.)  
`$ mongoimport --db=namePicker --collection=people --file=./names.dat`
4. Open the user interface:  
`$ mongo namePicker`
5. Validate that they all got read properly.  
`> db.people.find()`  
You should see all the people from the names.dat file.

## Creating the API server
Still in the server directory, we're going to create the JavaScript files that Node will run. Then we'll fire up the server and test reading from the people collection via an endpoint that we stand up.
1. Create the package.json file  
`$ npm init`  
Answer all the questions as you like.
1. Install the needed libraries:  
`$ npm install express`  
`$ npm install nodemon --save-dev`
2. Create the server script called index.js:
```javascript
import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 3001;
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`API server listening on port ${port}`)
});
```
3. Since we're using ES6-style imports, add this to package.json:  
`"type":"module"`

4. Add this to the scripts section of package.json:  
`"server": "nodemon ./index.js",`
5. Run to start the server:  
`$ npm run server`
6. Tell it to send *something* back when the user hits `GET /api/people/random`
```javascript
app.get("/api/people/random", (req, res) => {
  res.status = 200;
  res.send("Person data here");
});
```
7. Test by hitting that endpoint with cURL or Postman or even a browser.

## Return a random person from the collection
Here we'll read a random person from the people collection and return that person.
1. Install the library that lets you read MongoDB data from a Node script:  
`$ npm install mongodb`
2. *Require* the library
```javascript
import mongodb from 'mongodb'
```
3. Connect to the DB
```javascript
const mongoUrl = 'mongodb://localhost:27017';
let db;
const mongoClient = mongodb.MongoClient;
mongoClient.connect(mongoUrl, (err, client) => {
  if (err) {
    console.error(`Can't connect to ${mongoUrl}: `, err);
  } else {
    console.log(`Connected to ${mongoUrl}`);
    db = client.db("namePicker");
  }
});
```
4. In the app.get() section, read from MongoDB collection.
```javascript
app.get("/api/people/random", (req, res) => {
  db.collection("people").find().toArray((err, people) => {
    if (err) {
      res.status(500).send("Can't read people for some reason.");
    } else {
      const randomPerson = people[Math.floor(Math.random()*people.length)];
      res.status(200).send(randomPerson);
    }
  });
});
```
5. Test it out by hitting localhost:3001/api/people/random a few times.

## Create a React app
We've got the M, the E, and the N. Now let's add the R -- React.
1. Open a __NEW__ terminal/command window. You still need your API server running!
1. Create the app.  
`$ cd <Any directory other than your server directory>`  
`$ npx create-react-app client`  
This'll take a minute or two.
2. Create a new component called RandomPerson.
```javascript
export const RandomPerson = () => {
  let person = {name: "Test person"};
  return (
    <>
      <h1>Our lucky person is ...</h1>
      <p>{person.name}</p>
    </>
  )
}
```
3. Host RandomPerson in <App />
```javascript
function App() {
  return (
    <>
      <RandomPerson />
    </>
  );
}
```
4. Run it:  
`$ npm run start`  
Make sure you can see "Test Person" as our chosen person.

## Fetch the API data from your React component
If your client app is served from port 3000 and requests Ajax data from port 3001, the browser will refuse because it is a cross-origin request. Let's fix that by telling the web server to proxy API requests to our Node/Express/Mongo server.
1. Add this to the first level of the package.json file:
```json
"proxy": "http://localhost:3001",
```
Now we can write our React app to fetch data from it.

2. Add a couple of hooks to RandomPerson:
```javascript
import { useEffect, useState } from 'react';
```
3. When this component loads, go fetch the random person.
```javascript
// Note: Delete the test person you had previously.
const [person, setPerson] = useState({})
useEffect(() => {
  fetch(`/api/people/random`)
  .then(res => res.json())
  .then(randomPerson => setPerson(randomPerson));
}, []);
```
4. Test it by refreshing.