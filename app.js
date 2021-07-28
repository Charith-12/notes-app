const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");

//const validator = require("validator");

// const myNotes = getNotes();
// console.log(myNotes);
// console.log(getNotes());
// console.log(validator.isEmail("@ee.com"));
// console.log(chalk.red.inverse.bold("This is ERROR text"));

yargs.version("1.1.0");

// Add command
yargs.command({
  command: "add",
  describe: "Add a new Note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: "true",
      type: "string",
    },
    body: {
      describe: "Note Body",
      demandOption: "true",
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
    // console.log("Title : " + argv.title);
    // console.log("Body : " + argv.body);
  },
});

// Remove command
yargs.command({
  command: "remove",
  describe: "Remove a  Note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: "true",
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

// List Command
yargs.command({
  command: "list",
  describe: "Listing Notes",
  handler() {
    notes.listNotes();
  },
});

// Read Command
yargs.command({
  command: "read",
  describe: "Read Notes",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: "true",
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

yargs.parse();
//console.log(yargs.argv);

// const add = require('./utils.js')
// const sum = add(4, -2)
// console.log(sum)
