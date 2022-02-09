import { useContext, useEffect, useState } from "react";
import { mockTileGrid } from "../../../mockData/mockTileObject";
import { getDrawModeTileGridObject } from "../../../utils/helpers";
import {
  FullWidthHeightCenteredContainer,
  PlayGroundParentContainer,
} from "../../Containers";
import { TileGridContext } from "../../context/tileGridContext";
import Sidebar from "../../shared/Sidebar/Sidebar";
import { TileGrid } from "../../types/types";
import TileCanvas from "./TileCanvas";

const DrawingMode = () => {
  const [tileGridObject, setTileGridObject] = useState<TileGrid>(
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
    <TileGridContext.Provider value={tileGridContextValue}>
      <FullWidthHeightCenteredContainer>
        <PlayGroundParentContainer>
          <Sidebar />
          <TileCanvas />
        </PlayGroundParentContainer>
      </FullWidthHeightCenteredContainer>
    </TileGridContext.Provider>
  );
};

export default DrawingMode;
