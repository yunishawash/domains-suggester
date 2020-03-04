'use strict'
// required files
require("./custom-validation-rules");
require("../resources/lang/en/validation");

const { Validator } = require("node-input-validator");

const internal = {};

module.exports = internal.keywordsValidator = class {
  /**
   *
   * Constructor
   *
   * @param {*} req
   */
  constructor(req) {
    this.req = req;
    this.errors = {};
    // binding the functions to the class to active (this) in arrow functions
    this.rules = this.rules.bind(this);
    this.isValid = this.isValid.bind(this);
    this.getErrors = this.getErrors.bind(this);
    this.setErrors = this.setErrors.bind(this);
  }
  

  /**
   *
   * Initiate the rules of the request
   *
   * @return array object object contains the request input and the rules must be applied to it
   *
   */
  rules = () => {
    return {
      keywords: "required|array|array_min:2"
    };
  };

  /**
   *
   * Check wether the request body is valid upon the rules in rules function
   *
   * @return array object object contains the request input and the rules must be applied to it
   *
   */

  isValid = () => {
    // initiate validator pass the body inouts and validation rules
    const v = new Validator(this.req.body, this.rules());
    // initiate a promise to avoid returning empty errors if validation failed
    return new Promise((resolve, reject) => {
      v.check().then(matched => {
        if (!matched) {
          this.setErrors(v.errors);
          reject(false);
        } else {
          resolve(true);
        } // end if
      }); // end then
    }); // end promise
  }; // end is valid

  /**
   *
   * a setter for errors paramter
   *
   * @param errors array of objects of the rules had been failed to be verified upon the request body inputs
   * @return array object object contains the request input and the rules must be applied to it
   *
   */
  setErrors = errors => {
    this.errors = errors;
  };

  /**
   *
   * a getter for errors paramter
   *
   * @return array object object contains the request input and the rules must be applied to it
   *
   */
  getErrors = () => {
    return this.errors;
  };
};

