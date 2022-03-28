const router = require("express").Router();

router.route("/").get((req, res) => {
  res.send("Get request at data mode");
});

module.exports = router;
