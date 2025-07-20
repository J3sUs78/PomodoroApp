// App.js
import { setupControls } from "./components/Controls.js";
import { updateDisplay } from "./components/Timer.js";
import { setupPreferences } from "./components/Timer.js";

function setupTheme() {
  const btn = document.getElementById('themeToggle');
  // Cargar preferencia
  if (localStorage.getItem('pomodoroTheme') === 'dark') {
    document.body.classList.add('dark');
    btn.textContent = '☀️';
  }
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    btn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('pomodoroTheme', isDark ? 'dark' : 'light');
  });
}

export function initApp() {
  setupTheme();
  setupPreferences();
  setupControls();
  updateDisplay();
}
