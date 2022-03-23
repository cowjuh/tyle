const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const { arduinoPort, parser, writeToSerial } = require("./arduinoSerial");

// ROUTE IMPORTS
const programModeRouter = require("./routes/programMode");
const dataModeRouter = require("./routes/dataMode");
const drawModeRouter = require("./routes/drawMode");

// CONSTANT VARIABLES
const SERVER_PORT = 5001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// API ROUTES
app.use("/api/programmode", programModeRouter);
app.use("/api/datamode", dataModeRouter);
app.use("/api/drawmode", drawModeRouter);

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));

// ARDUINO PORT AND PARSER SETUP

arduinoPort.on("error", function (err) {
  console.log("Error: ", err.message);
});

async function init() {
  await sleep(1500);
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

init();
