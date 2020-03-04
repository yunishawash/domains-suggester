const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 HOURS
  max: 5,
  message: "You have exceeded the 5 requests in 24 hrs limit!",
  headers: true
});

module.exports = apiLimiter;
