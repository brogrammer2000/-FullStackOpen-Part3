require("dotenv").config({ path: "./.env" });
const mongoose = require("mongoose");

const url =
  "mongodb+srv://fullstack:Brogrammer2000@cluster0.q1oi0.mongodb.net/note-app?retryWrites=true&w=majority";
console.log("connecting to..", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to mongoDB");
  })
  .catch((error) => console.log("error connecting to MongoDB", error.message));

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  priority: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
