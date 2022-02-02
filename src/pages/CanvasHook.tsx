import { useRef, useEffect } from "react";

const useCanvas = (
  draw: (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement | null
  ) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d")!;
    draw(context, canvas);
  }, [draw]);
  return canvasRef;
};
export default useCanvas;
