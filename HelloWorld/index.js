require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const Note = require("./models/note");

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

const requestLogger = (request, response, next) => {
  console.log("method: ", request.method);
  console.log("path: ", request.path);
  console.log("body: ", request.body);
  console.log("---");
  next();
};

// mongoose.connect(url);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

app.use(requestLogger);

app.get("/", (request, response) => {
  response.send("<h1> Hello World</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  //   console.log(`id`, id);
  Note.findById(id).then((notes) => {
    response.json(notes);
  });
  //   console.log(`note`, note);
});

//! Delete method here
// app.delete("/api/notes/:id", (request, response) => {
//   const id = Number(request.params.id);
//   const note = notes.find((note) => note.id === id);

//   response.status(204).end();
// });

// const generateID = () => {
//   let maxID = notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
//   return maxID + 1;
// };

//* Adding new note
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  // notes = notes.concat(note);
  // console.log(`note:`, note);
  note.save().then((savedNote) => {
    response.json(savedNote);
  });

  // response.json(note);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
// const Note = mongoose.model("Note", noteSchema);
