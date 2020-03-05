// domains suggester controller

const keywordsValidator = require("../../validators/keywords-validator");

exports.suggestions = function(req, res) {
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
              domain:
                "awesomefootball.com",
              available: true
            },
            {
              domain: "gofootball.com",
              available: false
            }
          ]
        },
        meta: {
          message:
            "getting suggestions"
        }
      });
    })
    .catch(errors => {
      res.status(422).send({
        success: false,
        errors: kv.getErrors(), // get the errors from the validator
        meta: {
          message:
            "invalid verification"
        }
      });
    });
};