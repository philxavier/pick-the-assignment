let findWithRegex = require("../../database-mongo/index").findWithRegex;
let selectAll = require("../../database-mongo/index.js").selectAll;
let findBoss = require("../../database-mongo/index.js").findBoss;
let insertReview = require("../../database-mongo/index.js").insertReview;

const findName = (req, res) => {
  let post = req.params.name;
  findWithRegex(post)
    .then((result) => {
      // console.log("these are the results", result);
      res.send(result);
    })
    .catch((err) => {
      console.log("there was error in the server", err);
      res.status.send(404);
    });
};

const getAllPosts = (req, res) => {
  selectAll()
    .then((result) => {
      // console.log("these are the results", result);
      res.send(result);
    })
    .catch((err) => {
      console.log("there was an error in the server", err);
      res.status.send(404);
    });
};

const getReviews = (req, res) => {
  let city = req.params.name;
  let type = req.params.type;

  findReviews(city, type)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("there was an error in the server", err);
      res.status.send(404);
    });
};

const getBossInfo = (req, res) => {
  let city = req.params.name;
  let type = req.params.type;
  findBoss(city, type)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("there was an error in the server", err);
      res.status.send(404);
    });
};

const postReview = (req, res) => {
  let {
    textAreaContent,
    cost,
    dates,
    workPlaceRating,
    fun,
    safety,
    type,
    postName,
  } = req.body;

  insertReview(
    textAreaContent,
    dates,
    cost,
    workPlaceRating,
    fun,
    safety,
    type,
    postName
  )
    .then((result) => {
      res.end();
    })
    .catch((err) => {
      console.log("there was an error", err);
    });
};

module.exports = { findName, getAllPosts, getReviews, getBossInfo, postReview };
