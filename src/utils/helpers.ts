import {
  Color,
  ProgramModeStateObject,
  StateOperator,
  TileGridObject,
  TileObject,
  TileRowObject,
} from "../components/types/types";
import { mockTileGrid } from "../mockData/mockTileObject";

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
  return mockTileGrid[0];
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

// LS - Local Storage
export const DRAW_MODE_TILE_GRID_LS_OBJ = "tileGridDrawMode";
export const PROGRAM_MODE_TILE_GRID_LS_OBJ = "tileGridProgramMode";

// Wrapper to retrieve the local storage draw mode tile grid object
export const getDrawModeTileGridObject = (): TileGridObject => {
  const tileObject: TileGridObject = JSON.parse(
    localStorage.getItem(DRAW_MODE_TILE_GRID_LS_OBJ) ||
      JSON.stringify(mockTileGrid)
  );
  return tileObject;
};

// Wrapper to set the local storage draw mode tile grid object
export const setDrawModeTileGridObject = (tileObject: TileGridObject) => {
  localStorage.setItem(DRAW_MODE_TILE_GRID_LS_OBJ, JSON.stringify(tileObject));
};

/**
 * ---------------------------------------------------
 * INTERFACE COLOR CHANGING LOGIC
 * The following functions will return the updated tile grid object
 * ---------------------------------------------------
 */
export const SELECTED_CLASSNAME = "selected";

interface SelectedHash {
  [key: string]: number[][];
}

export const getUpdatedTileGridObject = (
  color: Color,
  drawModeTileObject: TileGridObject
) => {
  /**
   * We create a clone of the drawModeTileObject because JavaScript SUCKS
   * and uses references which then messes up the context update.
   */
  var updatedDrawModeTileObject = JSON.parse(
    JSON.stringify(drawModeTileObject)
  );
  var selectedIDs = [];
  var selectedTileIds = [];
  var selectedHash: SelectedHash = {};

  // Find all elements with the "selected" class name
  const selectedLEDs: HTMLCollectionOf<Element> =
    document.getElementsByClassName(SELECTED_CLASSNAME);

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

/**
 * ---------------------------------------------------
 * PROGRAM MODE LOGIC
 * ---------------------------------------------------
 */

// Constructs a ProgramModeStateObject
export const constructStateObject = (
  color: Color,
  operator: StateOperator,
  input1: number,
  input2?: number
) => {
  const selectedIDs = [];
  const selectedLEDs: HTMLCollectionOf<Element> =
    document.getElementsByClassName(SELECTED_CLASSNAME);
  for (let i = 0; i < selectedLEDs.length; i++) {
    selectedIDs.push(selectedLEDs[i].id);
  }
  const stateObject: ProgramModeStateObject = {
    color: color,
    operator: operator,
    primaryInputValue: input1,
    secondaryInputValue: input2,
    selectedLEDs: selectedIDs,
  };

  return stateObject;
};
