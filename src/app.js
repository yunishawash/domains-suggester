'use strict'
// required files
require("./validators/custom-validation-rules");
require("./resources/lang/en/validation");
// constants
const express = require('express');
const app = express();
const router = require('./routers/router');
const { port } = require("./config");
// use the body parse by express app
app.use(express.json());
app.use(router);
// make the app listen to port 7000
app.listen(port);
