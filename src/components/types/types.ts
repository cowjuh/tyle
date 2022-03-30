/**
 * ---------------------------------------------------------------------
 * LOCAL STORAGE TYPES
 * ---------------------------------------------------------------------
 */
export enum LocalStorageKeys {
  DRAW_MODE_TILE_GRID_LS_OBJ = "tileGridDrawMode",
  PROGRAM_MODE_TILE_GRID_LS_OBJ = "tileGridProgramMode",
  PROGRAM_MODE_STATES_LIST_LS_OBJ = "statesList",
}
/**
 * ---------------------------------------------------------------------
 * USER INTERFACE OUTPUT TYPES
 * All types describing the UI's output types to the ESP32
 * along with intermediary artifacts used in the UI.
 * ---------------------------------------------------------------------
 */

export type TileGridObject = Array<TileRowObject>;
export type TileRowObject = Array<TileObject>;

export interface TileObject {
  tileId: number;
  ledConfig: Array<LEDRowT>;
}

export interface SingleLEDPattern {
  color: Color;
  opacity: number;
}

export type LEDRowT = Array<SingleLEDPattern>;
export enum Color {
  none = "#393842",
  white = "#FFFFFF",
  red = "#FF5B5B",
  orange = "#FF9820",
  yellow = "#FFDB7D",
  green = "#72ED7E",
  cyan = "#82DCD7",
  blue = "#3443C7",
  purple = "#807EE7",
  pink = "#E767DA",
}

export type PlaygroundMode = PlaygroundModeEnum;
export enum PlaygroundModeEnum {
  data = "data",
  draw = "draw",
  program = "program",
}

/**
 * -----------------------------------------------------
 *  PROGRAM MODE TYPES
 * -----------------------------------------------------
 */

export type ProgramModeStatesObject = Array<ProgramModeStateObject>;

export enum StateOperator {
  greaterThan = "greaterThan",
  lessThan = "lessThan",
  between = "between",
  equalTo = "equalTo",
  notEqualTo = "notEqualTo",
}

export type StateOperatorType = `${StateOperator}`;

export enum StateOperatorSymbols {
  greaterThan = ">",
  lessThan = "<",
  between = "-",
  equalTo = "=",
  notEqualTo = "!=",
}

export interface ProgramModeStateObject {
  id: string;
  operator: StateOperator;
  color: Color;
  primaryInputValue: number;
  secondaryInputValue?: number;
  selectedLEDs: Array<string>;
  tileGridObject?: TileGridObject;
  tileId: TileIdObject;
}

export interface NewProgramModeStateObject
  extends Omit<ProgramModeStateObject, "id"> {}

export enum ProgramModeRouteEnum {
  base = "",
  new = "new",
  edit = "edit",
}

export interface TileIdObject {
  letter: string;
  num: number;
}

/**
 * ---------------------------------------------------------------------
 * ESP32 STREAM IN TYPES
 * All types describing ESP32's input data stream into the UI
 * ---------------------------------------------------------------------
 */

export type DStreamTileGridPressure = Array<DStreamPressureObject>;

// Tile grid object for the incoming data stream from the ESP32
export interface DStreamPressureObject {
  tileId: number | "empty";
  left: number;
  top: number;
  right: number;
  bottom: number;
  pressureValue: number;
}

/**
 * Array representation of physical tile grid layout
 */
export type DStreamTileShape = number[][];

/**
 * WEB SOCKET RELATED
 */
export enum WSMessageType {
  sync_grid = "sync_grid",
  led_pattern = "led_pattern",
}

export interface WSMessageObject {
  type: WSMessageType;
  data: Object;
}
