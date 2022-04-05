import {
  Color,
  LEDConfig,
  LEDRowT,
  SingleLEDPattern,
  StateOperator,
} from "../components/types/types";

export const MAX_PRESSURE_SENSOR_VALUE = 255;

// TILE GRID
export const TILE_CANVAS_ID = "tile-canvas-container";
export const TILE_CONTAINER_CLASSNAME = "tile-container";

// TILE GRID OBJ INITIALIZATION
export const defaultLEDPattern: SingleLEDPattern = {
  color: Color.none,
  opacity: 100,
};
export const defaultLEDRow: LEDRowT = Array(4).fill(defaultLEDPattern);
export const defaultLEDConfig: LEDConfig = Array(4).fill(defaultLEDRow);

// LOCAL STORAGE
export const DRAW_MODE_TILE_GRID_LS_OBJ = "tileGridDrawMode";
export const PROGRAM_MODE_TILE_GRID_LS_OBJ = "tileGridProgramMode";
export const PROGRAM_MODE_STATES_LIST_LS_OBJ = "statesList";
export const GLOBAL_TILE_GRID_LS_OBJ = "tileGridGlobal";

// ROUTING
export const BASE_ROUTE_DATA_MODE = "/playground/data";
export const BASE_ROUTE_DRAW_MODE = "/playground/draw";
export const BASE_ROUTE_PROGRAM_MODE = "/playground/program";
export const ROUTE_PROGRAM_MODE_NEW = BASE_ROUTE_PROGRAM_MODE + "/new";

// PROGRAM MODE STATES
export const DROPDOWN_OPTIONS = [
  StateOperator.greaterThan,
  StateOperator.lessThan,
  StateOperator.equalTo,
  StateOperator.notEqualTo,
  StateOperator.between,
];

// WEBSOCKETS
export const RGB_STR_PADDING = 3;
