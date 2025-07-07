function Spectrum() {
  this.name = "Spectrum";

  this.draw = function () {
    push();
    var spectrum = fourier.analyze();
    noStroke();

    for (var i = 0; i < spectrum.length; i++) {
      amplitude = spectrum[i];
      var r = amplitude;
      var g = map(i, 0, spectrum.length, 0, 255);
      fill(r, g, 0);

      var y = map(i, 0, spectrum.length, 0, height);
      var w = map(spectrum[i], 0, 255, 0, width);
      rect(0, y, w, -height / spectrum.length);
    }

    pop();
  };
}
