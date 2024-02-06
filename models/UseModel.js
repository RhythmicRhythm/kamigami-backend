const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    twitter_username: {
      type: String,
    },
    discord_username: {
      type: String,
    },
    sei_address: {
      type: String,
    },
    og_sei: {
      type: String,
    },
    prev_owned: {
      type: String,
    },
    b_overview: {
      type: String,
    },
    b_think: {
      type: String,
    },
    referral_code: {
      type: String,
    },
     whitelist_status: {
      type: String,
      default: "Pending",
    },
    referral_count: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
