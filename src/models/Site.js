const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      unique: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    responseTime: {
      type: Number,
    },
    lastCheckedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Site = mongoose.model("Site", siteSchema);

module.exports = Site;
