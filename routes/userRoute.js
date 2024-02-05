const express = require("express");
const User = require("../models/UseModel");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

router.post("/", async (req, res) => {
  const {
    twitter_username,
    discord_username,
    sei_address,
    og_sei,
    prev_owned,
    b_overview,
    b_think,

    referral_code,
  } = req.body;

  console.log(req.body);

  try {
    const twitterExists = await User.findOne({ twitter_username });
    const discordExists = await User.findOne({ discord_username });

    if (twitterExists) {
      return res
        .status(404)
        .json({ message: "Twitter Account already applied" });
    }
    if (discordExists) {
      return res
        .status(404)
        .json({ message: "Discord Account already applied" });
    }

    const generatedReferralCode = uuidv4();

    const user = await User.create({
      twitter_username,
      discord_username,
      sei_address,
      og_sei,
      prev_owned,
      b_overview,
      b_think,
      referral_code: generatedReferralCode,
    });

    if (referral_code) {
      const referringUser = await User.findOne({ referral_code });
      if (referringUser) {
        referringUser.referral_count += 1; // Assuming you have a 'referral_count' field in your User model
        await referringUser.save();
      }
    }
    res.status(201).json(user);
  } catch (err) {
    res.status(404).json({ message: err });
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.status(201).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/:twitter_username", async (req, res) => {
  const { twitter_username } = req.params;

  try {
    const user = await User.findOne({ twitter_username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;