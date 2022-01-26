export interface TileObject {
    tileId: string;
    ledConfig: Array<LEDRow>;
}

export interface SingleLEDPattern {
    color: LEDColours;
    opacity: number;
}

export type LEDRow = Array<SingleLEDPattern>;
export type LEDColours = "red" | "orange" | "yellow" | "green" | "cyan" | "blue" | "purple" | "pink" | "white" | "none"