// constants
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

// using bodyParser to extract the body and get the json data
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// use the body parse by express app
app.use(bodyParser.json());

// routes
app.get("/suggestions", (req, res) => {

  // return data-mocks 
  res.send({
    data: {
      results: [
        {
          domain: "awesomefootball.com",
          available: true
        },
        {
          domain: "gofootball.com",
          available: false
        }
      ]
    }
  });
});


// make the app listen to port 7000
app.listen(7000);