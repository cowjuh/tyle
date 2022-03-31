import {
  DStreamTileGridPressure,
  DStreamTileShape,
} from "../components/types/types";

export const mockDataStream: DStreamTileGridPressure = [
  {
    tileId: 1,
    top: 100,
    bottom: 100,
    right: 100,
    left: 100,
    pressureValue: 100,
  },
  {
    tileId: 2,
    top: 100,
    bottom: 100,
    right: 100,
    left: 100,
    pressureValue: 100,
  },
  {
    tileId: 3,
    top: 100,
    bottom: 100,
    right: 100,
    left: 100,
    pressureValue: 100,
  },
];

export const mockTileGridShape: DStreamTileShape = [[1, 2, 3]];
