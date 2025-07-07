function MicEffect() {
  this.name = "MicEffect";

  // tunnel properties
  this.tunnelDepth = 4000;
  this.gap = 200;
  this.circles = []; // array to hold circles

  // initialise circles
  for (let d = 0; d < this.tunnelDepth; d += this.gap) {
    this.circles.push({
      dist: d,
      color: color(random(150, 255), random(150, 255), random(150, 255)),
      rotation: random(TWO_PI),
    });
  }

  // initialize particles
  this.particles = [];
  for (let i = 0; i < 100; i++) {
    this.particles.push({
      angle: random(TWO_PI),
      radius: random(50, 400),
      size: random(10, 20),
      speed: random(0.007, 0.01),
      color: color(random(0, 55), random(150, 255), random(50, 155)),
    });
  }

  this.draw = function () {
    angleMode(RADIANS);
    background(0);
    push();
    translate(width / 2, height / 2);

    // check if the mic is activated
    if (controls.micStatus) {
      // get microphone input level
      let vol = mic.getLevel();
      let volMapped = map(vol, 0, 1, 1, 20);

      // draw circles
      for (let i = 0; i < this.circles.length; i++) {
        let circle = this.circles[i];
        let dynamicSpeed = 6;
        circle.dist -= volMapped * dynamicSpeed; // move circle backward based on volume

        // reset circle when it reaches the end of the tunnel
        if (circle.dist < 0) {
          circle.dist = this.tunnelDepth;
          circle.color = color(
            random(150, 255),
            random(150, 255),
            random(150, 255)
          );
          circle.rotation = random(TWO_PI);
        }

        // calculate size and transparency based on distance
        let ratio = circle.dist / this.tunnelDepth;
        let circleSize = width * (1 - ratio);
        let alpha = map(circle.dist, 0, this.tunnelDepth, 255, 50);

        // draw the circles
        push();
        rotate(circle.rotation + frameCount * 0.005);
        noFill();
        stroke(
          red(circle.color),
          green(circle.color),
          blue(circle.color),
          alpha
        );
        strokeWeight(4);
        ellipse(0, 0, circleSize, circleSize);
        pop();
      }

      // draw particles
      for (let i = 0; i < this.particles.length; i++) {
        let p = this.particles[i];

        p.angle += p.speed;

        // particle positions
        let x = p.radius * cos(p.angle);
        let y = p.radius * sin(p.angle);

        // dynamically adjust the particle size based on microphone input
        let dynamicSize = map(vol, 0, 1, p.size, p.size * 3);

        // draw the particle
        stroke(0, 80, 0);
        strokeWeight(3);
        fill(p.color);
        ellipse(x, y, dynamicSize, dynamicSize);
      }
    } else {
      // if mic is not activated, draw static circles and particles
      for (let i = 0; i < this.circles.length; i++) {
        let circle = this.circles[i];
        let ratio = circle.dist / this.tunnelDepth;
        let circleSize = width * (1 - ratio);
        let alpha = map(circle.dist, 0, this.tunnelDepth, 255, 50);

        push();
        rotate(circle.rotation + frameCount * 0.005);
        noFill();
        stroke(
          red(circle.color),
          green(circle.color),
          blue(circle.color),
          alpha
        );
        strokeWeight(4);
        ellipse(0, 0, circleSize, circleSize);
        pop();
      }

      for (let i = 0; i < this.particles.length; i++) {
        let p = this.particles[i];

        let x = p.radius * cos(p.angle);
        let y = p.radius * sin(p.angle);

        stroke(0, 80, 0);
        strokeWeight(3);
        fill(p.color);
        ellipse(x, y, p.size, p.size);
      }
    }

    pop();
  };
}
