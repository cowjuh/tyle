import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./components/pages/WelcomePage";
import PairingPage from "./components/pages/PairingPage";
import NotFound from "./components/pages/NotFound";
import DataMode from "./components/pages/Playground/DataMode";
import DrawingMode from "./components/pages/Playground/DrawMode";
import ProgramMode from "./components/pages/Playground/ProgramMode";
import {
  GlobalContext,
  GlobalContextProps,
} from "./components/context/globalContext";
import { useEffect, useState } from "react";
import {
  LocalStorageKeys,
  PlaygroundMode,
  TileGridObject,
  TileGridPressure,
} from "./components/types/types";
import { useRouteLocation } from "./components/hooks/useRouteLocation";
import { WebSocketProvider } from "./components/context/webSocketContext";
import { useWebSocket } from "./components/hooks/useWebSocket";
import {
  PressureDataContext,
  PressureDataProvider,
} from "./components/context/pressureDataContext";
import WebSocketHLC from "./components/WebSocketHLC";
import { getLocalStorageItem } from "./utils/helpers";

function App() {
  const [globalTileGridObject, setGlobalTileGridObject] =
    useState<TileGridObject>(
      getLocalStorageItem(LocalStorageKeys.GLOBAL_TILE_GRID_LS_OBJ || [])
    );
  const globalContextValue: GlobalContextProps = {
    globalTileGridObject: globalTileGridObject,
    setGlobalTileGridObject: setGlobalTileGridObject,
  };

  const [pressureDataObject, setPressureDataObject] =
    useState<TileGridPressure>([]);

  const pressureDataContextValue = {
    pressureDataObject,
    setPressureDataObject,
  };

  return (
    <div className="App">
      <GlobalContext.Provider value={globalContextValue}>
        <PressureDataContext.Provider value={pressureDataContextValue}>
          <WebSocketHLC>
            <Router>
              <Routes>
                <Route path="/" element={<WelcomePage />}></Route>
                <Route path="/pairing" element={<PairingPage />}></Route>
                <Route path="/playground/data" element={<DataMode />}></Route>
                <Route
                  path="/playground/draw"
                  element={<DrawingMode />}
                ></Route>
                <Route
                  path="/playground/program/*"
                  element={<ProgramMode />}
                ></Route>
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </Router>
          </WebSocketHLC>
        </PressureDataContext.Provider>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
