import { canvasHeight, canvasWidth } from "../App";
import { obstacleRadius } from "./BallManager";
const RADIUS = 10;

export default class Ball {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  ctx: CanvasRenderingContext2D | null | undefined;
  obstacles: { x: number; y: number }[];

  constructor(
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D | null | undefined,
    obstacles: { x: number; y: number }[]
  ) {
    this.x = x;
    this.y = y;
    this.radius = RADIUS;
    this.vx = 0;
    this.vy = 2;
    this.ctx = ctx;
    this.update = this.update.bind(this); // Bind the update function
    this.obstacles = obstacles;
  }

  draw() {
    if (!this.ctx) return;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "red";
    this.ctx.fill();
    this.ctx.closePath();
  }

  update() {
    if (!this.ctx) return;

    //if inside the obstacles, then shift it
    this.obstacles.forEach((obstacle) => {
      const xObst = obstacle.x;
      const yObst = obstacle.y;
      const centDiff = obstacleRadius + RADIUS;
      const distance = Math.hypot(xObst - this.x, yObst - this.y);
      if (distance <= centDiff) {
        const angle = Math.atan((yObst - this.y) / (xObst - this.x));
        const speed = Math.hypot(this.vx, this.vy);
        this.vx = speed * Math.cos(angle) * 0.05;
        this.vy = speed * Math.sin(angle) * 0.3;
      }
      if (distance < centDiff) {
        const angle = Math.atan((yObst - this.y) / (xObst - this.x));
        this.vx += Math.cos(angle) * (centDiff - distance);
        this.vy += Math.sin(angle) * (centDiff - distance);
      }
    });

    //if insider the floors, then shift it.
    if (this.y + RADIUS > canvasHeight) {
      this.y = canvasHeight - RADIUS;
    } else if (this.y - RADIUS < 0) {
      this.y = RADIUS;
    }

    // if coliding the upper or lower level, inverse the velocity
    const isHittingLower = this.y + RADIUS >= canvasHeight;
    const isHittingUpper = this.y - RADIUS <= 0;
    if (isHittingLower || isHittingUpper) {
      this.vy = -this.vy;
    }

    // normal speed and postition change
    this.vy += 0.2;
    this.y += this.vy;
    this.x += this.vx;
  }
}
