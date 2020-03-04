'use strict'
// required files
require("./validators/custom-validation-rules");
require("./resources/lang/en/validation");
// constants
const express = require('express');
const app = express();
const router = require("./routers/router");

app.use(express.json());
app.use(router);

// make the app listen to port 7000
app.listen(7000);