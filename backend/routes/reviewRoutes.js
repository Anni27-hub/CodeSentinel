const express = require("express");

const router = express.Router();

const {
  getReviews,
  deleteReview,
  exportPDF,
} = require("../controllers/reviewController");

// Get all reviews
router.get("/", getReviews);

// Export PDF
router.get("/:id/pdf", exportPDF);

// Delete review
router.delete("/:id", deleteReview);

module.exports = router;