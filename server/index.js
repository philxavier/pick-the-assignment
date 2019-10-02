var express = require("express");
var app = express();
let selectAll = require("../database-mongo/index.js").selectAll;
let findOne = require("../database-mongo/index.js").findOne;
let findWithRegex = require("../database-mongo/index.js").findWithRegex;
let insertReview = require("../database-mongo/index.js").insertReview;
let compression = require("compression");
let PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.use(compression());
app.use(express.static(__dirname + "/../client/dist"));

app.listen(PORT, function() {
  console.log("LISTENING on port 3001!");
});

app.get("/posts", (req, res) => {
  selectAll()
    .then(result => {
      // console.log("these are the results", result);
      res.send(result);
    })
    .catch(err => {
      console.log("there was an error in the server", err);
      res.status.send(404);
    });
});

app.get("/findPost/:name", (req, res) => {
  let post = req.params.name;
  findWithRegex(post)
    .then(result => {
      // console.log("these are the results", result);
      res.send(result);
    })
    .catch(err => {
      console.log("there was error in the server", err);
      res.status.send(404);
    });
});

app.get("/review/:name/:type", (req, res) => {
  let city = req.params.name;
  let type = req.params.type;
  findReviews(city, type)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log("there was an error in the server", err);
      res.status.send(404);
    });
});

app.post("/review", (req, res) => {
  let {
    textAreaContent,
    date1,
    date2,
    currentRating,
    type,
    postName
  } = req.body;

  insertReview(textAreaContent, date1, date2, currentRating, postName, type)
    .then(result => {
      console.log("successfull insertion!");
      res.end();
    })
    .catch(err => {
      console.log("there was an error", err);
    });
});
