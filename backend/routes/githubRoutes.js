const express = require("express");

const router =
  express.Router();

const {
  getUserRepos,
  getRepoPullRequests,
  getPullRequestFiles,
  postPRComment,
} = require(
  "../controllers/githubController"
);

// ==============================
// Repositories
// ==============================
router.get(
  "/repos",
  getUserRepos
);

// ==============================
// Pull Requests
// ==============================
router.get(
  "/repos/:owner/:repo/pulls",
  getRepoPullRequests
);

// ==============================
// PR Files
// ==============================
router.get(
  "/repos/:owner/:repo/pulls/:pullNumber/files",
  getPullRequestFiles
);

// ==============================
// Post AI Comment to PR
// ==============================
router.post(
  "/repos/:owner/:repo/pulls/:pullNumber/comment",
  postPRComment
);

module.exports = router;