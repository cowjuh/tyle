const router = require("express").Router();

router.route("/").get((req, res) => {
  res.send("Get request at tile");
});

module.exports = router;
