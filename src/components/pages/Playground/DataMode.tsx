import { useEffect, useState } from "react";
import { mockTileGrid } from "../../../mockData/mockTileObject";
import { getDrawModeTileGridObject } from "../../../utils/helpers";
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
