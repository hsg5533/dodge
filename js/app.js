import { Bg } from "./bg.js";
import { Dodge } from "./dodge.js";

class App {
  constructor() {
    this.bgCanvas = document.querySelector("#bg");
    this.dodgeCanvas = document.querySelector("#dodge");

    this.bgCtx = this.bgCanvas.getContext("2d");
    this.dodgeCtx = this.dodgeCanvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.setSize(this.bgCanvas, this.bgCtx);
    this.setSize(this.dodgeCanvas, this.dodgeCtx);

    this.bg = new Bg(this.bgCanvas.clientWidth, this.bgCanvas.clientHeight);
    this.bg.draw(this.bgCtx);

    this.dodge = new Dodge(
      this.dodgeCanvas.clientWidth,
      this.dodgeCanvas.clientHeight
    );

    window.addEventListener("keydown", this.onKeyDown.bind(this), false);
    window.addEventListener("keyup", this.onKeyUp.bind(this), false);

    // requestAnimationFrame(this.animate.bind(this));

    let count = 1;
    const interval = setInterval(() => {
      count--;
      if (count === 0) {
        requestAnimationFrame(this.animate.bind(this));
        clearInterval(interval);
      }
    }, 1000);
  }

  setSize(canvas, ctx) {
    canvas.width = canvas.clientWidth * this.pixelRatio;
    canvas.height = canvas.clientHeight * this.pixelRatio;
    ctx.scale(this.pixelRatio, this.pixelRatio);
  }

  animate(t) {
    this.dodgeCtx.clearRect(
      0,
      0,
      this.dodgeCanvas.clientWidth,
      this.dodgeCanvas.clientHeight
    );
    this.dodge.draw(this.dodgeCtx, t);
    requestAnimationFrame(this.animate.bind(this));
  }

  onKeyDown(event) {
    const { key } = event;
    this.dodge.onKeyDown(key);
  }

  onKeyUp(event) {
    const { key } = event;
    this.dodge.onKeyUp(key);
  }
}

window.onload = () => {
  new App();
};
