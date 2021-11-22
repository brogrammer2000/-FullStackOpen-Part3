const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

// app.use(morgan("tiny"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateID = () => {
  let id = Math.floor(Math.random() * 100);
  return id;
};

app.get("/", morgan("tiny"), (request, response) => {
  response.send("<h1> Hello World</h1>");
});

app.get("/api/persons", morgan("tiny"), (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", morgan("tiny"), (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", morgan("tiny"), (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

app.post(
  "/api/persons",
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
  (request, response) => {
    const body = request.body;
    morgan.token("body", (req) => JSON.stringify(req.body));

    const newPerson = {
      id: generateID(),
      name: body.name,
      number: body.number,
    };

    if (!body.name || !body.number) {
      return response.status(400).json({ error: " name or number is missing" });
    } else if (persons.some((p) => p.name === body.name)) {
      return response.status(403).json({ error: " name must be unique" });
    }

    persons = persons.concat(newPerson);
    response.json(newPerson);
  }
);

app.get("/info", morgan("tiny"), (request, response) => {
  const numberofpeople = persons.length;
  const date = new Date();
  response.send(`<p>Phonebook has info for ${numberofpeople} people</p>
  <p> ${date}</p>`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});
