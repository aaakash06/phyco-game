import { canvasHeight, canvasWidth } from "../App";
import { obstacleRadius } from "./BallManager";
const RADIUS = 6;

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
      // const xObst = obstacle.x;
      // const yObst = obstacle.y;
      // const centDiff = obstacleRadius + RADIUS;
      // const distance = Math.hypot(xObst - this.x, yObst - this.y);
      // if (distance < centDiff) {
      //   const angle = Math.atan((yObst - this.y) / (xObst - this.x));
      //   this.x += Math.cos(angle) * (centDiff - distance);
      //   this.y += Math.sin(angle) * (centDiff - distance);
      // }

      // if (distance <= centDiff) {
      //   const angleWithHorizontal = Math.atan2(yObst - this.y, xObst - this.x);
      //   const speed = Math.hypot(this.vx, this.vy);
      //   const velocityAngle = Math.atan2(this.vy, this.vx);
      //   const finalVelocityAngle =
      //     Math.PI - (2 * angleWithHorizontal + velocityAngle);

      //   this.vx = -speed * Math.cos(finalVelocityAngle) * 0.4;
      //   this.vy = speed * Math.sin(finalVelocityAngle) * 0.2;
      //   // this.vx = -this.vx * 0.4;
      //   // this.vy = -this.vy * 0.8;
      // }

      const dist = Math.hypot(this.x - obstacle.x, this.y - obstacle.y);
      if (dist < this.radius + obstacleRadius) {
        // Calculate collision angle
        const angle = Math.atan2(this.y - obstacle.y, this.x - obstacle.x);
        // Reflect velocity
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        this.vx = Math.cos(angle) * speed * 0.4;
        this.vy = Math.sin(angle) * speed * 0.8;

        // Adjust position to prevent sticking
        const overlap = this.radius + obstacleRadius - dist;
        this.x += Math.cos(angle) * overlap;
        this.y += Math.sin(angle) * overlap;
      }
    });

    // normal speed and postition change
    this.vy += 0.1;
    this.y += this.vy;
    this.x += this.vx;

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
  }
}
