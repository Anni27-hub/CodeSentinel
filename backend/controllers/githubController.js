const axios = require("axios");

// ==============================
// Fetch User Repositories
// ==============================
const getUserRepos = async (req, res) => {
  console.log("GITHUB USER:", req.user);
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    // CHANGE TO THIS
    const response = await axios.get("https://api.github.com/user/repos", {
      headers: {
        Authorization: `Bearer ${req.user.accessToken}`,
      },
      params: {
        per_page: 100,
        sort: "updated",
        affiliation: "owner,collaborator,organization_member",
        visibility: "all", // ← add this
      },
    });

    res.json(response.data);
  } catch (error) {
    console.log("FULL ERROR:", error.response?.data || error.message);

    res.status(500).json({
      message: "Failed to fetch repositories",
    });
  }
};

// ==============================
// Fetch Pull Requests
// ==============================
const getRepoPullRequests = async (req, res) => {
  try {
    const { owner, repo } = req.params;

    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/pulls`,
      {
        headers: {
          Authorization: `Bearer ${req.user.accessToken}`,
        },
      },
    );

    res.json(response.data);
  } catch (error) {
    console.log("FULL ERROR:", error.response?.data || error.message);

    res.status(500).json({
      message: "Failed to fetch pull requests",
    });
  }
};

// ==============================
// Fetch PR Files
// ==============================
const getPullRequestFiles = async (req, res) => {
  try {
    const { owner, repo, pullNumber } = req.params;

    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/files`,
      {
        headers: {
          Authorization: `Bearer ${req.user.accessToken}`,
        },
      },
    );

    res.json(response.data);
  } catch (error) {
    console.log("FULL ERROR:", error.response?.data || error.message);

    res.status(500).json({
      message: "Failed to fetch PR files",
    });
  }
};

// ==============================
// Post Comment on PR
// ==============================
const postPRComment = async (req, res) => {
  try {
    const { owner, repo, pullNumber } = req.params;
    const { comment } = req.body;

    if (!req.user?.accessToken) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    if (!comment) {
      return res.status(400).json({
        message: "Comment is required",
      });
    }

    const response = await axios.post(
      `https://api.github.com/repos/${owner}/${repo}/issues/${pullNumber}/comments`,
      { body: comment },
      {
        headers: {
          Authorization: `Bearer ${req.user.accessToken}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    res.json({
      message: "Comment posted successfully",
      data: response.data,
    });
  } catch (error) {
    console.log("GITHUB COMMENT ERROR:", error.response?.data || error.message);

    res.status(error.response?.status || 500).json({
      message:
        error.response?.data?.message ||
        "Failed to post PR comment",
    });
  }
};

module.exports = {
  getUserRepos,
  getRepoPullRequests,
  getPullRequestFiles,
  postPRComment,
};
