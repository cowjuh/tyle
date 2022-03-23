const router = require("express").Router();
var { writeToSerial } = require("../arduinoSerial");

router.route("/").post((req, res) => {
  const ledConfig = req.body.ledConfig;
  console.log("Got body: ", ledConfig);
  writeToSerial(JSON.stringify(ledConfig));
  res.sendStatus(200);
});

module.exports = router;
