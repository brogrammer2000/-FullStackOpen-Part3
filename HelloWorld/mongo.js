const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(`Please provide the password as an argument: node mongo.js ${password}`);
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.q1oi0.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

//* creating first note
const note = new Note({
  content: "HTML is Okay",
  date: new Date(),
  important: true,
});

//* creating note 2
const note2 = new Note({
  content: "JavaScript is a popular language",
  date: new Date(),
  important: true,
});

//* saving note 1
// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });

//* saving note 2
// note2.save().then((result) => {
//   console.log("note2 saved!");
//   mongoose.connection.close();
// });

//* finding note
Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(`note:`, note);
  });
  mongoose.connection.close();
});
