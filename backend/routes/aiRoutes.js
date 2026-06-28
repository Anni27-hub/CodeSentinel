const express = require("express");

const router = express.Router();

const {
  analyzeCode,
} = require("../controllers/aiController");

router.post("/review", analyzeCode);

module.exports = router;