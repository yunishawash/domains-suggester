const rateLimit = require("express-rate-limit");
const { apiMaxHits } = require("../config");
const { apiHitsDuration } = require("../config");
/**
 * an api limiter 
 * 
 */
const apiLimiter = rateLimit({
  windowMs: apiHitsDuration * 60 * 1000,
  max: apiMaxHits,
  message: "You have exceeded the 5 requests in 24 hrs limit!",
  headers: true
});

module.exports = apiLimiter;
