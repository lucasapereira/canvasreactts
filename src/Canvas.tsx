import React from "react";
import useCanvas from "./CanvasHook";

const Canvas = (props: {
  draw: (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement | null
  ) => void;
}) => {
  const { draw, ...rest } = props;
  const canvasRef = useCanvas(draw);

  return <canvas ref={canvasRef} {...rest} width={800} height={600} />;
};

export default Canvas;
