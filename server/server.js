const express = require("express");
const app = express();
const port = process.env.PORT || 5001;
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

// ARDUINO PORT STUFF
const serialPort = new SerialPort("/dev/ttyACM0", { baudRate: 9600 });
const parser = serialPort.pipe(new Readline({ delimiter: "\n" }));
// Read the port data
serialPort.on("open", () => {
  console.log("serial port open");
});
parser.on("data", (data) => {
  console.log("got word from arduino:", data);
});
