import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BASE_ROUTE_PROGRAM_MODE } from "../../../utils/constants";
import { ProgramModeRouteEnum } from "../../../utils/types";
import StateEditor from "./programMode/StateEditor";
import StateList from "./programMode/StateList";

const SidebarProgramMode = () => {
  let location = useLocation();
  const [path, setPath] = useState<ProgramModeRouteEnum>(
    ProgramModeRouteEnum.base
  );

  useEffect(() => {
    const pathnameArray = location.pathname.split("/");
    if (location.pathname === BASE_ROUTE_PROGRAM_MODE) {
      setPath(ProgramModeRouteEnum.base);
    } else if (pathnameArray[pathnameArray.length - 1] === "new") {
      setPath(ProgramModeRouteEnum.new);
    } else {
      setPath(ProgramModeRouteEnum.edit);
    }
  }, [setPath, location]);

  return (
    <>
      {path === ProgramModeRouteEnum.base && <StateList />}
      {path !== ProgramModeRouteEnum.base && <StateEditor />}
    </>
  );
};

export default SidebarProgramMode;
