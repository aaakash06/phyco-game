const RADIUS = 40;

export default class Ball {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  ctx: CanvasRenderingContext2D | null | undefined;

  constructor(
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D | null | undefined
  ) {
    this.x = x;
    this.y = y;
    this.radius = RADIUS;
    this.vx = 0;
    this.vy = 2;
    this.ctx = ctx;
    this.update = this.update.bind(this); // Bind the update function
    this.draw();
    this.update();
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

    this.ctx.clearRect(0, 0, 500, 500);
    const isHittingLower = this.y + RADIUS > 500;
    const isHittingUpper = this.y - RADIUS < 0;
    if (isHittingLower || isHittingUpper) {
      this.vy = -this.vy;
    }

    this.vy += 0.2;

    if (isHittingLower) {
      this.y = 500 - RADIUS;
    } else if (isHittingUpper) {
      this.y = 50;
    } else {
      this.y += this.vy;
    }
    this.y += this.vy;
    this.draw();
    requestAnimationFrame(this.update);
  }
}
