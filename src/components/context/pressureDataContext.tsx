import { createContext } from "react";
import { TileGridPressure } from "../types/types";

export const PressureDataContext = createContext<TileGridPressure>([]);
