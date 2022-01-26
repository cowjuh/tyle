export interface TileObject {
    tileId: string;
    ledConfig: Array<LEDRow>;
}

export interface SingleLEDPattern {
    color: LEDColours;
    opacity: number;
}

export type LEDRow = Array<SingleLEDPattern>;
export type LEDColours = Colors
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