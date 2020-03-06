'use strict'

const express = require('express');
const router = new express.Router();
const domainsSuggestionsLimiter = require("../limiters/domains-suggestions-limiter");
const auth = require("../http/middleware/auth");
// controllers
const authController = require("../http/controllers/auth-controller");
const domainsSuggesterController = require("../http/controllers/domains-suggester-controller");
// use the apiLimiter by the express router
// router.use("/api/", domainsSuggestionsLimiter);
// routes
router.get("/api/get-token", authController.auth );
router.get("/api/domains-suggestions", auth, domainsSuggesterController.suggestions);


module.exports = router;