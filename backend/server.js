require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const githubRoutes = require("./routes/githubRoutes");
const aiRoutes = require("./routes/aiRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

require("./config/passport");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      httpOnly: true,
    },
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.get("/", (req, res) => {
  res.send("AI PR Reviewer Backend Running");
});

const authRoutes = require("./routes/authRoutes");

app.use("/auth", authRoutes);

app.use("/github", githubRoutes);

app.use("/ai", aiRoutes);

app.use("/reviews", reviewRoutes);

app.use("/subscribers", subscriberRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
