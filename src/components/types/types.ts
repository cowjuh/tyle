export type TileGridObject = Array<TileRowObject>;
export type TileRowObject = Array<TileObject>;

export interface TileObject {
  tileId: string | "empty";
  ledConfig: Array<LEDRowT>;
}

export interface SingleLEDPattern {
  color: Color;
  opacity: number;
}

export type LEDRowT = Array<SingleLEDPattern>;
export enum Color {
  none = "",
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

export interface ProgramModeStateObject {
  operator: StateOperator;
  color: Color;
  primaryInputValue: number;
  secondaryInputValue?: number;
  selectedLEDs: Array<string>;
}
