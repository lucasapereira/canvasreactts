import React from "react";
import Canvas from "./Canvas";

import "./App.css";

let ballX: number = 50;
let ballY: number = 50;

let ballSpeedX: number = 10;
let ballSpeedY: number = 4;

let paddle1Y = 250;
const PADDLE_HEIGHT = 100;

function App() {
  const draw = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement | null
  ) => {
    const calculateMousePos = (evt: any | MouseEvent) => {
      let rect = canvas?.getBoundingClientRect();
      let root = document.documentElement;
      let mouseX = evt.clientX - rect!.left - root.scrollLeft;
      let mouseY = evt.clientY - rect!.top - root.scrollTop;

      console.log(mouseY);
      return {
        x: mouseX,
        y: mouseY,
      };
    };
    const callBoth = () => {
      moveEverything();
      drawEverything();
    };

    const moveEverything = () => {
      ballX = ballX + ballSpeedX;

      if (ballX > canvas!.width || ballX < 0) {
        ballSpeedX = -ballSpeedX;
      }

      ballY = ballY + ballSpeedY;

      if (ballY > canvas!.height || ballY < 0) {
        ballSpeedY = -ballSpeedY;
      }
    };

    const drawEverything = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas!.width, canvas!.height);

      colorRect(0, paddle1Y, 10, PADDLE_HEIGHT, "white");

      colorCircle(ballX, ballY, 10, "white");
    };

    const colorCircle = (
      centerX: number,
      centerY: number,
      radius: number,
      drawColor: string
    ) => {
      ctx.fillStyle = drawColor;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const colorRect = (
      leftX: number,
      topY: number,
      width: number,
      height: number,
      drawColor: string
    ) => {
      ctx.fillStyle = drawColor;
      ctx.fillRect(leftX, topY, width, height);
    };

    let framesPerSecond: number = 30;

    setInterval(() => callBoth(), 1000 / framesPerSecond);

    canvas?.addEventListener("mousemove", function (evt) {
      console.log("aaa");
      var mousePos = calculateMousePos(evt);
      paddle1Y = mousePos.y - PADDLE_HEIGHT / 2;
    });
  };

  return <Canvas draw={draw} />;
}

export default App;
