import { useContext, useEffect, useState } from "react";
import { mockTileGrid } from "../../../mockData/mockTileObject";
import { getDrawModeTileGridObject } from "../../../utils/helpers";
import {
  FullWidthHeightCenteredContainer,
  PlayGroundParentContainer,
} from "../../Containers";
import { DrawModeContext } from "../../context/drawModeContext";
import Sidebar from "../../shared/Sidebar/Sidebar";
import { TileGridObject } from "../../types/types";
import TileCanvas from "./TileCanvas";

const DataMode = () => {
  const [tileGridObject, setTileGridObject] = useState<TileGridObject>(
    getDrawModeTileGridObject || mockTileGrid
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

export default DataMode;
