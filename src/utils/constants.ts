import {
  Color,
  LEDConfig,
  LEDRowT,
  SingleLEDPattern,
  StateOperator,
} from "./types";

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

// CHART JS
export const CHART_OPTIONS = {
  scales: {
    y: {
      beginAtZero: true,
    },
    x: {
      ticks: {
        maxTicksLimit: 10,
      },
      beginAtZero: true,
    },
  },
};

export const CHART_DEFAULT_SETTINGS = {
  fill: false,
  lineTension: 0,
  borderWidth: 0.5,
  borderDash: [],
  borderDashOffset: 0.0,
  pointBackgroundColor: "#fff",
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBorderColor: "rgba(220,220,220,1)",
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
};
