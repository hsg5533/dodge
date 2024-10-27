import { Bullet } from "./bullet.js";
import { User } from "./user.js";

export class Dodge {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.userX = width / 2;
    this.userY = height / 2;
    this.userSize = 4;
    this.userColor = "#FFFF5E";
    this.userSpeed = 2;

    this.bulletSize = 2;
    this.bulletColor = "#FF8D26";
    this.newBulletColor = "#0831fd";
    this.bulletSpeed = 0.2;

    this.numOfInitBullet = 30;
    this.newBulletTimeGap = 3;
    this.bullets = [];
    this.time = 0;

    this.timeDisplay = document.querySelector(".time");
    this.ballCountDisplay = document.querySelector(".ball");

    this.end = false;

    this.init();
  }

  init() {
    this.user = new User(
      this.width,
      this.height,
      this.userSize,
      this.userColor,
      this.userSpeed
    );
    for (let i = 0; i < this.numOfInitBullet; i++) {
      this.bullets.push(
        new Bullet(
          i,
          this.width,
          this.height,
          this.bulletSize,
          this.bulletColor,
          this.bulletSpeed
        )
      );
    }
    this.ballCountDisplay.innerText = `총알: ${this.numOfInitBullet}`;
  }

  createNewBullet() {
    this.bullets.push(
      new Bullet(
        this.bullets.length,
        this.width,
        this.height,
        this.bulletSize,
        this.newBulletColor,
        this.bulletSpeed
      )
    );
    this.ballCountDisplay.innerText = `총알: ${this.bullets.length}`;
  }

  onKeyDown(key) {
    if (!this.end) {
      this.user.keyDown(key);
    }
  }

  onKeyUp(key) {
    if (!this.end) {
      this.user.keyUp(key);
    }
  }

  openEndBox() {
    const endBox = document.querySelector(".endBox");
    const endTimeBox = endBox.querySelector(".endTime");
    const endTime = document.querySelector(".time");
    endBox.style.opacity = 1;
    endTimeBox.innerText = endTime.innerText + " 초";
  }

  draw(ctx, time) {
    const fixed2Time = ((time - 1000) / 1000).toFixed(2);
    const floorTime = Math.floor(fixed2Time);

    this.user.draw(ctx);
    if (!this.end) {
      this.user.update();
    }
    for (let i = 0; i < this.bullets.length; i++) {
      const bullet = this.bullets[i];
      bullet.draw(ctx);
      if (!this.end) {
        if (bullet.isConflict(this.user.x, this.user.y, this.user.size)) {
          this.end = true;
          this.openEndBox(fixed2Time);
        } else {
          bullet.action();
          this.timeDisplay.innerText = `시간: ${fixed2Time}`;
          if (
            floorTime % this.newBulletTimeGap === 0 &&
            floorTime !== this.time
          ) {
            this.createNewBullet();
            this.time = floorTime;
          }
        }
      }
    }
  }
}
