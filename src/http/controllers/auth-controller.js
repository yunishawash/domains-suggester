// auth controller

const jwt = require("jsonwebtoken");
const uuid = require("node-uuid");
const { masterKey } = require("../../config");

/**
 * Auth api
 * @returns {string} jwt token to use for calling our apis
 */
exports.auth = async function(req, res) {
    // generate a unique token for the user
    const token = jwt.sign({ _id: uuid.v1() }, masterKey);
    // return the token 
    res.send({
        token: token
    });
};
