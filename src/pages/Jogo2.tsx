import React from "react";
import Canvas from "./Canvas";

function Pong() {
  let framesPerSecond = 30;
  let ballX = 75;
  let ballSpeedX = 5;

  let ballY = 5;
  let ballSpeedY = 7;
  let paddleX = 400;

  const PADDLE_WIDTH = 100;
  const PADDLE_THICKNESS = 10;
  const PADDLE_DIST_FROM_EDGE = 60;

  const draw = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement | null
  ) => {
    const calculateMousePos = (evt: any | MouseEvent) => {
      let rect = canvas?.getBoundingClientRect();
      let root = document.documentElement;
      let mouseX = evt.clientX - rect!.left - root.scrollLeft;
      // let mouseY = evt.clientY - rect!.top - root.scrollTop;

      paddleX = mouseX - PADDLE_WIDTH / 2;

      // return {
      //   x: mouseX,
      //   y: mouseY,
      // };
    };

    const ballReset = () => {
      ballX = canvas?.width! / 2;
      ballY = canvas?.height! / 2;
      ballSpeedX = 5;
    };

    canvas?.addEventListener("mousemove", calculateMousePos);
    const updateAll = () => {
      moveAll();
      drawAll();
    };

    const moveAll = () => {
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      if (ballY > canvas?.height!) {
        ballReset();
        ballSpeedY = -ballSpeedY;
      }
      if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
      }

      if (ballX > canvas?.width!) {
        ballSpeedX = -ballSpeedX;
      }
      if (ballX < 0) {
        ballSpeedX = -ballSpeedX;
      }

      let paddleTopEdgeY = canvas?.height! - PADDLE_DIST_FROM_EDGE;
      let paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;

      let paddleLeftEdgeX = paddleX;
      let paddleRightEdgeX = paddleX + PADDLE_WIDTH;

      if (
        ballY > paddleTopEdgeY &&
        ballY < paddleBottomEdgeY &&
        ballX > paddleLeftEdgeX &&
        ballX < paddleRightEdgeX
      ) {
        let ballDistFromPaddleCenterX = ballX - (paddleX + PADDLE_WIDTH / 2);
        ballSpeedX = ballDistFromPaddleCenterX * 0.35;
        ballSpeedY = -ballSpeedY;
      }
    };
    const drawAll = () => {
      colorRect(0, 0, canvas?.width!, canvas?.height!, "Black");

      colorCircle(ballX, ballY, 20, "white");

      colorRect(
        paddleX,
        canvas?.height! - PADDLE_DIST_FROM_EDGE,
        PADDLE_WIDTH,
        PADDLE_THICKNESS,
        "white"
      );
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

    setInterval(updateAll, 1000 / framesPerSecond);
  };

  return <Canvas draw={draw} />;
}

export default Pong;
