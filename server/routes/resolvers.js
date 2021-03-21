let findWithRegex = require("../../database-mongo/index").findWithRegex;
let selectAll = require("../../database-mongo/index.js").selectAll;

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

module.exports = { findName, getAllPosts };
