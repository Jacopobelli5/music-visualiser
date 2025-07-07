# Music Visualiser

This is a beginner-friendly music visualiser web app built with JavaScript and the p5.js library. It lets you play a song or use your microphone to generate beautiful, interactive visual effects that respond to sound.

## What the App Does
- **Plays a song** ("Closing Time" by Semisonic) and visualises the audio in real time.
- **Supports microphone input**: You can toggle the mic and see visuals react to your own sounds.
- **Multiple visualisation styles**: Choose from different visual effects (wave patterns, spectrum, ridge plots, needles, circle waves, noise, and a mic effect tunnel).
- **Interactive controls**: Play/pause, restart, change speed, switch visualisations, go fullscreen, and toggle the menu—all with simple buttons or keyboard shortcuts.

## Technologies Used
- **JavaScript**: The main programming language for the app logic.
- **[p5.js](https://p5js.org/)**: A creative coding library for drawing and animation.
- **[p5.sound](https://p5js.org/reference/#/libraries/p5.sound)**: For audio playback, analysis, and microphone input.
- **HTML/CSS**: For the web page structure and basic styling.

## How to Use
Use the on-screen controls or keyboard shortcuts:
   - `M`: Open/close menu
   - `1-6`: Switch visualisation
   - `F`: Fullscreen
   - `T`: Toggle microphone
   - Use the buttons for play, restart, and speed

## Project Structure
- `assets/` — Audio files
- `lib/` — p5.js and p5.sound libraries
- `src/` — All app code
  - `visualisations/` — Each visual effect in its own file
  - `controls/` — UI controls (buttons, menu, etc.)
  - `audio/` — Microphone effect
  - `main.js` — Main entry point

-----
> **Note:** This project was created as part of my journey learning the p5.js library. It reflects my exploration into creative coding and interactive audio-visual experiences. I hope it inspires you to experiment and have fun with p5.js too!
