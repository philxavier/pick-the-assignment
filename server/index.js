var express = require("express");
var app = express();
let compression = require("compression");
let PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const router = require("./routes");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/", router);
app.use(bodyParser.json());
app.use(compression());
app.use(express.static(__dirname + "/../client/dist"));

app.listen(PORT, function () {
  console.log("LISTENING on port 3001!");
});
