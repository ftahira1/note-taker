const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');

// import routes/index.js
const routes = require('./routes/index'); // index.js is implied

// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

const PORT = 5555;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// include routes into our app
app.use('/', routes);

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

