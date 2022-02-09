import { useState } from "react";
import { SidebarHorizContainer, SidebarInnerContainer } from "../../Containers";
import { useTileGridContext } from "../../hooks/useTileGridContext";
import { Color } from "../../types/types";
import ColorPicker from "../ColorPicker/ColorPicker";
import StatePreview from "./programMode/StatePreview";

const SidebarDrawMode = () => {
  const [updateTileGridObject] = useTileGridContext();
  const onSetColor = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    color: Color
  ) => {
    e.preventDefault();
    updateTileGridObject(color);
  };
  return (
    <>
      <ColorPicker onSetColor={onSetColor} />
    </>
  );
};

export default SidebarDrawMode;
