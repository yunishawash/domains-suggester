const jwt = require("jsonwebtoken");
const { masterKey } = require("../config");
/**
 * 
 * @param {*} req request object
 * @param {*} res response object
 * @param {*} next go to the next context
 */
const auth = async (req, res, next) => {
        // get the token from the header
        let token = req.header("authorization");
        // check if the token is available
        if ( token && token.startsWith("Bearer ")) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        // if the token is provider check whether it's valid or not, if valid store the 
        // decoded data. the decoded data maybe used to get the user by the id that used to generat the token
        if (token) {
            jwt.verify(token, masterKey, (err, decoded) => {
                // the token is not verified
                if(err) {
                    res.status(401).json({
                      success: false,
                      meta: {
                          message: "Token is not valid"
                      }
                    });
                } else {
                    // store the decoded data into the req to use it into the route function 
                    // to reduce the resource using
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            // the auth token is not provided
            res.status(401).json({
              success: false,
              meta: {
                  message: "Auth token is not supplied"
              }
            });
        }
}

module.exports = auth;