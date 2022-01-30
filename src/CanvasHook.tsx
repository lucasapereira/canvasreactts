import { useRef, useEffect } from "react";

const useCanvas = (
  draw: (
    ctx: CanvasRenderingContext2D,
    frameCount: number,
    canvas: HTMLCanvasElement | null
  ) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const context = canvas?.getContext("2d")!;

    let frameCount = 0;
    let animationFrameId: number;
    const render = () => {
      frameCount++;
      draw(context, frameCount, canvas);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);
  return canvasRef;
};
export default useCanvas;
