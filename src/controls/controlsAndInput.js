function ControlsAndInput() {
  this.menuDisplayed = false;
  this.micStatus = false;

  // playback button displayed in the top left of the screen
  this.playbackButton = new PlaybackButton();
  this.restartButton = new RestartButton();
  this.speedButton = new SpeedButtons();

  this.mousePressed = function () {
    // check for the playback button clicks
    if (
      mouseX < this.playbackButton.x + this.playbackButton.width &&
      mouseX > this.playbackButton.x &&
      mouseY > this.playbackButton.y &&
      mouseY < this.playbackButton.height + this.playbackButton.y
    ) {
      this.playbackButton.hitCheck();
    }
    // check for restart button clicks
    else if (
      mouseX < this.restartButton.x + this.restartButton.width &&
      mouseX > this.restartButton.x &&
      mouseY > this.restartButton.y &&
      mouseY < this.restartButton.height + this.restartButton.y
    ) {
      this.restartButton.hitCheck();
    }
    // check for the speed buttons clicks
    else if (sound.isPlaying()) {
      this.speedButton.hitCheck();
    }
  };

  // responds to keyboard presses
  this.keyPressed = function (keycode) {
    console.log(keycode);
    // check for M key pressed to display menu
    if (keycode == 77) {
      this.menuDisplayed = !this.menuDisplayed;
    }
    // check number pressed to select vis
    if (keycode > 48 && keycode < 58) {
      var visNumber = keycode - 49;
      vis.selectVisual(vis.visuals[visNumber].name);
    }
    // checks for F key pressed to go fullscreen
    if (keycode == 70) {
      var fs = fullscreen();
      fullscreen(!fs);
    }
    // behaviour to enable and disable mic when pressing T
    if (keycode == 84) {
      if (!this.micStatus) {
        mic.start();
        this.micStatus = true;
      } else {
        mic.stop();
        this.micStatus = false;
      }
    }
  };

  // draws the playback button and potentially the menu
  this.draw = function () {
    push();
    fill("white");
    stroke("black");
    strokeWeight(2);
    textSize(34);

    // update hover states for all buttons
    this.playbackButton.updateHover();
    this.restartButton.updateHover();
    this.speedButton.updateHover();

    // draw buttons
    this.playbackButton.draw();
    this.restartButton.draw();
    this.speedButton.draw();

    // set cursor based on hover states
    if (
      this.playbackButton.isHovered ||
      this.restartButton.isHovered ||
      this.speedButton.isSpeedUpHovered ||
      this.speedButton.isSlowDownHovered
    ) {
      cursor("pointer");
    } else {
      cursor("default");
    }

    // only draw the menu if menu displayed is set to true
    if (this.menuDisplayed) {
      this.menu();
    } else if (!this.menuDisplayed && !this.playbackButton.playing) {
      textFont("Courier New");
      text("Press M to open menu", width / 2 - 200, 30);
    }
    pop();
  };

  this.menu = function () {
    // menu background
    push();
    fill(30, 30, 30, 200);
    noStroke();
    rect(width - 350, 0, 350, height);
    pop();

    // menu text
    push();
    textFont("Courier New");
    textSize(24);
    fill(255);
    textAlign(LEFT, TOP);

    // menu title
    text("Menu", width - 280, 20);

    // menu items
    let startY = 60;
    let lineHeight = 30;

    for (let i = 0; i < vis.visuals.length; i++) {
      let visualName = vis.visuals[i].name;
      text(i + 1 + ". " + visualName, width - 330, startY + i * lineHeight);
    }

    // additional options
    text(
      "Press F: Full Screen",
      width - 320,
      startY + vis.visuals.length * lineHeight + 20
    );
    text(
      "Press T: Toggle Mic",
      width - 320,
      startY + vis.visuals.length * lineHeight + 50
    );
    text(
      "Press M: Close Menu",
      width - 320,
      startY + vis.visuals.length * lineHeight + 80
    );
    pop();
  };
}
