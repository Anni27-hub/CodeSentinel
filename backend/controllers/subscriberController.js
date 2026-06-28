const Subscriber = require("../models/Subscriber");

const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email address",
      });
    }

    const existing =
      await Subscriber.findOne({
        email: email.toLowerCase(),
      });

    if (existing) {
      return res.status(409).json({
        message: "Email already subscribed",
      });
    }

    await Subscriber.create({
      email: email.toLowerCase(),
    });

    res.status(201).json({
      message: "Subscribed successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Subscription failed",
    });
  }
};

module.exports = {
  subscribe,
};