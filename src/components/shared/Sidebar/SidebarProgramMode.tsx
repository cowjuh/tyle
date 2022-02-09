import { useState } from "react";
import { SidebarHorizContainer, SidebarInnerContainer } from "../../Containers";
import State from "./programMode/State";
import StatePreview from "./programMode/StatePreview";

const SidebarProgramMode = () => {
  const [previewing, setPreviewing] = useState<boolean>(true);
  const onExpand = () => {
    previewing && setPreviewing(!previewing);
  };

  const onSave = () => {
    setPreviewing(true);
  };
  return (
    <>
      <SidebarHorizContainer>
        <span>States</span>
        <span>+</span>
      </SidebarHorizContainer>

      <SidebarInnerContainer onClick={onExpand}>
        {previewing && <StatePreview />}
        {!previewing && <State onSave={onSave} />}
      </SidebarInnerContainer>
    </>
  );
};

export default SidebarProgramMode;
