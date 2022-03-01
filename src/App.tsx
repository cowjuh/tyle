import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import WelcomePage from "./components/pages/WelcomePage";
import PairingPage from "./components/pages/PairingPage";
import NotFound from "./components/pages/NotFound";
import DataMode from "./components/pages/Playground/DataMode";
import DrawingMode from "./components/pages/Playground/DrawMode";
import ProgramMode from "./components/pages/Playground/ProgramMode";
import { GlobalContext } from "./components/context/globalContext";
import { useState } from "react";
import { PlaygroundMode, PlaygroundModeEnum } from "./components/types/types";
import { useRouteLocation } from "./components/hooks/useRouteLocation";

// TODO Update routes to use enum

function App() {
  const [currentRoute] = useRouteLocation();
  const [playgroundMode, setPlaygroundMode] =
    useState<PlaygroundMode>(currentRoute);
  const globalContextValue = {
    playgroundMode: playgroundMode,
    setPlaygroundMode,
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
            <Route path="/playground/program" element={<DataMode />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Router>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
