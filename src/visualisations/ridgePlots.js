function RidgePlots() {
  this.name = "Ridgeplots";
  var output = [];
  var startX;
  var startY;
  var endY;
  var spectrumWidth;
  var speed = 2;
  var waveHeight = 100;

  this.setup = function () {
    // set initial positions and dimensions for the visualization
    startX = width / 5;
    endY = height / 5;
    startY = height - endY;
    spectrumWidth = (width / 5) * 3;
  };

  this.addWave = function (waveform) {
    var wave = [];
    for (var i = 0; i < waveform.length; i++) {
      var x = map(i, 0, waveform.length, startX, startX + spectrumWidth);
      var y = map(waveform[i], -1, 1, startY, startY - waveHeight);
      wave.push({ x: x, y: y });
    }
    output.push(wave);
  };

  this.draw = function () {
    push();
    background(0);
    stroke(255);
    strokeWeight(2);

    if (sound.isPlaying()) {
      // get the current waveform and add a new wave every 40 frames
      var waveform = fourier.waveform();
      if (frameCount % 40 == 0) {
        this.addWave(waveform);
      }

      // move each wave upwards and remove it if it reaches the top
      for (var i = 0; i < output.length; i++) {
        var wave = output[i];
        for (var j = 0; j < wave.length; j++) {
          wave[j].y -= speed;
        }
        if (wave[0].y < endY) {
          output.splice(i, 1);
        }
      }
    }

    // draw all stored waves as lines
    noFill();
    for (var i = 0; i < output.length; i++) {
      beginShape();
      for (var j = 0; j < output[i].length; j++) {
        vertex(output[i][j].x, output[i][j].y);
      }
      endShape();
    }

    // draw a boundary box around the spectrum
    rect(startX, endY, spectrumWidth, height - endY * 2);
    pop();
  };
}
