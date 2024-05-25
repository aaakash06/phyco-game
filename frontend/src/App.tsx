"use client";

import React, { useEffect, useRef, useState } from "react";
import Ball from "./utils/Ball";
const Home = () => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null | undefined>(
    null
  );

  // const [ball, setBall] = useState<Ball | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!canvasRef) return;
    const ctx = canvasRef.current?.getContext("2d");
    setCtx(ctx);
  }, [canvasRef]);

  return (
    <div className="flex justify-between items-center">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        style={{ backgroundColor: "gray" }}
      ></canvas>
      <button
        className="bg-black text-white"
        onClick={() => {
          new Ball(100, 100, ctx);
          // setBall(ball);
          // ball.draw();
          // update();
          // requestAnimationFrame(update);
        }}
      >
        Drop a Ball
      </button>
    </div>
  );
};

export default Home;
