export class User {
  constructor(width, height, size, color, speed) {
    this.x = width / 2;
    this.y = height / 2;
    this.width = width;
    this.height = height;
    this.size = size;
    this.color = color;
    this.speed = speed;

    this.vx = 0;
    this.vy = 0;

    this.minX = this.size;
    this.maxX = this.width - this.size;
    this.minY = this.size;
    this.maxY = this.height - this.size;
  }

  update() {
    const newX = this.x + this.vx * this.speed;
    const newY = this.y + this.vy * this.speed;

    if (newX >= this.minX && newX <= this.maxX) {
      this.x = newX;
    }

    if (newY >= this.minY && newY <= this.maxY) {
      this.y = newY;
    }
  }

  keyDown(key) {
    if (key === "ArrowRight") {
      this.vx = 1;
    } else if (key === "ArrowLeft") {
      this.vx = -1;
    } else if (key === "ArrowUp") {
      this.vy = -1;
    } else if (key === "ArrowDown") {
      this.vy = 1;
    }
  }

  keyUp(key) {
    if (key === "ArrowRight" || key === "ArrowLeft") {
      this.vx = 0;
    } else if (key === "ArrowUp" || key === "ArrowDown") {
      this.vy = 0;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
