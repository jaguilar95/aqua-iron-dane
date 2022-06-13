const notes = require("../../db/db.json");
const router = require("express").Router();
const fs = require("fs");
const path = require("path");

router.get("/notes", (req, res) => {
  res.json(notes);
});

router.post("/notes", (req, res) => {
  // add id based on array length
  req.body.id = notes.length.toString();

  const noteData = req.body;

  // validate response
  if (!noteData.title || typeof noteData.title !== "string") {
    res.status(400).send("The note is not properly formatted.");
  }

  if (!noteData.text || typeof noteData.text !== "string") {
    res.status(400).send("The note is not properly formatted.");
  }

  // add current note to notes array
  notes.push(noteData);

  // save updated notes array to db.json
  fs.writeFileSync(
    path.join(__dirname, "../../db/db.json"),
    JSON.stringify(notes, null, 2)
  );

  // send current note as response
  res.json({ message: "note successfully added", note: noteData });
});

router.delete("/notes/:id", (req, res) => {
  // validate delete request
  const currentNote = notes.filter((note) => note.id === req.params.id)[0];

  if (!currentNote) {
    res.status(404).send({ error: "Note not found" });
  }

  // create new array with selected note deleted
  const filteredNotes = notes.filter((note) => note.id !== req.params.id);

  fs.writeFileSync(
    path.join(__dirname, "../../db/db.json"),
    JSON.stringify(filteredNotes, null, 2)
  );

  res.json({ message: "note deleted", note: currentNote });
});

module.exports = router;
