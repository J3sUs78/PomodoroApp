# Pomodoro App

Una aplicación Pomodoro simple y modularizada en JavaScript puro.

## Estructura del proyecto

```
PomodoroApp/
│
├── src/
│   ├── components/
│   │   ├── Timer.js
│   │   └── Controls.js
│   ├── App.js
│   └── index.js
│
├── public/
│   └── index.html
│
├── styles/
│   └── style.css
│
├── README.md
```

## ¿Cómo ejecutarlo localmente?

1. Abre el archivo `public/index.html` en tu navegador.
2. Asegúrate de que tu navegador soporte módulos ES6 (`type="module"` en el script).




Plan de acción (resumido por fases):
Fase 1: Ciclos completos Pomodoro y contador
Alternar automáticamente entre trabajo, descanso corto y largo.
Mostrar el tipo de ciclo actual y el contador de ciclos completados.
Fase 2: Notificaciones y sonidos
Notificación de escritorio al terminar cada ciclo.
Sonido al finalizar cada ciclo.
Fase 3: Personalización y preferencias
Permitir elegir tiempos de trabajo y descansos.
Guardar preferencias en localStorage.
Fase 4: Historial y estadísticas
Mostrar ciclos completados hoy.
Guardar historial de sesiones.
Fase 5: Mejoras visuales
Animaciones en el temporizador.
Temas claro/oscuro.
Fase 6: Responsive y accesibilidad
Mejorar visualización en móviles.
Accesibilidad para lectores de pantalla.
