// Timer.js
let timer;
let isRunning = false;
let timeLeft = 0;

// Estados para ciclos Pomodoro
let cycleType = 'Trabajo'; // 'Trabajo', 'Descanso corto', 'Descanso largo'
let cycleCount = 0;
let cyclesBeforeLongBreak = 4;

function getDurations() {
  return {
    work: parseInt(document.getElementById("workTime").value) * 60,
    short: parseInt(document.getElementById("shortBreak").value) * 60,
    long: parseInt(document.getElementById("longBreak").value) * 60,
  };
}

export function startTimer() {
  if (isRunning) return;

  if (timeLeft <= 0) {
    // Si es la primera vez o tras reset, establecer el tiempo según el ciclo actual
    const durations = getDurations();
    if (cycleType === 'Trabajo') timeLeft = durations.work;
    else if (cycleType === 'Descanso corto') timeLeft = durations.short;
    else if (cycleType === 'Descanso largo') timeLeft = durations.long;
  }
  updateDisplay();

  isRunning = true;
  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      isRunning = false;
      handleCycleEnd();
    }
  }, 1000);
}

function handleCycleEnd() {
  let nextType, nextDuration;
  if (cycleType === 'Trabajo') {
    cycleCount++;
    saveSession();
    updateHistory();
    if (cycleCount % cyclesBeforeLongBreak === 0) {
      nextType = 'Descanso largo';
      nextDuration = getDurations().long / 60;
    } else {
      nextType = 'Descanso corto';
      nextDuration = getDurations().short / 60;
    }
  } else {
    nextType = 'Trabajo';
    nextDuration = getDurations().work / 60;
  }
  // Cambiar el ciclo
  cycleType = nextType;
  updateStatus();
  // Preparar el siguiente ciclo
  timeLeft = 0;
  updateDisplay();
  // Lanzar notificación y sonido (sin alert)
  const mensaje = `¡Ciclo terminado! Ahora: ${cycleType} (${nextDuration} min)`;
  sendNotification(mensaje);
  playSound();
}

export function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

export function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  cycleType = 'Trabajo';
  cycleCount = 0;
  timeLeft = getDurations().work;
  updateStatus();
  updateDisplay();
}

export function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");
}

function updateStatus() {
  // Eliminar referencias a cycleType y cycleCount
  // document.getElementById('cycleType').textContent = cycleType;
  // document.getElementById('cycleCount').textContent = cycleCount;
  document.getElementById('cycleTitle').textContent = cycleType;
  updateMotivationalMsg();
}

function updateMotivationalMsg() {
  const msg = document.getElementById('motivationalMsg');
  if (!msg) return;
  if (cycleType === 'Trabajo') {
    msg.textContent = '¡Concéntrate y da lo mejor de ti!';
  } else if (cycleType === 'Descanso corto') {
    msg.textContent = '¡Tómate un respiro, relájate un momento!';
  } else if (cycleType === 'Descanso largo') {
    msg.textContent = '¡Gran trabajo! Disfruta tu descanso largo.';
  }
}

// Inicializar status al cargar
updateStatus();

// --- Fase 2: Notificaciones y sonidos ---
function sendNotification(msg) {
  if (Notification && Notification.permission === "granted") {
    new Notification("Pomodoro App", { body: msg });
  }
}

function playSound() {
  const audio = new Audio("https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa1c82.mp3");
  audio.play();
}

// Solicitar permiso de notificaciones al cargar
if (typeof Notification !== "undefined" && Notification.permission !== "granted") {
  Notification.requestPermission();
}

// --- Fase 3: Guardar y cargar preferencias ---
function savePreferences() {
  const prefs = {
    work: document.getElementById("workTime").value,
    short: document.getElementById("shortBreak").value,
    long: document.getElementById("longBreak").value
  };
  localStorage.setItem("pomodoroPrefs", JSON.stringify(prefs));
}

function loadPreferences() {
  const prefs = JSON.parse(localStorage.getItem("pomodoroPrefs"));
  if (prefs) {
    document.getElementById("workTime").value = prefs.work;
    document.getElementById("shortBreak").value = prefs.short;
    document.getElementById("longBreak").value = prefs.long;
  }
}

// Asignar eventos para guardar preferencias al cambiar los inputs
export function setupPreferences() {
  ["workTime", "shortBreak", "longBreak"].forEach(id => {
    document.getElementById(id).addEventListener("change", savePreferences);
  });
  loadPreferences();
}

// --- Fase 4: Historial y estadísticas ---
function saveSession() {
  const today = new Date().toISOString().slice(0, 10);
  let history = JSON.parse(localStorage.getItem('pomodoroHistory')) || {};
  if (!history[today]) history[today] = 0;
  history[today]++;
  localStorage.setItem('pomodoroHistory', JSON.stringify(history));
}

function getCyclesToday() {
  const today = new Date().toISOString().slice(0, 10);
  let history = JSON.parse(localStorage.getItem('pomodoroHistory')) || {};
  return history[today] || 0;
}

function updateHistory() {
  document.getElementById('cyclesToday').textContent = getCyclesToday();
  let history = JSON.parse(localStorage.getItem('pomodoroHistory')) || {};
  let html = '<ul>';
  Object.keys(history).sort().reverse().forEach(date => {
    html += `<li>${date}: ${history[date]} ciclos</li>`;
  });
  html += '</ul>';
  document.getElementById('sessionHistory').innerHTML = html;
}

// Llamar al cargar
updateHistory();
