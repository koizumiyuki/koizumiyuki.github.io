// Koi geometry: Sourany Phomhome, Koi Pond Garden (MIT; see LICENSE).
// The Home background samples only points from that geometry. It renders no
// filled fish mesh, color pattern, water scenery, or image asset.

function clamp(x, lo, hi) { return Math.min(hi, Math.max(lo, x)); }
function lerp(a, b, t) { return a + (b - a) * t; }
function smoothstep(a, b, x) {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}

const canvas = document.getElementById('home-koi-canvas');
const host = canvas && canvas.closest('.home-koi');
const countControl = document.querySelector('.koi-count-control');

try {
  if (!canvas || !host || !window.THREE) throw new Error('The koi canvas or Three.js is unavailable');
  const context = canvas.getContext('2d', { alpha: true });
  if (!context) throw new Error('Canvas 2D is unavailable');
  let koiColor = '#0f62fe';
  function syncKoiColor() {
    koiColor = getComputedStyle(host).color;
    if (host.classList.contains('is-ready')) draw();
  }
  delete document.documentElement.dataset.koiPalette;
  syncKoiColor();
  const colorPreference = window.matchMedia('(prefers-color-scheme: dark)');
  if (colorPreference.addEventListener) colorPreference.addEventListener('change', syncKoiColor);
  else colorPreference.addListener(syncKoiColor);
  // Divide total triangle area into equal strata, then sample once per
  // stratum. This avoids the visible clusters of independent random points.
  function surfacePoints(source, count, seed) {
    const src = source.getAttribute('position');
    const finAttr = source.getAttribute('aFin');
    const lipAttr = source.getAttribute('aLip');
    const index = source.index.array;
    const triCount = index.length / 3;
    const areas = new Float64Array(triCount);
    let totalArea = 0;
    for (let t = 0; t < triCount; t++) {
      const a = index[t * 3], b = index[t * 3 + 1], c = index[t * 3 + 2];
      const ax = src.getX(a), ay = src.getY(a), az = src.getZ(a);
      const ux = src.getX(b) - ax, uy = src.getY(b) - ay, uz = src.getZ(b) - az;
      const vx = src.getX(c) - ax, vy = src.getY(c) - ay, vz = src.getZ(c) - az;
      const cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx;
      totalArea += Math.hypot(cx, cy, cz) * 0.5;
      areas[t] = totalArea;
    }
    if (totalArea <= 0) throw new Error('The koi surface has no area');
    let state = seed >>> 0;
    const random = () => {
      state ^= state << 13; state ^= state >>> 17; state ^= state << 5;
      return (state >>> 0) / 4294967296;
    };
    const base = new Float32Array(count * 3);
    const fin = finAttr ? new Float32Array(count * 2) : null;
    const lip = lipAttr ? new Float32Array(count) : null;
    for (let i = 0; i < count; i++) {
      const target = (i + .15 + random() * .7) / count * totalArea;
      let lo = 0, hi = triCount - 1;
      while (lo < hi) {
        const mid = (lo + hi) >>> 1;
        if (areas[mid] < target) lo = mid + 1; else hi = mid;
      }
      const a = index[lo * 3], b = index[lo * 3 + 1], c = index[lo * 3 + 2];
      const root = Math.sqrt(random()), r = random();
      const wa = 1 - root, wb = root * (1 - r), wc = root * r;
      base[i * 3] = wa * src.getX(a) + wb * src.getX(b) + wc * src.getX(c);
      base[i * 3 + 1] = wa * src.getY(a) + wb * src.getY(b) + wc * src.getY(c);
      base[i * 3 + 2] = wa * src.getZ(a) + wb * src.getZ(b) + wc * src.getZ(c);
      if (fin) {
        fin[i * 2] = wa * finAttr.getX(a) + wb * finAttr.getX(b) + wc * finAttr.getX(c);
        fin[i * 2 + 1] = wa * finAttr.getY(a) + wb * finAttr.getY(b) + wc * finAttr.getY(c);
      }
      if (lip) lip[i] = wa * lipAttr.getX(a) + wb * lipAttr.getX(b) + wc * lipAttr.getX(c);
    }
    // A shuffled rank gives each point a fixed place in every density level.
    // Nested subsets preserve the fish shape while removing the exact fraction.
    const order = Uint32Array.from({ length: count }, (_, i) => i);
    for (let i = count - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      const tmp = order[i]; order[i] = order[j]; order[j] = tmp;
    }
    const rank = new Uint32Array(count);
    for (let i = 0; i < count; i++) rank[order[i]] = i;
    return { position: new Float32Array(base), base, fin, lip, rank, count };
  }

  const bodySurface = koiBodyGeo(), finSurface = koiFinGeo();
  const sizes = [1, .86, .77, .92, .71];
  const speeds = [1, .86, 1.12, .94, 1.2];
  const initialPositions = [];
  function randomStart(i) {
    let best = null, bestGap = -1;
    for (let attempt = 0; attempt < 40; attempt++) {
      const progress = Math.random() * Math.PI * 4;
      const x = .77 * Math.sin(progress) + .18 * Math.sin(2 * progress + .4 + i * .5);
      const z = .65 * Math.sin(.5 * progress + .65 + i * .75)
        + .24 * Math.sin(1.5 * progress - .4 + i * .35);
      const gap = initialPositions.length
        ? Math.min(...initialPositions.map(point => Math.hypot(x - point.x, z - point.z)))
        : Infinity;
      if (gap > bestGap) { best = { progress, x, z }; bestGap = gap; }
      if (gap >= .7) break;
    }
    initialPositions.push(best);
    return best.progress;
  }
  const fishes = sizes.map((size, i) => {
    const body = surfacePoints(bodySurface, 3000, 0x51c0f1 + i * 97);
    const fins = surfacePoints(finSurface, 1500, 0xf1a5c0 + i * 131);
    return { body, fins, size, speed: speeds[i], progress: randomStart(i), tailPhase: Math.random() * Math.PI * 2, finPhase: Math.random() * Math.PI * 2, heading: null, turnRate: 0, horizontalSpan: 1, verticalSpan: 1, scale: 1, x: 0, z: 0, visible: i < 3,
      jumpStart: -1, jumpDuration: 0, jumpT: -1, jumpLift: 0, jumpPitch: 0, takeoffX: 0, takeoffZ: 0,
      landingAt: -1, landingAge: -1, landingX: 0, landingZ: 0 };
  });
  bodySurface.dispose();
  finSurface.dispose();
  const countKey = 'researcher-homepage-koi-count';
  const validCounts = ['0', '3', '5'];
  const countButtons = countControl ? [...countControl.querySelectorAll('[data-koi-count]')] : [];
  let activeCount = 3;
  let hasSavedCount = false;
  const queryCount = new URLSearchParams(window.location.search).get('koi');
  if (validCounts.includes(queryCount)) {
    activeCount = Number(queryCount);
    hasSavedCount = true;
  } else {
    try {
      const savedCount = window.localStorage.getItem(countKey);
      if (validCounts.includes(savedCount)) {
        activeCount = Number(savedCount);
        hasSavedCount = true;
      }
    } catch (_) { /* URL propagation still preserves a selection during navigation. */ }
  }
  function updateLocalLinks(count) {
    for (const link of document.querySelectorAll('a[href]')) {
      const href = link.getAttribute('href');
      if (!/^[a-z0-9-]+\.html(?:[?#].*)?$/i.test(href)) continue;
      const target = new URL(href, window.location.href);
      target.searchParams.set('koi', String(count));
      link.setAttribute('href', href.split(/[?#]/)[0] + target.search + target.hash);
    }
  }
  function setCount(count, save = false) {
    if (!validCounts.includes(String(count))) return;
    activeCount = count;
    fishes.forEach((fish, i) => { fish.visible = i < count; });
    countButtons.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.koiCount) === count)));
    host.style.display = count === 0 ? 'none' : '';
    if (count === 0) {
      host.classList.remove('is-jumping');
      for (const fish of fishes) {
        fish.jumpStart = -1;
        fish.jumpT = -1;
        fish.jumpLift = 0;
        fish.jumpPitch = 0;
        fish.landingAt = -1;
        fish.landingAge = -1;
      }
    }
    if (save) {
      hasSavedCount = true;
      try { window.localStorage.setItem(countKey, String(count)); } catch (_) { /* Keep link-based persistence. */ }
      try {
        const here = new URL(window.location.href);
        here.searchParams.set('koi', String(count));
        window.history.replaceState(null, '', here.href);
      } catch (_) { /* Some file:// contexts restrict history changes. */ }
    }
    if (hasSavedCount) updateLocalLinks(count);
    if (host.classList.contains('is-ready')) {
      if (count === 0) draw(); else resize();
    }
  }
  countButtons.forEach(button => button.addEventListener('click', () => setCount(Number(button.dataset.koiCount), true)));
  setCount(activeCount);
  const reduction = 70;
  const dotScale = 1.25;

  // The point cloud is built once. Only position and swimming parameters change.
  const swimStyles = [
    { duration: 7, rate: .26, tailHz: 1.05, amp: .038, finHz: 1.05, path: 0, hover: 0 }, // cruise
    { duration: 4, rate: .11, tailHz: .48, amp: .011, finHz: .72, path: .1, hover: 0 }, // glide
    { duration: 5, rate: .22, tailHz: 1.15, amp: .057, finHz: 1.35, path: .9, hover: 0 }, // broad turn
    { duration: 2, rate: .57, tailHz: 2.0, amp: .084, finHz: 1.15, path: .55, hover: 0 }, // burst
    { duration: 3, rate: .025, tailHz: .31, amp: .008, finHz: 1.65, path: .3, hover: 1 }, // hover
    { duration: 7, rate: .27, tailHz: 1.03, amp: .038, finHz: 1.08, path: 0, hover: 0 } // cruise again
  ];
  const cycleLength = swimStyles.reduce((sum, style) => sum + style.duration, 0);
  function swimStyle(time) {
    let offset = time % cycleLength;
    for (let i = 0; i < swimStyles.length; i++) {
      const style = swimStyles[i];
      if (offset < style.duration || i === swimStyles.length - 1) {
        const next = swimStyles[(i + 1) % swimStyles.length];
        const blend = smoothstep(style.duration - 1.4, style.duration, offset);
        return {
          rate: lerp(style.rate, next.rate, blend),
          tailHz: lerp(style.tailHz, next.tailHz, blend),
          amp: lerp(style.amp, next.amp, blend),
          finHz: lerp(style.finHz, next.finHz, blend),
          path: lerp(style.path, next.path, blend),
          hover: lerp(style.hover, next.hover, blend)
        };
      }
      offset -= style.duration;
    }
  }

  function deform(fish, time, style, phase, finPhase, turnRate) {
    // The same base body/fin points support slow strokes, cruising and bursts.
    const { body, fins } = fish;
    const amp = style.amp;
    const bend = clamp(-turnRate * .08, -.095, .095) + .005 * Math.sin(time * .5);
    // A travelling wave begins behind the nearly stable head and gains
    // amplitude toward the peduncle; turns bend the same posterior region.
    const lat = s => amp * (.03 + .97 * s * s) * Math.sin(s * 5.7 - phase)
      + bend * smoothstep(.12, .9, s) ** 2;
    const mouth = .06 + .23 * Math.max(0, Math.sin(time * 2.4));
    fish.mouth = mouth;
    const bp = body.position, bb = body.base;
    for (let i = 0; i < body.count; i++) {
      const k = i * 3, s = .5 - bb[k], l = body.lip[i];
      let y = bb[k + 1], z = bb[k + 2];
      if (l > .75) { y = -.004 + (y + .004) * mouth; z *= mouth; }
      else if (l > .25) { y = -.004 + (y + .004) * (1 + .3 * mouth); z *= 1 + .3 * mouth; }
      bp[k] = bb[k] + (l > .25 ? .022 * mouth * (l > .75 ? 1 : .6) : 0);
      bp[k + 1] = y;
      bp[k + 2] = z + lat(s);
    }
    const fp = fins.position, fb = fins.base, fm = fins.fin;
    for (let i = 0; i < fins.count; i++) {
      const k = i * 3, x = fb[k], type = Math.round(fm[i * 2]), u = fm[i * 2 + 1];
      let y = fb[k + 1], z = fb[k + 2];
      if (type === 6) {
        // The two caudal lobes sweep mostly together. Their modest roll exposes
        // the fork in the high, almost top-down background view.
        z += Math.sin(phase - 1.05 - u * .55) * (amp * .6 + .003) * u;
        z += y * (.34 + .18 * Math.sin(phase - .7)) * u;
        y += Math.sin(phase - .8) * .004 * u;
      } else if (type >= 1 && type <= 4) {
        const side = (type === 1 || type === 3) ? 1 : -1;
        const pectoral = type <= 2 ? 1 : .35;
        const beat = finPhase + (side > 0 ? 0 : .55);
        y += Math.cos(beat) * (.006 + .009 * style.hover) * u * pectoral;
        z += side * Math.sin(beat) * (.014 + .018 * style.hover) * u * pectoral;
        z += side * clamp(side * turnRate * .018, -.008, .008) * u * pectoral;
      } else {
        z += Math.sin(phase * .9 - (u * 2 - 1) * 5) * .007 * u;
      }
      fp[k + 1] = y;
      fp[k + 2] = z + lat(.5 - x);
    }
  }

  let viewportWidth = 1, viewportHeight = 1, pixelsPerUnit = 1;
  // The source mesh has tiny barbels, but surface sampling can lose them at
  // lower dot densities. Keep two dotted pairs anchored to the mouth instead.
  const barbels = [
    // Maxillary pair at the mouth corners; the rostral pair is shorter.
    { rootX: .478, rootY: -.014, rootZ: .022, reach: .019, spread: .005, drop: .06, steps: 10, weight: .9 },
    { rootX: .49, rootY: -.007, rootZ: .011, reach: .007, spread: .003, drop: .023, steps: 5, weight: .68 }
  ];
  // Orthographic view fixed at 50° away from directly overhead.
  const VIEW_Z = Math.cos(50 * Math.PI / 180);
  const VIEW_Y = Math.sin(50 * Math.PI / 180);
  function resize() {
    const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1, aspect = w / h;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * pixelRatio);
    canvas.height = Math.round(h * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    viewportWidth = w;
    viewportHeight = h;
    const viewHeight = aspect < .82 ? 2.7 / aspect : 2.7;
    const viewWidth = viewHeight * aspect;
    const cameraRight = viewWidth / 2, cameraTop = viewHeight / 2;
    pixelsPerUnit = w / viewWidth;
    const targetWidth = aspect < .82 ? clamp(w * .34, 105, 160) : clamp(w * .17, 120, 250);
    for (const fish of fishes) {
      const scale = targetWidth * fish.size / (1.25 * pixelsPerUnit);
      fish.scale = scale;
      fish.horizontalSpan = Math.max(.1, (cameraRight - .44 * scale) * .87);
      fish.verticalSpan = Math.max(.1, (cameraTop / VIEW_Z - .35 * scale) * .82);
    }
    draw();
  }
  function draw() {
    context.clearRect(0, 0, viewportWidth, viewportHeight);
    context.globalAlpha = 1;
    context.fillStyle = koiColor;
    const centerX = viewportWidth / 2, centerY = viewportHeight / 2;
    function dottedRipple(x, z, size, opacity) {
      const sx = centerX + x * pixelsPerUnit;
      const sy = centerY + VIEW_Z * z * pixelsPerUnit;
      const radiusX = size * pixelsPerUnit;
      const radiusY = radiusX * VIEW_Z;
      context.globalAlpha = opacity;
      for (let i = 0; i < 40; i++) {
        const angle = i * Math.PI * 2 / 40;
        context.fillRect(sx + radiusX * Math.cos(angle), sy + radiusY * Math.sin(angle), 1.6 * dotScale, 1.6 * dotScale);
      }
    }
    for (const fish of fishes) {
      if (!fish.visible) continue;
      const c = Math.cos(fish.heading || 0), s = Math.sin(fish.heading || 0);
      const arc = fish.jumpT < 0 ? 0 : Math.sin(Math.PI * fish.jumpT);
      const renderScale = fish.scale * (1 + .07 * arc);
      const pitchCos = Math.cos(fish.jumpPitch), pitchSin = Math.sin(fish.jumpPitch);
      const dotSize = (viewportWidth < 650 ? 1.25 : 1.55) * fish.size * dotScale * (1 + .07 * arc);
      if (fish.jumpT >= 0 && fish.jumpT < .48) {
        const spread = fish.jumpT / .48;
        dottedRipple(fish.takeoffX, fish.takeoffZ, fish.scale * (.25 + .25 * spread), .42 * (1 - spread) ** 2);
      }
      if (arc > .08) dottedRipple(fish.x, fish.z, fish.scale * (.27 + .12 * arc), .14 * arc);
      if (fish.landingAge >= 0 && fish.landingAge < .9) {
        const spread = fish.landingAge / .9;
        dottedRipple(fish.landingX, fish.landingZ, fish.scale * (.25 + .33 * spread), .46 * (1 - spread) ** 2);
      }
      for (const cloud of [fish.body, fish.fins]) {
        const p = cloud.position;
        const visibleCount = Math.round(cloud.count * (100 - reduction) / 100);
        for (let i = 0; i < p.length; i += 3) {
          if (cloud.rank[i / 3] >= visibleCount) continue;
          const localX = p[i] * pitchCos - p[i + 1] * pitchSin;
          const localY = p[i] * pitchSin + p[i + 1] * pitchCos;
          const x = fish.x + renderScale * (localX * c + p[i + 2] * s);
          const z = fish.z + renderScale * (-localX * s + p[i + 2] * c);
          const y = renderScale * localY + fish.jumpLift;
          const screenX = centerX + x * pixelsPerUnit;
          const screenY = centerY + (VIEW_Z * z - VIEW_Y * y) * pixelsPerUnit;
          if (screenX >= -2 && screenX <= viewportWidth + 2 && screenY >= -2 && screenY <= viewportHeight + 2) {
            // The front-facing half is brighter than the far surface, which
            // makes the round body legible without adding colors or a mesh.
            const localZ = -p[i] * s + p[i + 2] * c;
            const depth = VIEW_Y * localZ + VIEW_Z * localY;
            context.globalAlpha = clamp(.82 + depth * 1.75, .55, 1);
            context.fillRect(screenX, screenY, dotSize, dotSize);
          }
        }
      }
      context.globalAlpha = .9;
      for (const side of [-1, 1]) for (const barbel of barbels) {
        for (let j = 0; j <= barbel.steps; j++) {
          const t = j / barbel.steps;
          const localX = barbel.rootX + .01 * (fish.mouth || .06) + barbel.reach * t - .004 * t * t;
          const localY = barbel.rootY - barbel.drop * t;
          const localZ = side * (barbel.rootZ + barbel.spread * t)
            + .0015 * Math.sin(fish.tailPhase * .4) * t;
          const pitchedX = localX * pitchCos - localY * pitchSin;
          const pitchedY = localX * pitchSin + localY * pitchCos;
          const x = fish.x + renderScale * (pitchedX * c + localZ * s);
          const z = fish.z + renderScale * (-pitchedX * s + localZ * c);
          const screenX = centerX + x * pixelsPerUnit;
          const screenY = centerY + (VIEW_Z * z - VIEW_Y * (renderScale * pitchedY + fish.jumpLift)) * pixelsPerUnit;
          if (screenX >= -2 && screenX <= viewportWidth + 2 && screenY >= -2 && screenY <= viewportHeight + 2) {
            const size = dotSize * barbel.weight * (1 - .45 * t);
            context.fillRect(screenX, screenY, size, size);
          }
        }
      }
    }
    context.globalAlpha = 1;
  }
  // The full-viewport canvas is beneath the page and cannot intercept links.
  // Canvas 2D avoids a WebGL dependency on local file pages.
  host.classList.add('is-ready');
  const observer = window.ResizeObserver ? new ResizeObserver(resize) : null;
  if (observer) observer.observe(host);
  else window.addEventListener('resize', resize);
  resize();

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let clock = 0, previous = performance.now();
  let nextJumpAt = 5 + Math.random() * 5;
  let animationFrame = 0;
  function frame(now) {
    animationFrame = 0;
    const dt = Math.min(.05, (now - previous) / 1000);
    previous = now;
    const active = !motionPreference.matches && !document.hidden;
    if (active) clock += dt;
    if (active && clock >= nextJumpAt) {
      // Only jump while comfortably inside the viewport. One fish jumps at a
      // time, with a long irregular pause before the next jump.
      const candidates = fishes.slice(0, activeCount).filter(fish => {
        const sx = viewportWidth / 2 + fish.x * pixelsPerUnit;
        const sy = viewportHeight / 2 + VIEW_Z * fish.z * pixelsPerUnit;
        const marginX = Math.max(42, fish.scale * pixelsPerUnit * .55);
        const marginY = Math.max(55, fish.scale * pixelsPerUnit * .7);
        return sx > marginX && sx < viewportWidth - marginX
          && sy > marginY && sy < viewportHeight - marginY;
      });
      if (candidates.length) {
        const fish = candidates[Math.floor(Math.random() * candidates.length)];
        fish.jumpStart = clock;
        fish.jumpDuration = 1.9 + Math.random() * .5;
        fish.takeoffX = fish.x;
        fish.takeoffZ = fish.z;
        host.classList.add('is-jumping');
        nextJumpAt = clock + fish.jumpDuration + 17 + Math.random() * 13;
      } else nextJumpAt = clock + .7;
    }
    for (let i = 0; i < fishes.length; i++) {
      const fish = fishes[i];
      const style = swimStyle(clock + i * 4.1);
      if (active) {
        fish.progress += dt * style.rate * fish.speed;
        fish.tailPhase += dt * Math.PI * 2 * style.tailHz;
        fish.finPhase += dt * Math.PI * 2 * style.finHz;
      }
      const u = fish.progress, shape = style.path;
      // Different phases and speeds spread the fish around the viewport.
      const x = fish.horizontalSpan * (.77 * Math.sin(u) + .18 * Math.sin(2 * u + .4 + i * .5));
      const z = fish.verticalSpan * (.65 * Math.sin(.5 * u + .65 + i * .75) + .24 * Math.sin(1.5 * u - .4 + i * .35) + .06 * shape * Math.sin(3 * u));
      const dx = fish.horizontalSpan * (.77 * Math.cos(u) + .36 * Math.cos(2 * u + .4 + i * .5));
      const dz = fish.verticalSpan * (.325 * Math.cos(.5 * u + .65 + i * .75) + .36 * Math.cos(1.5 * u - .4 + i * .35) + .18 * shape * Math.cos(3 * u));
      const desiredHeading = Math.atan2(-dz, dx);
      if (fish.heading === null) fish.heading = desiredHeading;
      if (active && dt > 0) {
        const delta = Math.atan2(Math.sin(desiredHeading - fish.heading), Math.cos(desiredHeading - fish.heading));
        const step = clamp(delta, -1.05 * dt, 1.05 * dt);
        fish.heading += step;
        fish.turnRate = lerp(fish.turnRate, step / dt, 1 - Math.exp(-dt * 3));
      }
      fish.x = x;
      fish.z = z;
      if (fish.jumpStart >= 0) {
        const t = (clock - fish.jumpStart) / fish.jumpDuration;
        if (t < 1) {
          fish.jumpT = t;
          fish.jumpLift = fish.scale * .68 * Math.sin(Math.PI * t);
          fish.jumpPitch = .38 * Math.sin(2 * Math.PI * t);
        } else {
          fish.jumpStart = -1;
          fish.jumpT = -1;
          fish.jumpLift = 0;
          fish.jumpPitch = 0;
          fish.landingAt = clock;
          fish.landingX = x;
          fish.landingZ = z;
          host.classList.remove('is-jumping');
        }
      }
      fish.landingAge = fish.landingAt < 0 ? -1 : clock - fish.landingAt;
      if (fish.landingAge >= .9) { fish.landingAt = -1; fish.landingAge = -1; }
      if (i < activeCount) deform(fish, clock + i * 1.7, style, fish.tailPhase, fish.finPhase, fish.turnRate);
    }
    draw();
    if (active) animationFrame = requestAnimationFrame(frame);
  }
  function syncMotion() {
    previous = performance.now();
    if (animationFrame) cancelAnimationFrame(animationFrame);
    if (motionPreference.matches) {
      // Return any airborne fish to the water before freezing the scene.
      for (const fish of fishes) {
        fish.jumpStart = -1;
        fish.jumpT = -1;
        fish.jumpLift = 0;
        fish.jumpPitch = 0;
        fish.landingAt = -1;
        fish.landingAge = -1;
      }
      host.classList.remove('is-jumping');
    }
    frame(previous);
  }
  if (motionPreference.addEventListener) motionPreference.addEventListener('change', syncMotion);
  else motionPreference.addListener(syncMotion);
  document.addEventListener('visibilitychange', syncMotion);
  syncMotion();
} catch (e) {
  if (host) host.classList.remove('is-ready');
  console.warn('Point-cloud koi could not be displayed:', e);
}
