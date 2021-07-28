const fs = require("fs");
const chalk = require("chalk");

const listNotes = () => {
  console.log(chalk.blue.inverse("-- YOUR NOTES --"));
  const notes = loadNotes();

  if (notes.length > 0) {
    notes.forEach((note) => {
      console.log(chalk.blue(note.title));
    });
  } else {
    console.log(chalk.blue("You have no notes"));
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.yellow.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse("No note found with that name"));
  }
};

const addNote = (title, body) => {
  const notes = loadNotes();
  console.log(notes);

  const duplicateNote = notes.find((note) => note.title === title); // if returns true that obj is added to duplicateNotes array

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log(chalk.green.inverse("A new note added yo...!!"));
    console.log(notes);
  } else {
    console.log(chalk.red.inverse("Note title taken!!!"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const removeNote = (title) => {
  //console.log(title);
  const notes = loadNotes();
  console.log(notes);

  const remainingNotes = notes.filter((note) => note.title !== title); // if returns true that obj is added to remainingNotes array

  if (notes.length > remainingNotes.length) {
    console.log(chalk.green.inverse("Note Deleted...!!"));
    saveNotes(remainingNotes);
    console.log(remainingNotes);
  } else {
    console.log(chalk.red.inverse("Invalid note title! please check again"));
  }
};

module.exports = {
  listNotes: listNotes,
  addNote: addNote,
  removeNote: removeNote,
  readNote: readNote,
};
