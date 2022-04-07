import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./components/pages/WelcomePage";
import PairingPage from "./components/pages/PairingPage";
import NotFound from "./components/pages/NotFound";
import DataMode from "./components/pages/Playground/DataMode";
import DrawingMode from "./components/pages/Playground/DrawMode";
import ProgramMode from "./components/pages/Playground/ProgramMode";
import { GlobalContextProvider } from "./components/context/globalContext";
import { PressureDataProvider } from "./components/context/pressureDataContext";
import WebSocketHLC from "./components/hlc/WebSocketHLC";
import { DrawModeContextProvider } from "./components/context/drawModeContext";
import { ProgramModeContextProvider } from "./components/context/programModeContext";
import { DataModeContextProvider } from "./components/context/dataModeContext";

function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <DataModeContextProvider>
          <DrawModeContextProvider>
            <ProgramModeContextProvider>
              <PressureDataProvider>
                <WebSocketHLC>
                  <Router>
                    <Routes>
                      <Route path="/" element={<WelcomePage />}></Route>
                      <Route path="/pairing" element={<PairingPage />}></Route>
                      <Route
                        path="/playground/data"
                        element={<DataMode />}
                      ></Route>
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
              </PressureDataProvider>
            </ProgramModeContextProvider>
          </DrawModeContextProvider>
        </DataModeContextProvider>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
