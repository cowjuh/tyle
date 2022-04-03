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
import { PlaygroundMode, TileGridObject } from "./components/types/types";
import { useRouteLocation } from "./components/hooks/useRouteLocation";
import { WebSocketProvider } from "./components/context/webSocketContext";
import { useWebSocket } from "./components/hooks/useWebSocket";

function App() {
  const [message, setMessage] = useState<string>();
  const { socket, onMessage } = useWebSocket();
  const [globalTileGridObject, setGlobalTileGridObject] =
    useState<TileGridObject>([]);
  const globalContextValue: GlobalContextProps = {
    globalTileGridObject: globalTileGridObject,
    setGlobalTileGridObject: setGlobalTileGridObject,
  };

  useEffect(() => {
    socket.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    socket.onmessage = (event) => {
      setMessage(JSON.stringify(event.data));
      setMessage(JSON.parse(JSON.stringify(event.data)));
      onMessage(event);
    };
  });

  return (
    <div className="App">
      <GlobalContext.Provider value={globalContextValue}>
        <WebSocketProvider>
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
        </WebSocketProvider>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
