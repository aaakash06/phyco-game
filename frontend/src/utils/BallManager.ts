import Ball from "./Ball";
export const obstacleSpacing = 40;
export const obstacleRadius = 5;
import { canvasHeight, canvasWidth } from "../App";
export default class BallManager {
  balls: Ball[];
  obstacles: { x: number; y: number }[];
  ctx: CanvasRenderingContext2D | null | undefined;

  constructor(ctx: CanvasRenderingContext2D | null | undefined) {
    ///initializing properties
    this.balls = [];
    this.obstacles = [];
    this.ctx = ctx;
    /// filling obstacles array

    for (let row = 2; row <= 18; row++) {
      const noOfObstacles = row + 1;
      for (let col = 0; col < noOfObstacles; col++) {
        const x = canvasWidth / 2 + obstacleSpacing * (col - row / 2);

        const y = 20 * (row - 1) + 300;
        const obstacle = { x, y };
        this.obstacles.push(obstacle);
      }
    }
    ////
    this.drawObstacles();
    this.update();
  }

  drawObstacles() {
    if (!this.ctx) return;
    if (!this.obstacles) return;
    this.obstacles.forEach((obstacle) => {
      this.ctx?.beginPath();
      this.ctx?.arc(obstacle.x, obstacle.y, obstacleRadius, 0, 2 * Math.PI);
      this.ctx!.fillStyle = "white";
      this.ctx?.fill();
      this.ctx?.closePath();
    });
  }

  addBall(x: number, y: number) {
    if (!this.ctx) return;
    const ball = new Ball(x, y, this.ctx, this.obstacles);
    this.balls.push(ball);
    // this.update(ball);
  }

  draw() {
    this.ctx?.clearRect(0, 0, canvasWidth, canvasHeight);
    this.drawObstacles();
    this.balls.forEach((ball) => {
      ball.draw();
      ball.update();
    });
  }
  // update(ball: Ball) {
  //   this.ctx?.clearRect(0, 0, canvasWidth, canvasHeight);
  //   ball.draw();
  //   requestAnimationFrame(ball.update.bind(ball));
  //   ball.update();
  //   this.update(ball);
  // }

  update() {
    this.draw();
    requestAnimationFrame(this.update.bind(this));
  }
}
