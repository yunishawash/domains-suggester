// config.js
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  endpoint: process.env.API_URL,
  masterKey: process.env.API_KEY,
  port: process.env.PORT,
  path: process.env.NODE_PATH,
  apiMaxHits: process.env.API_MAX_HITS, // number of api hits allowed in duration of {apiHitsDuration} minutes
  apiHitsDuration: process.env.API_HITS_DURATION, // in minutes
  availabilityApi: process.env.AVAILABILITY_API,
  availabilityApiToken: process.env.AVAILABILITY_API_TOKEN
};
