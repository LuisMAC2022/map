export async function loadMapAndPoints({ stage, svgFile, pointsFile, iconFile }) {
  const [svgText, points] = await Promise.all([
    fetch(svgFile).then(r => r.text()),
    fetch(pointsFile).then(r => r.json())
  ]);

  const doc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
  const svg = doc.documentElement;
  if (!svg.hasAttribute('viewBox')) {
    const w = parseFloat(svg.getAttribute('width'));
    const h = parseFloat(svg.getAttribute('height'));
    if (Number.isFinite(w) && Number.isFinite(h)) svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  }
  svg.removeAttribute('width');
  svg.removeAttribute('height');

  const markerLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  svg.append(markerLayer);
  stage.replaceChildren(svg);

  const normalized = points.map((p, i) => ({ id: String(p.id ?? `p-${i+1}`), nombre: String(p.nombre ?? `Punto ${i+1}`), categoria: String(p.categoria ?? 'sin_clasificar'), x: Number(p.x), y: Number(p.y) })).filter(p => Number.isFinite(p.x) && Number.isFinite(p.y));

  function renderMarkers(visible, activeId, collectedIds, onSelect) {
    markerLayer.replaceChildren();
    for (const point of visible) {
      const marker = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      marker.classList.add('marker');
      marker.dataset.id = point.id;
      marker.dataset.active = String(point.id === activeId);
      marker.dataset.collected = String(collectedIds.has(point.id));
      marker.setAttribute('transform', `translate(${point.x} ${point.y})`);
      marker.setAttribute('tabindex', '0');
      marker.setAttribute('role', 'button');
      marker.setAttribute('aria-label', point.nombre);

      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('r', '20');
      const icon = document.createElementNS('http://www.w3.org/2000/svg', 'image');
      icon.setAttribute('href', iconFile);
      icon.setAttribute('x', '-11'); icon.setAttribute('y', '-11'); icon.setAttribute('width', '22'); icon.setAttribute('height', '22');

      marker.append(c, icon);
      marker.addEventListener('click', () => onSelect(point.id));
      marker.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(point.id); } });
      markerLayer.append(marker);
    }
  }

  return { points: normalized, renderMarkers };
}
