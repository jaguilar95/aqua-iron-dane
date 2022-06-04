const express = require("express");
const router = express.Router();
const notesRoutes = require("./notesRoutes");

router.use(notesRoutes);

module.exports = router;
