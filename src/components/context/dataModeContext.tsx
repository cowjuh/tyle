import { createContext, ReactChild, useState } from "react";

interface DataModeContextProps {
  showChart: boolean;
  setShowChart: (showChart: boolean) => void;
}

export const DataModeContext = createContext<DataModeContextProps>({
  showChart: false,
  setShowChart: () => {},
});

interface IDataModeContextProvider {
  children: ReactChild;
}

export const DataModeContextProvider = (props: IDataModeContextProvider) => {
  const [showChart, setShowChart] = useState<boolean>(false);
  const tileGridContextValue = {
    showChart,
    setShowChart,
  };
  return (
    <DataModeContext.Provider value={tileGridContextValue}>
      {props.children}
    </DataModeContext.Provider>
  );
};
