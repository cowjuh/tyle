import {
  Color,
  LEDConfig,
  LEDRowT,
  LocalStorageKeys as LocalStorageKey,
  NewProgramModeStateObject,
  ProgramModeStateObject,
  ProgramModeStatesObject,
  SingleLEDPattern,
  StateOperator,
  TileGridObject,
  TileGridPressure,
  TileIdObject,
  TileObject,
  TilePressure,
  TileRowObject,
} from "./types";
import { DRAW_MODE_TILE_GRID_LS_OBJ, RGB_STR_PADDING } from "./constants";
import { v4 as uuidv4 } from "uuid";

// Creates a unique LED ID from the tile id, led row index, and led index
export const constructLEDId = (
  tileId: number,
  ledRowId: number,
  ledId: number
): string => {
  return `${tileId}_${ledRowId}_${ledId}`;
};

/**
 * ---------------------------------------------------
 * LOCAL STORAGE TILE GRID OBJECT FUNCTIONS
 * ---------------------------------------------------
 */

// Wrapper to retrieve the local storage draw mode tile grid object
export const getDrawModeTileGridObject = (): TileGridObject => {
  const tileObject: TileGridObject = JSON.parse(
    localStorage.getItem(LocalStorageKey.DRAW_MODE_TILE_GRID_LS_OBJ) || "[]"
  );
  return tileObject;
};

// Wrapper to set the local storage draw mode tile grid object
export const setDrawModeTileGridObject = (tileObject: TileGridObject) => {
  localStorage.setItem(DRAW_MODE_TILE_GRID_LS_OBJ, JSON.stringify(tileObject));
};

export const getLocalStorageItem = (localStorageKey: LocalStorageKey) => {
  const localStorageObj = JSON.parse(
    localStorage.getItem(localStorageKey) || "[]"
  );
  return localStorageObj;
};

export const setLocalStorageItem = (
  localStorageKey: LocalStorageKey,
  object: TileGridObject | ProgramModeStatesObject
) => {
  localStorage.setItem(localStorageKey, JSON.stringify(object));
};

export const removeLocalStorageItem = (localStorageKey: LocalStorageKey) => {
  localStorage.removeItem(localStorageKey);
};

/**
 * ---------------------------------------------------
 * INTERFACE COLOR CHANGING LOGIC
 * The following functions will return the updated tile grid object
 * ---------------------------------------------------
 */
export const SELECTED_DRAW_MODE_CLASSNAME = "selected";
export const SELECTED_PROGRAM_MODE_CLASSNAME = "selected";

interface SelectedHash {
  [key: string]: number[][];
}

/**
 * Given an existing tile grid object, return it updated with a new color
 * @param color
 * @param originalTileObject
 * @returns
 */
export const getUpdatedTileGridObject = (
  color: Color,
  originalTileObject: TileGridObject
) => {
  /**
   * We create a clone of the drawModeTileObject because JavaScript SUCKS
   * and uses references which then messes up the context update.
   */
  var updatedDrawModeTileObject = JSON.parse(
    JSON.stringify(originalTileObject)
  );
  var selectedIDs = [];
  var selectedTileIds = [];
  var selectedHash: SelectedHash = {};

  // Find all elements with the "selected" class name
  const selectedLEDs: HTMLCollectionOf<Element> =
    document.getElementsByClassName(SELECTED_DRAW_MODE_CLASSNAME);

  /**
   * Construct a hashtable of the LED ids that have been selected
   * using tileIDs as keys
   */
  for (let i = 0; i < selectedLEDs.length; i++) {
    /**
     * Get the LED's full string ID (includes tile, row, and LED info)
     * Separate this string into its 3 individual components
     */
    var elementId: string = selectedLEDs[i].id;
    var elementIdSubstring = elementId.split("_");
    var tileId = elementIdSubstring[0];
    var rowId = parseInt(elementIdSubstring[1]);
    var ledId = parseInt(elementIdSubstring[2]);

    selectedIDs.push(elementId);
    selectedTileIds.push(elementId.substring(0, elementId.indexOf("_")));

    if (!selectedHash[tileId]) {
      selectedHash[tileId] = [[rowId, ledId]];
    } else {
      selectedHash[tileId].push([rowId, ledId]);
    }
  }

  for (let i = 0; i < updatedDrawModeTileObject.length; i++) {
    let tileRow: TileRowObject = updatedDrawModeTileObject[i];
    for (let j = 0; j < tileRow.length; j++) {
      let tileObject: TileObject = tileRow[j];
      let tileObjectId = tileObject.tileId;
      if (selectedHash[tileObjectId]) {
        updateSingleTileLEDs(selectedHash[tileObjectId], tileObject);
      }
    }
  }

  function updateSingleTileLEDs(tile: number[][], tileObject: TileObject) {
    for (let i = 0; i < tile.length; i++) {
      tileObject.ledConfig[tile[i][0]][tile[i][1]] = {
        color: color,
        opacity: 100,
      };
    }
  }

  return updatedDrawModeTileObject;
};

export const getInternalTileIdString = (tileIdObj: TileIdObject) => {
  return `tile-${tileIdObj.letter.toUpperCase()}-${tileIdObj.num}`;
};

export const cleanUpTileHighlight = () => {
  Array.from(document.querySelectorAll(".tile-container")).forEach((el) =>
    el.classList.remove("tile-highlighted")
  );
};

export const highlightTileByInternalId = (tileIdObj: TileIdObject) => {
  cleanUpTileHighlight();
  const selectedTile = document.getElementById(
    getInternalTileIdString(tileIdObj)
  );
  selectedTile?.classList.add("tile-highlighted");
};

/**
 * ---------------------------------------------------
 * PROGRAM MODE LOGIC
 * ---------------------------------------------------
 */

// Constructs a ProgramModeStateObject
export const constructStateObject = (
  id: string,
  tileId: TileIdObject,
  color: Color,
  operator: StateOperator,
  tileGridObject: TileGridObject,
  input1: number,
  input2?: number
) => {
  const selectedIDs = [];
  const selectedLEDs: HTMLCollectionOf<Element> =
    document.getElementsByClassName(SELECTED_DRAW_MODE_CLASSNAME);
  for (let i = 0; i < selectedLEDs.length; i++) {
    selectedIDs.push(selectedLEDs[i].id);
  }
  const stateObject: ProgramModeStateObject = {
    id: id,
    tileId: tileId,
    color: color,
    operator: operator,
    primaryInputValue: input1,
    secondaryInputValue: input2,
    selectedLEDs: selectedIDs,
    tileGridObject: tileGridObject,
  };

  return stateObject;
};

// Appends a newly created state to the states list and returns the updated states object
export const addNewStateObject = (
  newState: NewProgramModeStateObject,
  statesObject: ProgramModeStatesObject
) => {
  var updatedStatesObject = JSON.parse(JSON.stringify(statesObject));
  return updatedStatesObject.push(newState);
};

// Modifies an existing state to the states list and returns the updated states object
export const updateStateObject = (
  stateId: string,
  statesObject: ProgramModeStateObject
) => {
  var found = false;
  var updatedStatesObject = JSON.parse(JSON.stringify(statesObject));
  for (let i = 0; i < updatedStatesObject.length; i++) {
    let currentStateObj = updatedStatesObject[i];
    if (currentStateObj.id === stateId) {
      currentStateObj = updatedStatesObject;
      found = true;
    }
  }

  if (!found) console.error(`Could not find the state with id "${stateId}"`);
  else return updatedStatesObject;
};

// Deletes an existing state from the states list and returns the updated states list
export const deleteStateObject = (
  stateId: string,
  statesObject: ProgramModeStateObject
) => {
  var updatedStatesObject: ProgramModeStatesObject = JSON.parse(
    JSON.stringify(statesObject)
  );
  for (let i = 0; i < updatedStatesObject.length; i++) {
    let currentStateObj = updatedStatesObject[i];
    if (currentStateObj.id === stateId) {
      updatedStatesObject.splice(i);
    }
  }
  return updatedStatesObject;
};

export const getActualTileId = (tileIdObj: TileIdObject) => {
  return `${tileIdObj.letter + tileIdObj.num}`;
};

/**
 * @returns a UUID v4 ID
 */
export const generateStateId = () => {
  return uuidv4();
};

/**
 * Converts an integer to its ASCII equivalent
 * @param num
 * @returns
 */
export const convertNumberToLetter = (num: number): string => {
  return String.fromCharCode(65 + num);
};

/**
 *
 * @param pathname
 * @returns either the existing ID or returns undefined
 */
export const getStateId = (pathname: string): string | undefined => {
  const pathArray = pathname.split("/");
  const lastPathItem = pathArray[pathArray.length - 1];
  return lastPathItem !== "new" ? lastPathItem : undefined;
};

/**
 * Takes a hex code (with the pound) and returns its equivalent rgba
 * @param hex
 * @param padding Optional if we want to pad the return array values
 * @returns rbga
 */
export const hexToRgb = (hex: string, padding?: number) => {
  var c: any;
  var r: number;
  var g: number;
  var b: number;
  var rgbArr: string[];
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    r = (c >> 16) & 255;
    g = (c >> 8) & 255;
    b = c & 255;

    rgbArr = [r, g, b].map((val) => {
      return padNumber(val, padding || 0);
    });

    return rgbArr.join(" ");
  }
  throw new Error("Bad Hex");
};

export const ledConfigToString = (ledConfig: Array<LEDRowT>) => {
  var stringRepresentation = "";
  for (let i = 0; i < ledConfig.length; i++) {
    for (let j = 0; j < ledConfig[0].length; j++) {
      let rgb = hexToRgb(ledConfig[i][j].color);
      stringRepresentation += rgb + " ";
    }
  }
  return stringRepresentation.slice(0, -1);
};

/**
 * ---------------------------------------------------
 * WEBSOCKET INTERFACING FUNCTIONS
 * The following functions deal with translation/compilation
 * of WebSocket related data
 * ---------------------------------------------------
 */

/**
 * -------------- DEPRECATED --------------------
 * The updated version of this function is `encodeTileGrid`
 */
/**
 * This function:
 * 1. Takes as input a tile grid object
 * 2. "Flattens" the tile grid into a 1D array
 * 3. Sorts the 1D array by tileId
 * 4. Transforms each tile's ledConfig object into an rgb string
 * 5. Combines everything into one string encoded for the ESP32
 *
 * The string's format is
 *
 * 255 255 255 255 255 255 255 255 etc
 *
 * @param tileGridObj
 * @returns A rgb encoded string
 */
export const tileGridObjToRGBStr = (tileGridObj: TileGridObject): string => {
  var newArr = [];
  var encodedStr = "";
  // var returnArr: string[] = [];
  for (let i = 0; i < tileGridObj.length; i++) {
    for (let j = 0; j < tileGridObj[i].length; j++) {
      newArr.push(tileGridObj[i][j]);
    }
  }
  newArr.sort((a, b) => (a.tileId > b.tileId ? 1 : -1));
  for (let i = 0; i < newArr.length; i++) {
    encodedStr += " " + ledConfigToString(newArr[i].ledConfig);
  }
  return encodedStr;
};

/**
 * This function takes in a tile's current/previous LED pattern and
 * the tile's next/new LED pattern returns the percentage difference.
 *
 * @param ogPattern Previously emitted LED pattern
 * @param newPattern New LED pattern
 * @returns the percentage difference of the two tile LED patterns
 */
export const calcDiffPercentage = (
  ogPattern: LEDConfig,
  newPattern: LEDConfig
): number | undefined => {
  if (ogPattern.length !== newPattern.length) {
    throw Error("The two LED pattern formats do not match");
  }
  if (ogPattern[0] === undefined || newPattern[0] === undefined) {
    return undefined;
  }
  const LEDNum = ogPattern.length * ogPattern[0].length; // 16
  var diffNum: number = 0;
  for (let i = 0; i < ogPattern.length; i++) {
    for (let j = 0; j < ogPattern[0].length; j++) {
      if (
        JSON.stringify(ogPattern[i][j]) !== JSON.stringify(newPattern[i][j])
      ) {
        diffNum++;
      }
    }
  }
  return diffNum / LEDNum;
};

/**
 * This function takes the old/current tile LED pattern and the next/new
 * pattern and returns its DIFF type representation substring.
 * DIFF type means that we are only returning LEDs that have updated since
 * their previous state.
 * @param ogTileObject Original tile object
 * @param newTileObject New tile object
 * @param diffPercentage % differnce between old and new tile obj
 * @param numLEDs Number of LEDS in total on a tile
 * @returns Properly formatted DIFF type substring
 */
export const getDiffTypeSubstring = (
  ogTileObject: TileObject,
  newTileObject: TileObject,
  diffPercentage: number,
  numLEDs: number // Typically 16
): string => {
  const ogLEDConfig = ogTileObject.ledConfig;
  const newLEDConfig = newTileObject.ledConfig;
  var substring = `D ${diffPercentage * numLEDs} ${newTileObject.tileId}`; // Prepend D and the tile's id
  // Validate that the two objects are comparable
  if (diffPercentage === 0) return "";
  if (ogLEDConfig.length < 1 || newLEDConfig.length < 1) {
    return "";
  }
  if (ogLEDConfig[0].length !== newLEDConfig.length)
    throw Error("The two LED pattern formats do not match");
  for (let i = 0; i < ogLEDConfig.length; i++) {
    for (let j = 0; j < ogLEDConfig[0].length; j++) {
      // JSON.stringify so we check content difference
      if (
        JSON.stringify(ogLEDConfig[i][j]) !== JSON.stringify(newLEDConfig[i][j])
      ) {
        substring += ` ${i + j} ${hexToRgb(
          newLEDConfig[i][j].color,
          RGB_STR_PADDING
        )}`;
      }
    }
  }

  return substring;
};

/**
 * Takes in a tile object returns its FULL type substring representation.
 * FULL type means that we are essentially returning the info of ALL its LEDs.
 * @param tileObject The tile object whose substring we want to get
 * @returns The tile's substring representation
 */
export const getFullTypeSubstring = (tileObject: TileObject): string => {
  var substring = `F ${tileObject.tileId}`;
  const ledConfig = tileObject.ledConfig;

  for (let i = 0; i < ledConfig.length; i++) {
    for (let j = 0; j < ledConfig[0].length; j++) {
      substring += " " + hexToRgb(ledConfig[i][j].color, RGB_STR_PADDING);
    }
  }

  return substring;
};

/**
 * 1. Takes in the old/current tile grid object and the new/next tile grid object.
 * 2. Checks how different each tile is
 * 3. If diff >= 75%, the tile gets encoded using the FULL type substring.
 * 4. If diff < 75%, the tile gets encoded using the DIFF type substring.
 *
 * This patterns allows us to not waste bytes when a tile does not have
 * enough updates to justify sending its entire LED pattern.
 *
 * @param ogTileGrid
 * @param newTileGrid
 * @returns
 */
export const encodeTileGrid = (
  ogTileGrid: TileGridObject,
  newTileGrid: TileGridObject
): string => {
  const DIFF_THRESHOLD = 0.75;
  const TOTAL_LED_NUM = 16;

  var encodedString = "";
  if (
    ogTileGrid.length !== newTileGrid.length ||
    ogTileGrid[0].length !== newTileGrid[0].length
  ) {
    throw Error("Tile grid shapes are different.");
  }
  for (let i = 0; i < ogTileGrid.length; i++) {
    for (let j = 0; j < ogTileGrid[0].length; j++) {
      let ogTileObj = ogTileGrid[i][j];
      let newTileObj = newTileGrid[i][j];
      if (
        ogTileObj.ledConfig === undefined ||
        ogTileObj.ledConfig.length < 1 ||
        newTileObj.ledConfig === undefined ||
        newTileObj.ledConfig.length < 1
      ) {
        continue;
      }

      // Calculate the percentage difference of the two tiles
      let diffPercentage = calcDiffPercentage(
        ogTileObj.ledConfig,
        newTileObj.ledConfig
      );

      /**
       * This will return true when we're dealing with an "empty"/spacer tile obj
       * Its physical representation is a literal empty space
       */
      if (diffPercentage === undefined) continue;
      if (diffPercentage >= DIFF_THRESHOLD) {
        encodedString += " " + getFullTypeSubstring(newTileObj);
      } else {
        encodedString +=
          " " +
          getDiffTypeSubstring(
            ogTileObj,
            newTileObj,
            diffPercentage,
            TOTAL_LED_NUM
          );
      }
    }
  }

  return encodedString.trim();
};

function padNumber(value: number, padding: number) {
  var zeroes = new Array(padding + 1).join("0");
  return (zeroes + value).slice(-padding);
}

const emptyLEDPattern: SingleLEDPattern = { color: Color.none, opacity: 100 };
const defaultLEDRow: LEDRowT = Array(4).fill(emptyLEDPattern);
export const defaultLEDConfig: LEDConfig = Array(4).fill(defaultLEDRow);

/**
 * This function takes in the shape of the physical tile grid as an array and
 * converts it to its equivalent TileGridObject object
 * @param shapeArr Shape array representation of the tile grid
 * @returns The equivalent, blank, TileGridObject
 */
export const constructTileGridObj = (shapeArr: number[][]): TileGridObject => {
  var tileGridObj: any[][] = JSON.parse(JSON.stringify(shapeArr));
  for (let i = 0; i < shapeArr.length; i++) {
    for (let j = 0; j < shapeArr[0].length; j++) {
      let tileObj: TileObject = {
        tileId: shapeArr[i][j],
        ledConfig: shapeArr[i][j] === 0 ? [] : defaultLEDConfig,
      };
      tileGridObj[i][j] = tileObj;
    }
  }
  return tileGridObj;
};

/**
 * Given a TilePressure object, get its average pressure value
 * ** This is a temporary implementation as the average is not what we're actually using
 * @param tilePressureObj
 * @returns
 */
const calculateArrayAvg = (tilePressureObj: TilePressure) => {
  return (
    tilePressureObj.values.reduce((a, b) => a + b, 0) /
    tilePressureObj.values.length
  );
};

/**
 * Takes in the TileGridPressure object and transforms it into a
 * string used for outputting/logging of data
 * @param pressureObj
 * @returns
 */
export const tileGridPressureToStream = (pressureObj: TileGridPressure) => {
  var str = "";
  for (let i = 0; i < pressureObj.length; i++) {
    str += `${calculateArrayAvg(pressureObj[i])}    `;
  }

  return str;
};
