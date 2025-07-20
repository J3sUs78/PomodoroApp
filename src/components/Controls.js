// Controls.js
import { startTimer, pauseTimer, resetTimer } from "./Timer.js";

export function setupControls() {
  document.querySelector(".controls button:nth-child(1)").addEventListener("click", startTimer);
  document.querySelector(".controls button:nth-child(2)").addEventListener("click", pauseTimer);
  document.querySelector(".controls button:nth-child(3)").addEventListener("click", resetTimer);
}
