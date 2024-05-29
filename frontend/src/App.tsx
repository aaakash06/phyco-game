"use client";

import { useEffect, useRef, useState } from "react";

import BallManager, {
  obstacleRadius,
  obstacleSpacing,
} from "./utils/BallManager";

export const canvasHeight = 800;
export const canvasWidth = 800;

const Home = () => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null | undefined>(
    null
  );

  const [ballManager, setBallManager] = useState<BallManager | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!canvasRef) return;
    const ctx = canvasRef.current?.getContext("2d");
    setCtx(ctx);
    setBallManager(new BallManager(ctx));
  }, [ctx]);

  return (
    <div className="flex justify-between items-center">
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ backgroundColor: " gray" }}
      ></canvas>
      <button
        className="bg-black text-white"
        onClick={() => {
          // const x = (Math.random() * 1000) % 800;
          const x =
            canvasWidth / 2 + (Math.random() - 0.5) * obstacleSpacing * 2;
          ballManager?.addBall(x, 200);
        }}
      >
        Drop a Ball
      </button>
    </div>
  );
};

export default Home;
