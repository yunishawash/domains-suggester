const niv = require("node-input-validator");

// adding custome array minimum size validation rule, since the package of 'node-input-validator' doesn't support
// the validation of minium size validation
niv.extend("array_min", ({ value, args }) => {
  return value.length >= args[0];
});
