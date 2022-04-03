import { useContext, useState } from "react";
import { getDrawModeTileGridObject } from "../../../utils/helpers";
import {
  FullWidthHeightCenteredContainer,
  PlayGroundParentContainer,
} from "../../Containers";
import { DrawModeContext } from "../../context/drawModeContext";
import { GlobalContext } from "../../context/globalContext";
import Sidebar from "../../shared/Sidebar/Sidebar";
import { TileGridObject } from "../../types/types";
import TileCanvas from "./DrawModeTileCanvas";

const DataMode = () => {
  const { globalTileGridObject } = useContext(GlobalContext);
  const [drawModeTileGridObject, setDrawModeTileGridObject] =
    useState<TileGridObject>(getDrawModeTileGridObject || globalTileGridObject);

  const tileGridContextValue = {
    drawModeTileGridObject,
    setDrawModeTileGridObject,
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
