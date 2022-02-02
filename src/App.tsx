import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MeuSidebar from "./components/generic/MeuSidebar";
import Jogo2 from "./pages/Jogo2";
import Pong from "./pages/Pong";

function App() {
  return (
    <div className="App">
      <h1>Jogos 2D</h1>
      <MeuSidebar />
      <Routes>
        <Route path="/pong" element={<Pong />} />
        <Route path="/jogo2" element={<Jogo2 />} />
        <Route path="/jogo3" element={<Jogo2 />} />
        <Route path="/jogo4" element={<Jogo2 />} />
        <Route path="/jogo5" element={<Jogo2 />} />
      </Routes>
    </div>
  );
}

export default App;
