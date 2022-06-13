const express = require("express");
const router = express.Router();
const notesRoutes = require("./notesRoutes");

router.use("/api", notesRoutes);

module.exports = router;
