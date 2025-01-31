// routes/wordRoutes.js
const express = require("express");
const router = express.Router();
const wordController = require("../controllers/wordController");

router.get("/gematria/:value", wordController.getByGematriaValue);
// router.get("/words", wordController.getAllWords);

module.exports = router;
