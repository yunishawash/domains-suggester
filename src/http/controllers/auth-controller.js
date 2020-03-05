// auth controller

const jwt = require("jsonwebtoken");
const uuid = require("node-uuid");
const { masterKey } = require("../../config");

exports.auth = async function(req, res) {
    // generate a unique token for the user
    const token = jwt.sign(
        { _id: uuid.v1() },
        masterKey
    );

    res.send({
        token: token
    });
};
