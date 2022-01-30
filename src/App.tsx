import React from "react";
import Canvas from "./Canvas";

import "./App.css";

function App() {
  const draw = (
    ctx: CanvasRenderingContext2D,
    frameCount: number,
    canvas: HTMLCanvasElement | null
  ) => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas!.width, canvas!.height);

    ctx.fillStyle = "red";
    ctx.fillRect(100, 200, 50, 25);
  };

  return <Canvas draw={draw} />;
}

export default App;
