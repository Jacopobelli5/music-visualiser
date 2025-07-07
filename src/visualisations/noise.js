function Noise() {
  this.name = "Noise";
  this.lines = [];
  this.numLines = 20;

  // using a for loop to intialise line's properties for each line
  for (let i = 0; i < this.numLines; i++) {
    this.lines.push({
      prog: random(1000),
      noiseStep: random(0.01, 0.03),
      offsetX: random(200),
      offsetY: random(height),
      speedX: random(0.3, 1.8),
      speedY: random(0.3, 3),
    });
  }

  this.draw = function () {
    background(0);
    // initialise colour variables
    var red = 255;
    var green = random(10, 155);
    var blue = random(90, 185);

    stroke(red, green, blue);
    strokeWeight(1);
    var spectrum = fourier.analyze();
    // loop through all lines and draw each based on its properties
    for (let i = 0; i < this.lines.length; i++) {
      let line = this.lines[i]; // reference the current line
      noFill();
      beginShape();
      // create a curved line using vertices calculated with Perlin noise
      for (let j = 0; j < 70; j++) {
        let x = map(
          noise(j * line.noiseStep + line.prog),
          0,
          1,
          line.offsetX,
          line.offsetX + width
        );
        let y = map(
          noise(j * line.noiseStep + line.prog + 1000),
          0,
          1,
          line.offsetY,
          line.offsetY + height
        );
        vertex(x, y);
      }
      endShape();

      // use spectrum data and assign it to variables for each frequency
      let bassEnergy = fourier.getEnergy("bass");
      let midEnergy = fourier.getEnergy("mid");
      let trebleEnergy = fourier.getEnergy("treble");

      // dynamically change lines based on energy levels
      line.offsetX -= line.speedX * (bassEnergy / 200);
      line.offsetY += line.speedY * (midEnergy / 200);
      if (line.offsetX > width) line.offsetX = 0; // reset x-offset if it exceeds canvas width
      if (line.offsetY > height) line.offsetY = 0; // reset y-offset if it exceeds canvas height
      if (line.offsetX < 0) line.offsetX = 100; // reset x-offset if it falls below 0
      if (line.offsetY < 0) line.offsetY = height; // reset y-offset if it falls below 0
      line.prog += bassEnergy / 2550;
      line.noiseStep += trebleEnergy / 500000;
      // reset noise step if it exceeds a threshold
      if (line.noiseStep > 0.18) {
        line.noiseStep = 0.02;
      }
    }
  };
}
