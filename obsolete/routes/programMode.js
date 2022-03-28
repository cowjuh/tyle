const router = require("express").Router();

router.route("/").get((req, res) => {
  res.send("Get request at program mode");
});

module.exports = router;
