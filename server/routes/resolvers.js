let findWithRegex = require("../../database-mongo/index").findWithRegex;

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

module.exports = { findName };
