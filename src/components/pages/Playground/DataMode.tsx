import { useEffect, useState } from "react";
import { mockTileGrid } from "../../../mockData/mockTileObject";
import {
  DRAW_MODE_TILE_GRID_LS_OBJ,
  getDrawModeTileGridObject,
} from "../../../utils/helpers";
import {
  FullWidthHeightCenteredContainer,
  PlayGroundParentContainer,
} from "../../Containers";
import Sidebar from "../../shared/Sidebar/Sidebar";
import TileCanvas from "./TileCanvas";

const DataMode = () => {
  const [tileGridObject, setTileGridObject] = useState(
    getDrawModeTileGridObject()
  );

  useEffect(() => {
    if (localStorage.getItem(DRAW_MODE_TILE_GRID_LS_OBJ) === null) {
      localStorage.setItem(
        DRAW_MODE_TILE_GRID_LS_OBJ,
        JSON.stringify(mockTileGrid)
      );
    }
  }, []);

  useEffect(() => {
    window.addEventListener("storage", () => {
      console.log("Hellooo");
      setTileGridObject(getDrawModeTileGridObject());
    });
  }, []);

  return (
    <FullWidthHeightCenteredContainer>
      <PlayGroundParentContainer>
        <Sidebar />
        <TileCanvas tileGrid={tileGridObject} />
      </PlayGroundParentContainer>
    </FullWidthHeightCenteredContainer>
  );
};

export default DataMode;
