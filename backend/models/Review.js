const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  repository: {
    type: String,
    required: true,
  },

  pullRequest: {
    type: Number,
    required: true,
  },

  overallScore: Number,

  securityScore: Number,

  performanceScore: Number,

  maintainabilityScore: Number,

  readabilityScore: Number,

  riskLevel: String,

  summary: String,

  issues: [
    {
      severity: String,

      message: String,

      suggestion: String,
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", reviewSchema);