import { BgStar } from "./bgStar.js";

export class Bg {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.bgColor = "#000000";
    this.starSize = 0.6;
    this.starColors = ["#C20C27", "#FFFFFF", "#0F01B8", "#FBFF44"];
    this.numOfStar = 40;

    this.stars = [];

    this.init();
  }

  init() {
    for (let i = 0; i < this.numOfStar; i++) {
      const colorNum = Math.floor(Math.random() * this.starColors.length);
      this.stars.push(
        new BgStar(
          this.width,
          this.height,
          this.starSize,
          this.starColors[colorNum]
        )
      );
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.bgColor;
    ctx.fillRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      star.draw(ctx);
    }
  }
}
