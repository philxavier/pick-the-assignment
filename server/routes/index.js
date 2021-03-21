const express = require("express");
const resolvers = require("./resolvers");

const router = express.Router();

router.get("/animals", (req, res) => {
  res.json(["john", "tom"]);
});

router.get("/findPost/:name", resolvers.findName);
router.get("/posts", resolvers.getAllPosts);

module.exports = router;
