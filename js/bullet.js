export class Bullet {
  constructor(index, width, height, size, color, speed) {
    this.size = size;
    this.color = color;

    this.minX = this.size;
    this.minY = this.size;
    this.maxX = width - this.minX;
    this.maxY = height - this.minY;

    this.speed = speed;

    if (index === 0) {
      this.x = this.minX;
      this.y = this.minY;
      this.vx = 7;
      this.vy = 7;
    } else if (index === 1) {
      this.x = this.maxX;
      this.y = this.minY;
      this.vx = -7;
      this.vy = 7;
    } else {
      const choiceXY = this.getRandNum(0, 2); // 0이면 x 랜덤 / 1이면 y 랜덤
      const choiceMinMax = this.getRandNum(0, 2); // 0이면 min 1이면 max

      this.x = choiceMinMax === 0 ? this.minX : this.maxX;
      this.y = choiceMinMax === 0 ? this.minY : this.maxY;

      this.x = choiceXY === 0 ? this.getRandNum(this.minX, this.maxX) : this.x;
      this.y = choiceXY === 0 ? this.y : this.getRandNum(this.minY, this.maxY);
      if (choiceXY === 0) {
        this.vx = this.getRandNum(-8, 8);
        this.vy =
          choiceMinMax === 0
            ? this.getRandNum(2, 8)
            : this.getRandNum(2, 8) * -1;
      } else {
        this.vy = this.getRandNum(8, 8);
        this.vx =
          choiceMinMax === 0
            ? this.getRandNum(2, 8)
            : this.getRandNum(2, 8) * -1;
      }
    }
  }

  getRandNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  action() {
    const newX = this.x + this.vx * this.speed;
    const newY = this.y + this.vy * this.speed;

    if (
      newX < this.minX ||
      newX > this.maxX ||
      newY < this.minY ||
      newY > this.maxY
    ) {
      if (newX < this.minX || newX > this.maxX) {
        this.vx *= -1;
      } else if (newY < this.minY || newY > this.maxY) {
        this.vy *= -1;
      }
    } else {
      this.x = newX;
      this.y = newY;
    }
  }

  isConflict(x, y, radius) {
    const dx = this.x - x;
    const dy = this.y - y;
    const dist = Math.sqrt(dx ** 2 + dy ** 2);

    if (this.size + radius >= dist) {
      return true;
    }
    return false;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
