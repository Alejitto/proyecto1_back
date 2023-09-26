// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/", function(req, res){
  let currentDate = new Date()
  res.json({"unix": currentDate.getTime(), "utc": `${currentDate.toUTCString()}`});
})

app.get("/api/:date?", function (req, res) {
  var timeU = isNaN(req.params.date)? req.params.date : parseInt(req.params.date);
  console.log(timeU);
  let currentDate = new Date(timeU);
  let errorResponse = {"error": `${currentDate}`}
  let validResponse = {"unix": currentDate.getTime(), "utc": `${currentDate.toUTCString()}`}
  currentDate == "Invalid Date" ? res.json(errorResponse) :
  res.json(validResponse);
});


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
