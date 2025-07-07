function CircleWave() {
  this.name = "circle wave";
  var stars = [];

  // initialise stars
  for (var i = 0; i < 500; i++) {
    stars.push({
      x: random(-width, width),
      y: random(-height, height),
      dx: random(-1, 1),
      dy: random(-1, 1),
      size: random(3, 8),
      opacity: random(180, 255),
      baseSpeed: random(0.5, 2),
    });
  }

  // draw the wave form to the screen
  this.draw = function () {
    angleMode(DEGREES);
    var bgColor = lerpColor(color(10, 10, 20), color(10, 0, 40), 0.5);
    background(bgColor);
    fourier.analyze();

    push();
    translate(width / 2, height / 2);

    // get energy levels for different frequency bands
    var bassEnergy = fourier.getEnergy("bass");
    var lowMidEnergy = fourier.getEnergy("lowMid");
    var highMidEnergy = fourier.getEnergy("highMid");
    var trebleEnergy = fourier.getEnergy("treble");

    this.drawStars(bassEnergy, trebleEnergy);
    this.drawCircleWaveform(bassEnergy, color(255, 100, 180));
    this.drawCircleWaveform(lowMidEnergy, color(10, 225, 100));
    this.drawCircleWaveform(highMidEnergy, color(140, 150, 205));
    this.drawCircleWaveform(trebleEnergy, color(255, 25, 100));

    pop();
  };

  // method to draw and move the stars
  this.drawStars = function (bass, treble) {
    var speedBoost = map(bass, 0, 255, 0.5, 3);
    var jitter = map(treble, 0, 255, 0, 0.8);

    // update positions first
    for (var i = 0; i < stars.length; i++) {
      var star = stars[i];

      // base movement with speed boost
      star.x += star.dx * star.baseSpeed * speedBoost;
      star.y += star.dy * star.baseSpeed * speedBoost;

      // add treble jitter
      star.x += random(-jitter, jitter);
      star.y += random(-jitter, jitter);

      // strong bass beats cause direction changes
      if (bass > 200 && random() < 0.1) {
        star.dx = random(-1, 1);
        star.dy = random(-1, 1);
      }

      // screen wrapping with buffer
      var buffer = 50;
      if (star.x < -width - buffer) star.x = width + buffer;
      if (star.x > width + buffer) star.x = -width - buffer;
      if (star.y < -height - buffer) star.y = height + buffer;
      if (star.y > height + buffer) star.y = -height - buffer;
    }

    // draw connections between nearby stars
    for (var i = 0; i < stars.length; i++) {
      for (var j = i + 1; j < stars.length; j++) {
        var d = dist(stars[i].x, stars[i].y, stars[j].x, stars[j].y);
        if (d < 100) {
          stroke(255, 105, 165, map(d, 0, 100, 255, 0));
          line(stars[i].x, stars[i].y, stars[j].x, stars[j].y);
        }
      }
    }

    // draw stars
    for (var i = 0; i < stars.length; i++) {
      var star = stars[i];
      noStroke();
      fill(255, 100, 200, star.opacity);
      ellipse(star.x, star.y, star.size, star.size);
    }
  };

  // method to draw the circle waveform
  this.drawCircleWaveform = function (energy, col) {
    var radius = map(energy, 0, 255, 100, 400);
    noFill();
    stroke(col);
    strokeWeight(6);
    ellipse(0, 0, radius * 2, radius * 2);
  };
}
