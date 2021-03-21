const express = require("express");
const resolvers = require("./resolvers");
const router = express.Router();

router.get("/animals", (req, res) => {
  res.json(["john", "tom"]);
});
router.get("/findPost/:name", resolvers.findName);
router.get("/posts", resolvers.getAllPosts);
router.get("/review/:name/:type", resolvers.getReviews);
router.get("/boss/:name/:type", resolvers.getBossInfo);
router.post("/review", resolvers.postReview);

module.exports = router;
