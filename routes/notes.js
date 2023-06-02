const notes = require('express').Router();

const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const db = require("../db/notes.json");
const fs = require("fs");
let notesData = db;
// GET Route for retrieving all the notes
notes.get('/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI note
notes.post('/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNotes = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNotes, './db/notes.json');
    res.json(`Notes added successfully 🚀`);
  } else {
    res.error('Error in adding notes');
  }
});

notes.delete("/notes/:id", (req, res) => {
  const Delete = req.params.id;
  notesData = notesData.filter((note) => note.id !== Delete);

  const notesString = JSON.stringify(notesData);

  fs.writeFile(`./db/notes.json`, notesString, (err) => {
    err ? console.log(err) : console.log(`New note for has been saved!`);
    res.send();
  });
});


module.exports = notes;
