function WavePattern() {
  this.name = "Wavepattern";
  this.draw = function () {
    push();
    noFill();
    stroke(155, 250, 0);
    strokeWeight(4);
    beginShape();
    var wave = fourier.waveform();
    for (var i = 0; i < wave.length; i++) {
      var x = map(i, 0, wave.length, 0, width);
      var y = map(wave[i] / 5, -1, 1, 0, height);
      vertex(x, y);
    }
    endShape();
    pop();
  };
}
