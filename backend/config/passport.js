const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

const User = require("../models/User");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,

      clientSecret: process.env.GITHUB_CLIENT_SECRET,

      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          githubId: profile.id,
        });

        if (!user) {
          user = await User.create({
            githubId: profile.id,
            username: profile.username,
            avatar: profile.photos?.[0]?.value || "",
            accessToken: accessToken,
          });
        } else {
          // Update token every login
          user.accessToken = accessToken;

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  console.log("Serialize:", user.username);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Deserialize:", id);

  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
