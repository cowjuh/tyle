import {
  ArrayOperation,
  ArrayManipulation,
  WSMessageType,
  WSMessageObject,
} from "./types";
import WebSocketServer = require("ws");

/**
 * This function parses the incoming string from the esp32
 * into the shape of the object that is needed by the client
 * The string format from the esp32 looks something like this:
 * @param esp32String
 * @returns
 */
const parseESP32TileGrid = (esp32String: string) => {
  const strArray = esp32String.split(" ").map(Number);
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

interface HashTable<T> {
  [key: string]: T;
}

/**
 * -----------FUNCTION LOGIC DESIGN-------------
 * First separate the 4 position values by ID
 * Then pinpoint the ID who corresponds to "m", or the master tile
 * Locate the position adjacent tiles in hashmap, noting their relative position
 * to the origin/master
 *
 * On the next tile, check if any of the values are in the hashmap
 * already. If not, we don't have enough information. We should
 * skip it.
 *
 * Once we find a tile with enough information to deduce its location
 * We must find its relative location in order to place its id
 * in the hashmap
 *
 * Once we're done with that tile, we should remove it from
 * our list of tiles to go through
 */

/**
 * This function takes in the string representation of the tile grid
 * and returns the physical layout in the form of an array with tile IDs.
 *
 * Example:
 *
 * Physical Layout:
 *     [3]
 * -[1][2]
 *
 * String representation:
 * m020 1300 0002 --> m02013000002
 *
 * Returns:
 * [[0,3],
 * [1,2]]
 *
 * @param str String representation of tile grid shape
 * @returns Array that represents the physical layout of the tile grid
 */
const parseTileGridShape = (str: string) => {
  const strArray: string[] = str.split("");

  var grid: number[][];
  var tileCoordinates: HashTable<Array<number>> = {};
  var tilePositions: string[][] = [];
  var currentCoords: number[] = [0, 0];
  var gridWidth: number = 0;
  var gridHeight: number = 0;
  var i: number = 0;

  // Validate that the string is in the right format
  if (!isValidString(str, "")) {
    return console.error("Value sets must be in multiples of 4.");
  } else if (strArray[0] !== "m") {
    return console.error("The first letter of the string must be m.");
  }

  /**
   * Separate the string array into
   * sub-arrays pertaining to the relevant tile IDs
   * Each sub array contains 5 elements
   * [left, top, right, bottom, ID]
   */
  for (let i = 0; i < strArray.length; i += 4) {
    var tileInfo = [
      strArray[i],
      strArray[i + 1],
      strArray[i + 2],
      strArray[i + 3],
      (i / 4 + 1).toString(),
    ];
    tilePositions.push(tileInfo);
  }

  /**
   * The idea here is that we'll delete
   * an element from the tilePositions array
   * when we've identified its position
   * relative to the origin
   *
   * The tile that has the "m" within it will be at
   * [0,0]
   *
   * We fill the hashtable, tileCoordinates, with the
   * coordinates of each tile.
   */
  while (tilePositions.length > 0) {
    var currentTile: string[] = tilePositions[i];
    var currentId: string = currentTile[4];
    for (let pos = 0; pos < 4; pos++) {
      var currentValue: string = currentTile[pos];

      // Skip over "0" values
      if (currentValue === "0") continue;

      /**
       * The "m" is the indicator for the master tile
       * This tile is ALWAYS at [0,0]
       */
      if (currentValue === "m") {
        tileCoordinates[currentId] = [0, 0];
        currentCoords = [0, 0];
        continue;
      }

      /**
       * If the current tile coordinates have been discovered,
       * we can use this position to find the position of its neighbors
       */
      if (tileCoordinates[currentId]) {
        currentCoords = tileCoordinates[currentId];
        // Initialize the coordinates to be the current tile's position
        let x: number = currentCoords[0];
        let y: number = currentCoords[1];

        /**
         * Then, we find the neighbor's position relative to
         * our current tile
         */
        switch (pos) {
          // Left
          case 0:
            x -= 1;
            break;

          // Top
          case 1:
            y += 1;
            break;

          // Right
          case 2:
            x += 1;
            break;

          // Bottom
          case 3:
            y -= 1;
            break;
        }

        /**
         * Having "discovered" the location of this neighbor tile,
         * we put it in the hashtable so that other tiles
         * may be discovered through it
         */
        tileCoordinates[currentValue] = [x, y];

        /**
         * To construct the final grid array,
         * we need to know smallest 2D array needed
         * to be able to represent our grid.
         *
         * We therefore keep track of the largest x and y values
         */
        if (x > gridWidth) gridWidth = x;
        if (y > gridHeight) gridHeight = y;
      }
    }
    /**
     * After we've gone through the tile's 4 potential neighbors,
     * we'll remove it from our tilePositions array
     * so that we do not go over it again
     */
    if (tileCoordinates[currentId]) tilePositions.splice(i, 1);

    /**
     * Since the length of our tilePosition array may have changed,
     * we want to check whether to increment our index or reset
     * it to 0 to revisit previously undiscoverable tiles
     */
    i > tilePositions.length - 2 ? (i = 0) : i++;
  }

  /**
   * Create gridWidth x gridHeight array filled with 0's
   * Then, loop through our hashtable of [ID]: [x,y] to
   * place the corresponding tile IDs at the right coordinates
   */
  grid = Array.from(Array(gridHeight + 1), (_) => Array(gridWidth + 1).fill(0));
  for (const tile in tileCoordinates) {
    let x = tileCoordinates[tile][0];
    let y = tileCoordinates[tile][1];
    grid[gridHeight - y][x] = parseInt(tile);
  }

  return grid;
};

/**
 * EXAMPLES FOR THE ABOVE FUNCTION
 *
 *     [3]
 * -[1][2]
 * m020 1300 0002
 *
 * 1: [0,0]
 * 2: [1,0]
 * 3: [1,1]
 *
 *
 *     [2]
 * -[1][3]
 * m030 0003 1200
 *
 * 1: [0,0]
 * 2: [1,1]
 * 3: [1,0]
 *
 *
 * -[1][2][3]
 * m020 1030 2000
 *
 * 1: [0,0]
 * 2: [1,0]
 * 3: [2,0]
 */

/**
 * Function that adds a new row or column before or after the array
 * @param arr The 2D array to modify
 * @param operation Add row or column, before, or after
 * @returns The modified array
 */
const modifyArray = (
  arr: Array<Array<number>>,
  operation: ArrayManipulation
) => {
  if (arr[0][0] == undefined) {
    console.error("Array must be 2D");
    return;
  }
  var newRow = [];

  switch (operation) {
    case ArrayManipulation.rowAfter:
      addNewRow(ArrayOperation.after);
      break;
    case ArrayManipulation.rowBefore:
      addNewRow(ArrayOperation.before);
      break;
    case ArrayManipulation.columnAfter:
      addNewColumn(ArrayOperation.after);
      break;
    case ArrayManipulation.columnBefore:
      addNewColumn(ArrayOperation.before);
      break;
  }
  return arr;

  function addNewColumn(operation: ArrayOperation) {
    for (let i = 0; i < arr.length; i++) {
      operation === ArrayOperation.after ? arr[i].push(0) : arr[i].unshift(0);
    }
  }

  function addNewRow(operation: ArrayOperation) {
    newRow = new Array(arr[0].length).fill(0);
    operation === ArrayOperation.after ? arr.push(newRow) : arr.unshift(newRow);
  }
};

const constructWSObject = (type: WSMessageType, data: string): string => {
  const obj: WSMessageObject = { type: type, data: data };
  return JSON.stringify(obj);
};

module.exports = {
  parseESP32TileGrid: parseESP32TileGrid,
  parseTileGridShape: parseTileGridShape,
  constructWSObject: constructWSObject,
};
