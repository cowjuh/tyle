import { Colors, TileGrid, TileObject, TileRow } from "../components/types/types"
import { mockTileGrid } from "../mockData/mockTileObject"

// TODO findTileByIDandDelete function
// This will help manage existing tiles being removed from the grid
export const findTileByIDandDelete = (tileObjects: Array<TileObject>, tileId: string) => {
    for(let i=0; i<tileObjects.length; i++) {
        if(tileObjects[i].tileId === tileId) {
            // Check if surrounding tiles exist or if it's gonna stick out
            // If it's gonna stick out, just delete it
            // If there are surrounding tiles, it needs to turn into an empty space
        }
    }
}

// TODO detectPhysicalTiles Wifi integration
export const detectPhysicalTiles = async (): Promise<Array<TileObject>> => {
    return mockTileGrid[0];
}

// Creates a unique LED ID from the tile id, led row index, and led index
export const constructLEDId = (tileId: string, ledRowId: number, ledId: number): string => {
    return `${tileId}_${ledRowId}_${ledId}`;
}


/**
 * ---------------------------------------------------
 * LOCAL STORAGE TILE GRID OBJECT FUNCTIONS
 * ---------------------------------------------------
 */

// LS - Local Storage
export const DRAW_MODE_TILE_GRID_LS_OBJ = "tileGridDrawMode";
export const PROGRAM_MODE_TILE_GRID_LS_OBJ = "tileGridProgramMode";

// Wrapper to retrieve the local storage draw mode tile grid object
export const getDrawModeTileGridObject = (): TileGrid => {
    const tileObject: TileGrid = JSON.parse(localStorage.getItem(DRAW_MODE_TILE_GRID_LS_OBJ) || JSON.stringify(mockTileGrid));
    return tileObject;
}

// Wrapper to set the local storage draw mode tile grid object
export const setDrawModeTileGridObject = (tileObject: TileGrid) => {
    localStorage.setItem(DRAW_MODE_TILE_GRID_LS_OBJ, JSON.stringify(tileObject))
}


/**
 * ---------------------------------------------------
 * INTERFACE COLOR CHANGING LOGIC
 * The following functions will adjust both the UI and the localstorage tile grid object
 * such that their colours update. 
 * ---------------------------------------------------
 */
export const SELECTED_CLASSNAME = 'selected';

interface SelectedHash {
    [key: string]: number[][];
}

export const applyColorToTileGridObject = (color: Colors) => {
    var selectedIDs = [];
    var selectedTileIds = [];
    var selectedHash: SelectedHash = {};
    var drawModeTileObject = getDrawModeTileGridObject();
    const selectedLEDs: HTMLCollectionOf<Element> = document.getElementsByClassName(SELECTED_CLASSNAME);
    
    // Construct an array of the LED ids that have been selected
    for(let i=0; i < selectedLEDs.length; i++) {
        var elementId: string = selectedLEDs[i].id;
        var elementIdSubstring = elementId.split('_');
        var tileId = elementIdSubstring[0];
        var rowId = parseInt(elementIdSubstring[1]);
        var ledId = parseInt(elementIdSubstring[2]);
        selectedIDs.push(elementId);
        selectedTileIds.push(elementId.substring(0,elementId.indexOf('_')));

        if(!selectedHash[tileId]) {
            selectedHash[tileId] = [[rowId, ledId]]
        } else {
            selectedHash[tileId].push([rowId, ledId])
        }
    }

    console.log('SELECTED HASH: ', selectedHash)

    for(let i=0; i < drawModeTileObject.length; i++) {
        let tileRow: TileRow = drawModeTileObject[i];
        for(let j=0; j<tileRow.length; j++) {
            let tileObject: TileObject = tileRow[j];
            console.log(tileObject)
            let tileObjectId = tileObject.tileId;
            if(selectedHash[tileObjectId]) {
                console.log("the object were using:", selectedHash[tileObjectId])
                console.log('THIS TILE: ', tileObjectId)
                updateSingleTileLEDs(selectedHash[tileObjectId], tileObject)
            }
        }
    }

    function updateSingleTileLEDs (tile: number[][], tileObject: TileObject) {
        for(let i=0; i<tile.length; i++) {
            tileObject.ledConfig[tile[i][0]][tile[i][1]] = {color: color, opacity: 100};
        }
    }

    setDrawModeTileGridObject(drawModeTileObject);

}