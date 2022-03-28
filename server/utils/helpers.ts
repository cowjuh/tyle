/**
 * This function parses the incoming string from the esp32
 * into the shape of the object that is needed by the client
 * The string format from the esp32 looks something like this:
 * @param esp32String
 * @returns
 */
const parseESP32TileGrid = (esp32String: string): string => {
  return esp32String;
};

module.exports(parseESP32TileGrid);
