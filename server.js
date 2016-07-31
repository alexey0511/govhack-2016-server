let express = require("express");
let app = express();
let bodyParser = require("body-parser");

let port = process.env.PORT || 3000;


// fixtures
let huts = require("./fixtures/huts-visited.json");

// just for a purpose of demo have status variable that indicates online and offline
let status = true;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


let router = express.Router();

app.get("/", function (req, res) {
  res.send("Hello World!");
});

// APIs
app.get("/api/status", function(req, res) {
  // just for a purpose of demo have status variable that indicates online and offline
  if (status) {
    res.json({ "online": true});
  } else {
    res.json({ "online": false});
  }
});

app.get("/api/huts-visited", function(req, res) {
  res.json(huts)
});
app.post("/api/pay-for-hut", function(req, res) {
  res.status(200).end();

});
app.post("/api/hut-checkin", function(req, res) {
  huts.push({
    "id": huts.length,
    "name": "New Hutt",
    "region": "Cantrbury",
    "nationalPark": "Aoraki/Mount Cook National Park",
    "dateVisited": "",
    "price": 5,
    "paid": false
  })

  res.status(200).end();
});

app.get('/api/simulate-offline', function(req, res) {
  status = !status;

  res.status(200).end();
});

// ALWAYS SERVE INDEX
//TODO: specify correct path
// app.get("*", function(req, res) {
//   res.sendFile('./public/index.html')
// })


let server = app.listen(3000, function() {
  console.log("App started");
});

exports = module.exports = app;
