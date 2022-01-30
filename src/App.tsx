import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./components/pages/WelcomePage";
import PairingPage from "./components/pages/PairingPage";
import NotFound from "./components/pages/NotFound";
import DataMode from "./components/pages/Playground/DataMode";
import DrawingMode from "./components/pages/Playground/DrawingMode";
import ProgramMode from "./components/pages/Playground/ProgramMode";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />}></Route>
          <Route path="/pairing" element={<PairingPage />}></Route>
          <Route path="/playground/data" element={<DataMode />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
