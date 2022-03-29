/**
 * This function parses the incoming string from the esp32
 * into the shape of the object that is needed by the client
 * The string format from the esp32 looks something like this:
 * @param esp32String
 * @returns
 */
const parseESP32TileGrid = (esp32String: string) => {
  const strArray = esp32String.split(" ");
  const tileArray = [];
  if (!isValidString(esp32String, " ")) {
    return console.error("Value sets must be in multiples of 4.");
  }
  for (let i = 0; i < strArray.length; i += 4) {
    var temp = {
      tileId: i / 4 + 1,
      left: strArray[i],
      top: strArray[i + 1],
      right: strArray[i + 2],
      bottom: strArray[i + 3],
    };
    tileArray.push(temp);
  }
  console.log(tileArray);
  return esp32String;
};

const isValidString = (str: string, separator: string) => {
  return str.split(separator).length % 4 == 0;
};

/**
 * -[1][2][3]
 * m020 1030 2000
 *
 *     [3]
 * -[1][2]
 * m020 1300 0002
 */

const indexToOrientationHash = {
  left: 0,
  top: 1,
  right: 2,
  bottom: 3,
};

const parseTileGridShape = (str: string) => {
  if (!isValidString(str, "")) {
    return console.error("Value sets must be in multiples of 4.");
  }

  // Separate string into array of positions
  const strArray = str.split("");
  var tilePositions = [];
  for (let i = 0; i < strArray.length; i += 4) {
    var temp = [strArray[i], strArray[i + 1], strArray[i + 2], strArray[i + 3]];
    tilePositions.push(temp);
  }

  var gridConstructor: Array<Array<number>> = [[0]];
  var currentCoords: Array<number> = [0, 0];
  for (let i = 0; i < tilePositions.length; i++) {
    var currentId = i + 1;
    console.log("Current ID: ", currentId);
    for (let j = 0; j < tilePositions[0].length; j++) {
      if (tilePositions[i][j] === "0") continue;
      if (tilePositions[i][j] === "m") {
        gridConstructor = [[1]];
        currentCoords = [i, j];
        continue;
      }
      console.log(currentCoords);
      // If something on the left
      if (j === 0) {
        if (
          currentCoords !== undefined &&
          gridConstructor[currentCoords[0]][currentCoords[1] - 1] === undefined
        ) {
        }
      }
    }
    var left = tilePositions[i][0];
    var top = tilePositions[i][1];
    var right = tilePositions[i][2];
    var bottom = tilePositions[i][3];
  }

  console.log("AFTER: ", addNewRow([[1, 2, 3]], ArrayManipulation.rowBefore));
  console.log("BEFORE: ", addNewRow([[1, 2, 3]], ArrayManipulation.rowAfter));

  console.log(tilePositions);
  console.log("-----FINAL GRID------");
  console.log(gridConstructor);
};

// [1,2,3]
// [0,0]
// [[0]]
// Array must be 2D

enum ArrayManipulation {
  columnAfter = "columnAfter",
  columnBefore = "columnBefore",
  rowAfter = "rowAfter",
  rowBefore = "rowBefore",
}

const addNewRow = (arr: Array<Array<number>>, operation: ArrayManipulation) => {
  if (arr[0][0] == undefined) {
    console.error("Array must be 2D");
    return;
  }
  var newRow = [];

  switch (operation) {
    case ArrayManipulation.rowAfter:
      newRow = new Array(arr[0].length).fill(0);
      arr.push(newRow);
      break;
    case ArrayManipulation.rowBefore:
      newRow = new Array(arr[0].length).fill(0);
      arr.unshift(newRow);
      break;
    default:
    // code block
  }
  return arr;
};

module.exports = {
  parseESP32TileGrid: parseESP32TileGrid,
  parseTileGridShape: parseTileGridShape,
};
