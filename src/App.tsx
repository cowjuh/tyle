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
import { useState } from "react";
import { PlaygroundMode } from "./components/types/types";
import { useRouteLocation } from "./components/hooks/useRouteLocation";
import {
  mockDrawModeTileGrid,
  mockProgramModeTileGrid,
} from "./mockData/mockTileObject";
import { mockDataStream } from "./mockData/mockInput";

function App() {
  const [currentRoute] = useRouteLocation();
  useState<PlaygroundMode>(currentRoute);
  const globalContextValue: GlobalContextProps = {
    globalTileGridObject: mockProgramModeTileGrid,
  };
  return (
    <div className="App">
      <GlobalContext.Provider value={globalContextValue}>
        <Router>
          <Routes>
            <Route path="/" element={<WelcomePage />}></Route>
            <Route path="/pairing" element={<PairingPage />}></Route>
            <Route path="/playground/data" element={<DataMode />}></Route>
            <Route path="/playground/draw" element={<DrawingMode />}></Route>
            <Route
              path="/playground/program/*"
              element={<ProgramMode />}
            ></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Router>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
