// required files
require("./validators/custom-validation-rules");
require("./resources/lang/en/validation");
// constants
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const { Validator } = require("node-input-validator");
// validators
const keywordsValidator = require("./validators/keywords-validator");

// using bodyParser to extract the body and get the json data
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// use the body parse by express app
app.use(bodyParser.json());

// routes
app.get("/suggestions", (req, res) => {
  
    // create new validator for the keywords
    let kv = new keywordsValidator(req);

    kv.isValid().then((res) => {
        res.send({
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
                    }
                });
    }).catch((errors)=>{
        res.status(422).send({
          errors: kv.getErrors(),
          meta: {
            message: "invalid_verification"
          }
        });
    });

});


// make the app listen to port 7000
app.listen(7000);