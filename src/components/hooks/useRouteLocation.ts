import { PlaygroundModeEnum } from "../types/types";

export const useRouteLocation = () => {
  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  const playgroundRoute =
    PlaygroundModeEnum[
      pathArray[pathArray.length - 1] as keyof typeof PlaygroundModeEnum
    ];
  return [playgroundRoute];
};
