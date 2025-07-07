function RestartButton() {
  this.x = 60;
  this.y = 20;
  this.width = 30;
  this.height = 30;

  // track hover state
  this.isHovered = false;

  this.buttonColor = "#4CAF50";
  this.hoverColor = "#45a049";

  this.draw = function () {
    push();
    fill(this.isHovered ? this.hoverColor : this.buttonColor);
    noStroke();
    rect(this.x, this.y, this.width, this.height, 5);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text("R", this.x + this.width / 2, this.y + this.height / 2);
    pop();
  };

  // same logic as the playbackButton, checks if a click happens on the restartButton
  this.hitCheck = function () {
    if (
      sound.isPlaying() &&
      mouseX > this.x &&
      mouseX < this.x + this.width &&
      mouseY > this.y &&
      mouseY < this.y + this.height
    ) {
      // restart the song only if the song was already playing
      sound.stop();
      sound.play();
      return true;
    }
    return false;
  };

  // check hover state
  this.updateHover = function () {
    this.isHovered =
      mouseX > this.x &&
      mouseX < this.x + this.width &&
      mouseY > this.y &&
      mouseY < this.y + this.height;
  };
}
