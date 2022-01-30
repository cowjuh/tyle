import { TileObject } from "../components/types/types"
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

export const constructLEDId = (tileId: string, ledRowId: number, ledId: number): string => {
    return `${tileId}_${ledRowId}_${ledId}`;
}