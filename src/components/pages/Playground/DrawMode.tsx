import { useState } from "react";
import { mockDrawModeTileGrid } from "../../../mockData/mockTileObject";
import { getDrawModeTileGridObject } from "../../../utils/helpers";
import {
  FullWidthHeightCenteredContainer,
  PlayGroundParentContainer,
} from "../../Containers";
import { DrawModeContext } from "../../context/drawModeContext";
import Sidebar from "../../shared/Sidebar/Sidebar";
import { TileGridObject } from "../../types/types";
import TileCanvas from "./TileCanvas";

const DrawingMode = () => {
  const [tileGridObject, setTileGridObject] = useState<TileGridObject>(
    getDrawModeTileGridObject || mockDrawModeTileGrid
  );
  const [tempVal, setTempVal] = useState(true);
  const tileGridContextValue = {
    tileGridObject,
    setTileGridObject,
    tempVal,
    setTempVal,
  };

  return (
    <DrawModeContext.Provider value={tileGridContextValue}>
      <FullWidthHeightCenteredContainer>
        <PlayGroundParentContainer>
          <Sidebar />
          <TileCanvas />
        </PlayGroundParentContainer>
      </FullWidthHeightCenteredContainer>
    </DrawModeContext.Provider>
  );
};

export default DrawingMode;
