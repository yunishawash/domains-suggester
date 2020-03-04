'use strict'

const niv = require("node-input-validator");

// adding custome array size message 
niv.extendMessages(
  {
    array_min: "Required number of :attribute must be :args ."
  },
  "en"
);
