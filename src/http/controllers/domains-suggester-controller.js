
// domains suggester controller

const keywordsValidator = require("../../validators/keywords-validator");
const domainsAvailabilityCheckRepo = require("../../repositories/domains-availability-check-repo");
const domainsSuggesterRepo = require("../../repositories/domains-suggester-repo");

/**
 * 
 * Action returns suggestions with their availability
 * 
 * @param {*} req request object
 * @param {*} res response object
 * @returns {json} json response
 * 
 */
exports.suggestions = (req, res) => {
  // create new validator for the keywords
  let kv = new keywordsValidator(req);
  // check wether the input data is valid or not
  kv.isValid()
    // if data is valid get suggestions
    .then(async data => {
        let numberOfSuggestions = req.body.num_of_suggestions > 10 ? req.body.num_of_suggestions : 10;
        suggestions = await domainsSuggesterRepo.getDomainSuggestions(req.body.keywords, numberOfSuggestions, req.body.tld);
        // // send suggestions created by the domainsSuggesterRepo to the domain availability checke repo 
        suggestionsWithAvailability = await domainsAvailabilityCheckRepo.checkDomainsAvailability(suggestions);
    
        res.send({
          success: true,
          data: suggestionsWithAvailability,
          meta: {
            message: "getting suggestions"
          }
        });
    })
    .catch(errors => {
      // if the request input it not valid return status 422 and get the errors
      //  from the validator with invalid verification message
      res.status(422).send({
        errors: kv.getErrors(),
        meta: {
          message: "invalid verification"
        }
      });
    });
  
};