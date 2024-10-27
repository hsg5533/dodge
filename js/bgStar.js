export class BgStar {
  constructor(width, height, size, color) {
    this.size = size;
    this.color = color;
    this.gap = 5;
    this.maxX = width - this.gap;
    this.maxY = height - this.gap;

    this.x = this.getRandNum(this.gap, this.maxX);
    this.y = this.getRandNum(this.gap, this.maxY);
  }

  getRandNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
