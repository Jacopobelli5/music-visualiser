function PlaybackButton() {
  this.x = 20;
  this.y = 20;
  this.width = 30;
  this.height = 30;

  // flag to determine whether to play or pause after button click
  this.playing = false;

  // track hover state
  this.isHovered = false;

  this.buttonColor = "#4CAF50";
  this.hoverColor = "#45a049";

  this.draw = function () {
    push();
    fill(this.isHovered ? this.hoverColor : this.buttonColor);
    noStroke();
    rect(this.x, this.y, this.width, this.height, 5);

    // draw play/pause icon
    fill(255);
    if (this.playing) {
      // draw pause icon
      rect(this.x + 8, this.y + 8, 4, this.height - 16);
      rect(this.x + 18, this.y + 8, 4, this.height - 16);
    } else {
      // draw play icon
      triangle(
        this.x + 10,
        this.y + 8,
        this.x + 10,
        this.y + this.height - 8,
        this.x + this.width - 10,
        this.y + this.height / 2
      );
    }
    pop();
  };

  // checks for clicks on the button, starts or pauses playback
  this.hitCheck = function () {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.width &&
      mouseY > this.y &&
      mouseY < this.y + this.height
    ) {
      if (sound.isPlaying()) {
        sound.pause();
      } else {
        sound.loop();
      }
      this.playing = !this.playing;
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
