// const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
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
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  //   console.log(`id`, id);
  const note = notes.find((note) => {
    // console.log(note.id, typeof note.id, id, typeof id, note.id === id);
    return note.id === id;
  });
  //   console.log(`note`, note);
  if (note) {
    response.json(note);
  } else {
    app.use(unknownEndpoint);
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  response.status(204).end();
});

const generateID = () => {
  let maxID = notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
  return maxID + 1;
};

app.post("/api/notes", (request, response) => {
  if (!body.content) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = {
    content: request.body,
    important: note.important || false,
    date: new Date(),
    id: generateID(),
  };

  notes = notes.concat(note);
  console.log(`note:`, note);

  response.json(note);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});
