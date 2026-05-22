# Manual de desarrollo del loop jugable PET

## 1. Propósito del documento

Este documento define la especificación técnica para implementar el loop de jugabilidad de la demo PET sobre el mapa interactivo existente de FES Acatlán.

El mapa ya existe como MVP funcional. Por tanto, este manual no debe rehacer la lógica cartográfica, la vectorización, la ubicación de puntos ni el sistema base de búsqueda/filtro. El objetivo es agregar una capa jugable ligera encima del mapa actual: el usuario toca contenedores PET, recolecta fragmentos informativos, ocasionalmente encuentra basura, desbloquea progreso educativo y visualiza un placeholder de minijuego “en desarrollo”.

La implementación debe estar lista para Codex o un agente de desarrollo. El resultado esperado es una refactorización controlada, modular y mantenible.

---

## 2. Alcance

### Incluido

La implementación debe incluir:

- Separación del código actual en archivos especializados.
- `index.html` como ensamblador mínimo.
- Carga del mapa existente.
- Carga de `puntos.json` como fuente espacial.
- Nuevo archivo `content_pet.json` como fuente educativa.
- Nuevo motor de juego en `game.js`.
- Persistencia en `localStorage`.
- Botón visible de reinicio con confirmación.
- Notificaciones de resultado.
- Estado de contenedores recolectados.
- Panel de progreso.
- Placeholder de minijuego con texto “en desarrollo”.
- Pseudológica clara para primer intento, segundo intento y distribución del contenido.
- Estilo compatible con la preferencia técnica del proyecto: HTML/CSS/JS nativo, sin frameworks, con Web Components o custom tags cuando sea razonable.

### Excluido

No se debe rehacer en esta etapa:

- El SVG del mapa.
- Las coordenadas de los contenedores.
- La herramienta de captura de coordenadas.
- El sistema de búsqueda y filtrado del mapa, salvo que sea necesario para integrarlo con el loop.
- Un minijuego real.
- Una economía de puntos compleja.
- Mecánicas secundarias para basura.
- Backend.
- Autenticación.
- Base de datos remota.
- APIs externas.

---

## 3. Principios técnicos

La demo debe mantenerse ligera, auditable y fácil de desplegar en GitHub Pages.

Principios obligatorios:

1. Usar HTML5, CSS y JavaScript nativo.
2. No usar React, Vue, Angular, Svelte ni frameworks equivalentes.
3. Usar módulos ES (`type="module"`).
4. Mantener `index.html` como ensamblador, no como archivo monolítico.
5. Separar datos espaciales de datos educativos.
6. No modificar `puntos.json` para guardar estado jugable.
7. No modificar el SVG para guardar estado jugable.
8. Usar `localStorage` para persistencia local.
9. Mantener el juego funcional sin servidor backend.
10. Permitir que el juego corra en servidor local con `python3 -m http.server`.
11. Evitar dependencias externas.
12. Mantener accesibilidad básica: teclado, estados visibles, mensajes comprensibles.

---

## 4. Estructura recomendada de archivos

La estructura objetivo del repositorio debe ser:

```text
/
├── index.html
├── styles.css
├── map.js
├── game.js
├── storage.js
├── content_pet.json
├── puntos.json
├── mapa_vectorizado.svg
├── pet_icon.svg
└── manual_desarrollo_loop_pet.md
