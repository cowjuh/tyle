export type TileGrid = Array<TileRow>
export type TileRow = Array<TileObject>

export interface TileObject {
    tileId: string | "empty";
    ledConfig: Array<LEDRow>;
}

export interface SingleLEDPattern {
    color: Colors;
    opacity: number;
}

export type LEDRow = Array<SingleLEDPattern>;
export enum Colors {
    red = "#FF5B5B",
    orange = "#FF9820",
    yellow = "#FFDB7D",
    green = "#72ED7E",
    cyan = "#82DCD7",
    blue = "#3443C7",
    purple = "#807EE7",
    pink = "#E767DA",
    white = "#FFFFFF",
    none = "",
}