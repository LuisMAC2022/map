import { loadMapAndPoints } from './map.js';
import { loadState, saveState, resetState } from './storage.js';

const els = {
  stage: document.querySelector('#stage'), search: document.querySelector('#search'), filters: document.querySelector('#filters'),
  results: document.querySelector('#results'), info: document.querySelector('#info'), progress: document.querySelector('#progress-panel'),
  reset: document.querySelector('#reset-game'), notif: document.querySelector('#notif')
};

const state = loadState();
let points = []; let content = []; let activeId = null; let activeCategory = 'todas';

init().catch(() => { els.stage.textContent = 'Error al cargar. Ejecuta con python3 -m http.server'; });

async function init() {
  content = await fetch('./content_pet.json').then(r => r.json());
  const map = await loadMapAndPoints({ stage: els.stage, svgFile: './mapa_vectorizado.svg', pointsFile: './puntos.json', iconFile: './pet_icon.svg' });
  points = map.points;

  renderFilters(); renderAll();
  els.search.addEventListener('input', renderAll);
  els.reset.addEventListener('click', () => {
    if (!confirm('¿Seguro que deseas reiniciar el progreso PET?')) return;
    resetState(); state.attempts = {}; state.collectedIds = []; activeId = null; notify('Progreso reiniciado.', 'warning'); renderAll();
  });

  function renderAll() {
    const visible = points.filter(matches);
    map.renderMarkers(visible, activeId, new Set(state.collectedIds), selectPoint);
    renderResults(visible); renderProgress(); renderInfo();
  }

  function selectPoint(id) {
    activeId = id;
    const tries = (state.attempts[id] ?? 0) + 1;
    state.attempts[id] = tries;
    let msg = 'Encontraste basura. Sigue intentando.';
    if (tries >= 2 && !state.collectedIds.includes(id)) {
      state.collectedIds.push(id);
      const fragment = content[state.collectedIds.length % content.length];
      msg = `Recolectaste un fragmento: ${fragment.title}`;
    }
    saveState(state);
    notify(msg, tries >= 2 ? 'success' : 'warning');
    renderAll();
  }

  function matches(point) {
    const q = els.search.value.trim().toLowerCase();
    const byCategory = activeCategory === 'todas' || point.categoria === activeCategory;
    return byCategory && (!q || `${point.id} ${point.nombre} ${point.categoria}`.toLowerCase().includes(q));
  }

  function renderFilters() {
    const cats = ['todas', ...new Set(points.map(p => p.categoria))];
    els.filters.replaceChildren(...cats.map(cat => {
      const b = document.createElement('button'); b.type = 'button'; b.textContent = cat; b.dataset.active = String(cat === activeCategory);
      b.addEventListener('click', () => { activeCategory = cat; renderFilters(); renderAll(); }); return b;
    }));
  }

  function renderResults(visible) {
    els.results.replaceChildren(...visible.map(p => {
      const b = document.createElement('button'); b.className = 'result-card'; b.dataset.active = String(p.id === activeId);
      b.innerHTML = `<strong>${p.nombre}</strong><span>${p.id} · ${p.categoria}</span>`;
      b.addEventListener('click', () => selectPoint(p.id)); return b;
    }));
  }

  function renderInfo() {
    const p = points.find(v => v.id === activeId);
    if (!p) { els.info.textContent = 'Selecciona un contenedor para iniciar.'; return; }
    const tries = state.attempts[p.id] ?? 0;
    const collected = state.collectedIds.includes(p.id) ? 'Sí' : 'No';
    els.info.innerHTML = `<strong>${p.nombre}</strong><p>Intentos: ${tries}</p><p>Recolectado: ${collected}</p>`;
  }

  function renderProgress() {
    els.progress.innerHTML = `<p>Contenedores recolectados: <strong>${state.collectedIds.length}</strong> / ${points.length}</p>`;
  }
}

function notify(message, tone) { els.notif.textContent = message; els.notif.className = `notification ${tone}`; }
