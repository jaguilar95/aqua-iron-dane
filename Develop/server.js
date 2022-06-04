const express = require("express");
const app = express();
const notesRoutes = require("./routes/htmlRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use("/", htmlRoutes);
app.use("/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server now on port ${PORT}!`);
});
