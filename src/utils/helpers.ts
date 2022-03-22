import {
  Color,
  LocalStorageKeys as LocalStorageKey,
  NewProgramModeStateObject,
  ProgramModeStateObject,
  ProgramModeStatesObject,
  StateOperator,
  TileGridObject,
  TileIdObject,
  TileObject,
  TileRowObject,
} from "../components/types/types";
import {
  mockDrawModeTileGrid,
  mockProgramModeTileGrid,
} from "../mockData/mockTileObject";
import { DRAW_MODE_TILE_GRID_LS_OBJ } from "./constants";
import { v4 as uuidv4 } from "uuid";

// TODO findTileByIDandDelete function
// This will help manage existing tiles being removed from the grid
export const findTileByIDandDelete = (
  tileObjects: Array<TileObject>,
  tileId: string
) => {
  for (let i = 0; i < tileObjects.length; i++) {
    if (tileObjects[i].tileId === tileId) {
      // Check if surrounding tiles exist or if it's gonna stick out
      // If it's gonna stick out, just delete it
      // If there are surrounding tiles, it needs to turn into an empty space
    }
  }
};

// TODO detectPhysicalTiles Wifi integration
export const detectPhysicalTiles = async (): Promise<Array<TileObject>> => {
  return mockDrawModeTileGrid[0];
};

// Creates a unique LED ID from the tile id, led row index, and led index
export const constructLEDId = (
  tileId: string,
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
    localStorage.getItem(LocalStorageKey.DRAW_MODE_TILE_GRID_LS_OBJ) ||
      JSON.stringify(mockDrawModeTileGrid)
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
