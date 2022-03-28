const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const USB_PATH = "/dev/tty.usbserial-2110";
const BAUD_RATE = 9600;

const arduinoPort = new SerialPort({
  path: USB_PATH,
  baudRate: BAUD_RATE,
});
const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: "\r\n" }));

parser.on("data", (data) => {
  console.log("[NANO]:", data);
});

const writeToSerial = (message) => {
  arduinoPort.write(message, function (err) {
    if (err) {
      return console.log("Error on write: ", err.message);
    }
    console.log("message written");
  });
};

module.exports = {
  writeToSerial: writeToSerial,
  arduinoPort: arduinoPort,
  parser: parser,
};
