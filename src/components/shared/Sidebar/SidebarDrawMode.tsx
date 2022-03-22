import { useDrawModeContext } from "../../hooks/useDrawModeContext";
import { Color } from "../../types/types";
import ColorPicker from "../ColorPicker/ColorPicker";

const SidebarDrawMode = () => {
  const [updateTileGridObject] = useDrawModeContext();

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
