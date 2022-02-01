import React from "react";
import Canvas from "./Canvas";

import "./App.css";

let ballX: number = 50;
let ballY: number = 50;

let ballSpeedX: number = 10;
let ballSpeedY: number = 4;

let paddle1Y = 250;
let paddle2Y = 250;

let player1Score = 0;
let player2Score = 0;

let showWinningScreen = false;

const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
const WINNING_SCORE = 3;

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

      return {
        x: mouseX,
        y: mouseY,
      };
    };
    const callBoth = () => {
      moveEverything();
      drawEverything();
    };

    const computerMovement = () => {
      let paddle2YCenter = paddle2Y + PADDLE_HEIGHT / 2;

      if (paddle2YCenter < ballY + 35) {
        paddle2Y += 6;
      } else if (paddle2YCenter > ballY - 35) {
        paddle2Y -= 6;
      }
    };

    const moveEverything = () => {
      if (showWinningScreen) {
        return;
      }
      computerMovement();
      ballX = ballX + ballSpeedX;

      if (ballX < 0) {
        if (ballY < paddle1Y || ballY > paddle1Y + PADDLE_HEIGHT) {
          player2Score += 1;
          ballReset();
        } else {
          ballSpeedX = -ballSpeedX;

          let deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
          ballSpeedY = deltaY * 0.35;
        }
      }

      if (ballX > canvas!.width) {
        if (ballY < paddle2Y || ballY > paddle2Y + PADDLE_HEIGHT) {
          player1Score += 1;
          ballReset();
        } else {
          ballSpeedX = -ballSpeedX;
          let deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
          ballSpeedY = deltaY * 0.35;
        }
      }

      ballY = ballY + ballSpeedY;

      if (ballY > canvas!.height || ballY < 0) {
        ballSpeedY = -ballSpeedY;
      }
    };

    const ballReset = () => {
      ballX = canvas!.width / 2;
      ballY = canvas!.height / 2;
      ballSpeedX = -ballSpeedX;

      if (player1Score === WINNING_SCORE || player2Score === WINNING_SCORE) {
        player1Score = 0;
        player2Score = 0;
        showWinningScreen = true;
      }
    };

    const drawEverything = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas!.width, canvas!.height);

      if (showWinningScreen) {
        return;
      }

      //do jogador
      colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");

      colorRect(
        canvas!.width - PADDLE_THICKNESS,
        paddle2Y,
        PADDLE_THICKNESS,
        PADDLE_HEIGHT,
        "white"
      );

      colorCircle(ballX, ballY, 10, "white");

      ctx.fillText("Player 1: " + player1Score, 100, 100);
      ctx.fillText("Player 2: " + player2Score, 600, 100);
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
      var mousePos = calculateMousePos(evt);
      paddle1Y = mousePos.y - PADDLE_HEIGHT / 2;
    });
  };

  return <Canvas draw={draw} />;
}

export default App;
