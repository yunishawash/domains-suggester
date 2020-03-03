// constants
const express = require('express');
const app = express();

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