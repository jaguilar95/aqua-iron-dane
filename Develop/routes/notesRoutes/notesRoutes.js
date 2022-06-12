const notes = require("../../db/db.json");
const router = require("express").Router();
const fs = require("fs");
const path = require("path");

router.get("/api/notes", (req, res) => {
  res.json(notes);
});

router.post("/api/notes", (req, res) => {
  req.body.id = notes.length.toString();

  const noteData = req.body;

  if (!noteData.title || typeof noteData.title !== "string") {
    res.status(400).send("The note is not properly formatted.");
  }

  if (!noteData.text || typeof noteData.text !== "string") {
    res.status(400).send("The note is not properly formatted.");
  }

  notes.push(noteData);

  fs.writeFileSync(
    path.join(__dirname, "../../db/db.json"),
    JSON.stringify(notes, null, 2)
  );

  res.json(noteData);
});

module.exports = router;
