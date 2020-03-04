'use strict'

const express = require('express');
const router = new express.Router();
const uuid = require("node-uuid");
const keywordsValidator = require("../validators/keywords-validator");
const domainsSuggestionsLimiter = require("../limiters/domains-suggestions-limiter");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { masterKey } = require("../config");
// use the apiLimiter by the express router
router.use("/api/", domainsSuggestionsLimiter);
// routes
router.get("/api/get-token", async (req, res) => {
  // generate a unique token for the user 
  const token = jwt.sign({ _id: uuid.v1() }, masterKey);
  
  res.send({
      token: token
  });

});

router.get("/api/suggestions", auth, (req, res) => {
  // create new validator for the keywords
  let kv = new keywordsValidator(req);
  // check if the keyword provided matches the rules 
  kv.isValid()
    .then(data => {
      res.send({
        success: true,
        data: {
          results: [
            {
              domain: "awesomefootball.com",
              available: true
            },
            {
              domain: "gofootball.com",
              available: false
            }
          ]
        },
        meta: {
            message: "getting suggestions"
        }
      });
    })
    .catch(errors => {
      res.status(422).send({
        success: false,
        errors: kv.getErrors(),// get the errors from the validator
        meta: {
          message: "invalid verification"
        }
      });
    });
});


module.exports = router;