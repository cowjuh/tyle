import { PlaygroundModeEnum } from "../types/types";

export const useRouteLocation = () => {
  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  const playgroundRoute =
    PlaygroundModeEnum[pathArray[2] as keyof typeof PlaygroundModeEnum];
  return [playgroundRoute];
};
