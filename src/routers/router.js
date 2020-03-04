'use strict'

const express = require('express');
const router = new express.Router();
const rateLimit = require("express-rate-limit");
// validators
const keywordsValidator = require("../validators/keywords-validator");
// api throttling limiter 
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 20
});

router.use("/api/", apiLimiter);
// routes
router.get("/api/suggestions", (req, res) => {

    // create new validator for the keywords
    let kv = new keywordsValidator(req);

    kv.isValid()
        .then(data => {
                    res.send({
                        data: {
                            results: [
                                {
                                domain:
                                    "awesomefootball.com",
                                available: true
                                },
                                {
                                domain: "gofootball.com",
                                available: false
                                }
                            ]
                        }
                });
        })
        .catch(errors => {
            res.status(422).send({
                errors: kv.getErrors(),
                meta: {
                    message: "invalid_verification"
                }
            });
        });
    });

module.exports = router;