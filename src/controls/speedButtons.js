function SpeedButtons() {
  // speed-up button properties
  this.speedUpX = 140;
  this.speedUpY = 20;
  this.speedUpWidth = 30;
  this.speedUpHeight = 30;

  // slow-down button properties
  this.slowDownX = 100;
  this.slowDownY = 20;
  this.slowDownWidth = 30;
  this.slowDownHeight = 30;

  // track hover states
  this.isSpeedUpHovered = false;
  this.isSlowDownHovered = false;

  this.buttonColor = "#4CAF50";
  this.hoverColor = "#45a049";

  this.draw = function () {
    // draw speed-up button
    push();
    fill(this.isSpeedUpHovered ? this.hoverColor : this.buttonColor);
    noStroke();
    rect(
      this.speedUpX,
      this.speedUpY,
      this.speedUpWidth,
      this.speedUpHeight,
      5
    );
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(
      ">>",
      this.speedUpX + this.speedUpWidth / 2,
      this.speedUpY + this.speedUpHeight / 2
    );
    pop();

    // draw slow-down button
    push();
    fill(this.isSlowDownHovered ? this.hoverColor : this.buttonColor);
    noStroke();
    rect(
      this.slowDownX,
      this.slowDownY,
      this.slowDownWidth,
      this.slowDownHeight,
      5
    );
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(
      "<<",
      this.slowDownX + this.slowDownWidth / 2,
      this.slowDownY + this.slowDownHeight / 2
    );
    pop();
  };

  this.hitCheck = function () {
    if (!sound || !sound.isPlaying()) return false;

    // check speed-up button click
    if (
      mouseX > this.speedUpX &&
      mouseX < this.speedUpX + this.speedUpWidth &&
      mouseY > this.speedUpY &&
      mouseY < this.speedUpY + this.speedUpHeight
    ) {
      var currentRate = sound.rate();
      var newRate = currentRate === 1 ? 1.5 : 1; // toggle between 1x and 1.5x
      sound.rate(newRate);
      console.log("Speed: " + newRate + "x");
      return true;
    }

    // check slow-down button click
    if (
      mouseX > this.slowDownX &&
      mouseX < this.slowDownX + this.slowDownWidth &&
      mouseY > this.slowDownY &&
      mouseY < this.slowDownY + this.slowDownHeight
    ) {
      var currentRate = sound.rate();
      var newRate = currentRate === 1 ? 0.75 : 1; // toggle between 1x and 0.75x
      sound.rate(newRate);
      console.log("Speed: " + newRate + "x");
      return true;
    }

    return false;
  };

  // check hover states
  this.updateHover = function () {
    this.isSpeedUpHovered =
      mouseX > this.speedUpX &&
      mouseX < this.speedUpX + this.speedUpWidth &&
      mouseY > this.speedUpY &&
      mouseY < this.speedUpY + this.speedUpHeight;

    this.isSlowDownHovered =
      mouseX > this.slowDownX &&
      mouseX < this.slowDownX + this.slowDownWidth &&
      mouseY > this.slowDownY &&
      mouseY < this.slowDownY + this.slowDownHeight;
  };
}
