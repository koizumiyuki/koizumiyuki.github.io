// The SVG is the no-script fallback. Each page load perturbs the canvas nodes.
const NETWORK_POINTS = [
  [16.7,488.4,1.55,0.33,0],
  [638.4,633.4,1.05,0.22,0],
  [872.1,715.6,1.05,0.22,0],
  [38.4,582.5,1.05,0.22,0],
  [275.7,452.2,1.05,0.22,0],
  [-38.4,722,1.55,0.33,0],
  [1471.1,436.2,1.05,0.22,0],
  [124.3,885.5,1.05,0.22,0],
  [354,140.8,2.4,0.56,1],
  [203.1,774.3,1.05,0.22,0],
  [334.6,-31.5,1.55,0.33,0],
  [1451.4,238.5,1.05,0.22,0],
  [1400.7,335.7,1.05,0.22,0],
  [735.8,658.2,1.05,0.22,0],
  [-47.9,615.2,1.05,0.22,0],
  [412.5,356.5,2.4,0.56,1],
  [184.4,589.9,1.05,0.22,0],
  [1086.9,275.9,1.05,0.22,0],
  [536.3,810,1.05,0.22,0],
  [386.8,678.5,1.05,0.22,0],
  [328.5,858.9,1.55,0.33,0],
  [344.3,941.4,1.05,0.22,0],
  [815.6,134.1,1.05,0.22,0],
  [1225.3,307,1.05,0.22,0],
  [662.7,315,1.05,0.22,0],
  [449.7,-10.1,1.55,0.33,0],
  [542.1,922.1,2.4,0.56,1],
  [1126.5,184.7,1.05,0.22,0],
  [1258.1,616.3,1.05,0.22,0],
  [1234.3,33,1.05,0.22,0],
  [1157.3,739.7,1.55,0.33,0],
  [-46.7,352.1,1.05,0.22,0],
  [32.3,383.5,2.4,0.56,1],
  [1428.1,-44.7,1.05,0.22,0],
  [870.4,625,1.05,0.22,0],
  [26,258.3,1.55,0.33,0],
  [1312.8,871.1,1.05,0.22,0],
  [990.2,811.2,1.05,0.22,0],
  [62.3,715.1,1.05,0.22,0],
  [112.5,25.7,1.05,0.22,0],
  [1156.2,934.7,1.55,0.33,0],
  [784.5,774.7,1.05,0.22,0],
  [631.4,543.4,1.05,0.22,0],
  [1273.4,418.2,2.4,0.56,1],
  [1321.4,729.3,1.05,0.22,0],
  [201.6,193.2,1.55,0.33,0],
  [897.2,460.6,1.05,0.22,0],
  [749.9,213.2,1.05,0.22,0],
  [251.3,104.8,2.4,0.56,1],
  [744.3,87.8,1.05,0.22,0],
  [572.3,306.3,1.55,0.33,0],
  [429.1,451.8,1.05,0.22,0],
  [774.4,349.4,1.05,0.22,0],
  [873.2,827.3,1.05,0.22,0],
  [124.1,251,1.05,0.22,0],
  [1230.7,831.2,1.55,0.33,0],
  [655,101.3,1.05,0.22,0],
  [234.4,920.9,1.05,0.22,0],
  [1130.1,385.8,1.05,0.22,0],
  [115.9,523,1.05,0.22,0],
];
const NETWORK_LINKS = [
  [0,3,0.12],
  [0,14,0.12],
  [0,31,0.12],
  [0,32,0.12],
  [0,59,0.12],
  [1,13,0.12],
  [1,18,0.075],
  [1,41,0.075],
  [1,42,0.12],
  [2,34,0.12],
  [2,37,0.12],
  [2,41,0.12],
  [2,53,0.12],
  [3,5,0.12],
  [3,14,0.12],
  [3,16,0.12],
  [3,38,0.12],
  [3,59,0.12],
  [4,15,0.12],
  [4,16,0.12],
  [4,51,0.12],
  [5,14,0.12],
  [5,38,0.12],
  [6,11,0.075],
  [6,12,0.12],
  [6,43,0.075],
  [7,9,0.12],
  [7,38,0.075],
  [7,57,0.12],
  [8,10,0.075],
  [8,25,0.075],
  [8,45,0.12],
  [8,48,0.12],
  [9,19,0.075],
  [9,20,0.12],
  [9,57,0.12],
  [10,25,0.12],
  [10,48,0.12],
  [11,12,0.12],
  [11,23,0.075],
  [12,43,0.12],
  [13,34,0.12],
  [13,41,0.12],
  [13,42,0.12],
  [14,38,0.12],
  [15,50,0.12],
  [15,51,0.12],
  [16,59,0.12],
  [17,23,0.12],
  [17,27,0.12],
  [17,58,0.12],
  [18,19,0.075],
  [18,26,0.12],
  [19,20,0.075],
  [20,21,0.12],
  [20,26,0.075],
  [20,57,0.12],
  [21,26,0.075],
  [21,57,0.12],
  [22,47,0.12],
  [22,49,0.12],
  [22,56,0.12],
  [23,27,0.12],
  [23,43,0.12],
  [23,58,0.12],
  [24,47,0.12],
  [24,50,0.12],
  [24,52,0.12],
  [25,48,0.075],
  [27,29,0.075],
  [28,30,0.12],
  [28,43,0.075],
  [28,44,0.12],
  [29,33,0.075],
  [30,37,0.075],
  [30,40,0.075],
  [30,44,0.12],
  [30,55,0.12],
  [31,32,0.12],
  [31,35,0.12],
  [32,35,0.12],
  [32,54,0.12],
  [34,46,0.12],
  [35,54,0.12],
  [36,40,0.12],
  [36,44,0.12],
  [36,55,0.12],
  [37,53,0.12],
  [39,45,0.075],
  [39,48,0.12],
  [39,54,0.075],
  [40,55,0.12],
  [41,53,0.12],
  [42,51,0.075],
  [43,58,0.12],
  [44,55,0.12],
  [45,48,0.12],
  [45,54,0.12],
  [46,52,0.12],
  [46,58,0.075],
  [47,49,0.12],
  [47,50,0.075],
  [47,52,0.12],
  [47,56,0.12],
  [49,56,0.12],
  [50,51,0.075],
];
// Extra connections appear and fade without changing the underlying network.
const TRANSIENT_LINKS = [
  [24,51], [5,16], [8,50], [18,41], [17,43], [3,4],
  [6,28], [11,33], [0,54], [13,46], [9,21], [35,45],
  [34,37], [12,23], [15,42], [1,19], [52,56], [40,44]
];

// The links follow a flowing field of independently moving nodes.
// Canvas is optional: the matching SVG stays visible if scripts are disabled.
(() => {
  const host = document.querySelector('.home-field');
  const canvas = host && host.querySelector('canvas');
  if (!canvas || !window.requestAnimationFrame) return;
  const context = canvas.getContext('2d', { alpha: true });
  if (!context) return;

  // Move each node within its neighborhood. This changes the arrangement on
  // every page load while keeping the existing local links recognizable.
  const nodeOrigins = NETWORK_POINTS.map(([x, y]) => [
    x + (Math.random() - .5) * 140,
    y + (Math.random() - .5) * 120
  ]);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
  // The network color is independent of the koi and site accents.
  let networkColor = '#7c3aed';
  let width = 1, height = 1, cover = 1, offsetX = 0, offsetY = 0;
  let phase = 0, frameId = 0, lastTime = 0, lastPaint = 0;

  function draw() {
    context.clearRect(0, 0, width, height);
    const positions = nodeOrigins.map(([baseX, baseY], i) => {
      const speedX = .5 + (i % 7) * .06;
      const speedY = .43 + (i % 5) * .07;
      const flowX = 12 * Math.sin(phase * .42 + baseY * .011);
      const flowY = 10 * Math.cos(phase * .38 + baseX * .009);
      const x = offsetX + baseX * cover
        + flowX
        + (15 + (i % 4) * 3) * Math.sin(phase * speedX + i * 1.73)
        + (4 + i % 3) * Math.sin(phase * (1.02 + (i % 4) * .09) + i * .43);
      const y = offsetY + baseY * cover
        + flowY
        + (13 + (i % 3) * 3) * Math.cos(phase * speedY + i * 2.11)
        + (3 + (i % 4) * .8) * Math.sin(phase * (.9 + (i % 6) * .07) + i * .79);
      return [x, y];
    });

    context.strokeStyle = networkColor;
    context.lineCap = 'round';
    NETWORK_LINKS.forEach(([a, b, opacity], i) => {
      const [ax, ay] = positions[a], [bx, by] = positions[b];
      // A wide, faint pass gives every edge a soft violet halo.
      context.lineWidth = Math.max(2, 2.8 * cover);
      context.shadowColor = networkColor;
      context.shadowBlur = 5 * cover;
      context.globalAlpha = opacity * .48;
      context.beginPath();
      context.moveTo(ax, ay);
      context.lineTo(bx, by);
      context.stroke();

      context.shadowBlur = 0;
      context.lineWidth = Math.max(.65, .75 * cover);
      context.globalAlpha = opacity * (1 + .18 * Math.sin(phase * .55 + i * .61));
      context.beginPath();
      context.moveTo(ax, ay);
      context.lineTo(bx, by);
      context.stroke();

      // Small light pulses cross a few links at a time.
      if (i % 8 === 0) {
        const travel = (phase * .2 + i * .17) % 1;
        const start = travel * .78, end = start + .22;
        context.shadowBlur = 9 * cover;
        context.lineWidth = Math.max(1, 1.25 * cover);
        context.globalAlpha = .26 * Math.sin(Math.PI * travel);
        context.beginPath();
        context.moveTo(ax + (bx - ax) * start, ay + (by - ay) * start);
        context.lineTo(ax + (bx - ax) * end, ay + (by - ay) * end);
        context.stroke();
        context.shadowBlur = 0;
      }
    });

    TRANSIENT_LINKS.forEach(([a, b], i) => {
      const fade = .5 + .5 * Math.sin(phase * (.55 + (i % 4) * .08) + i * 2.3);
      const opacity = .11 * fade * fade * fade;
      if (opacity < .004) return;
      context.shadowBlur = 5 * cover;
      context.lineWidth = Math.max(.65, .8 * cover);
      context.globalAlpha = opacity;
      context.beginPath();
      context.moveTo(positions[a][0], positions[a][1]);
      context.lineTo(positions[b][0], positions[b][1]);
      context.stroke();
    });
    context.shadowBlur = 0;

    NETWORK_POINTS.forEach(([, , radius, opacity, anchor], i) => {
      const [x, y] = positions[i];
      const beat = .5 + .5 * Math.sin(phase * (.85 + (i % 5) * .12) + i * 1.37);
      const pulse = beat * beat;
      const haloRadius = (anchor ? 10 : 5.5) * (.9 + .55 * pulse) * cover;
      const glow = context.createRadialGradient(x, y, 0, x, y, haloRadius);
      glow.addColorStop(0, networkColor);
      glow.addColorStop(.25, networkColor);
      glow.addColorStop(1, 'transparent');
      context.fillStyle = glow;
      context.globalAlpha = (anchor ? .04 : .02) + (anchor ? .78 : .7) * pulse;
      context.beginPath();
      context.arc(x, y, haloRadius, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = networkColor;
      context.globalAlpha = opacity * (anchor ? .5 + 1.1 * pulse : .35 + 2.5 * pulse);
      context.beginPath();
      context.arc(x, y, radius * cover, 0, Math.PI * 2);
      context.fill();
    });
    context.globalAlpha = 1;
  }

  function resize() {
    // The canvas is hidden until its first frame is ready; size the host.
    width = Math.max(1, host.clientWidth);
    height = Math.max(1, host.clientHeight);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    cover = Math.max(width / 1440, height / 900);
    offsetX = (width - 1440 * cover) / 2;
    offsetY = (height - 900 * cover) / 2;
    draw();
  }

  function frame(now) {
    frameId = 0;
    if (reducedMotion.matches || document.hidden) return;
    phase += Math.min(.08, Math.max(0, (now - lastTime) / 1000));
    lastTime = now;
    if (now - lastPaint >= 40) {
      draw();
      lastPaint = now;
    }
    frameId = requestAnimationFrame(frame);
  }

  function syncMotion() {
    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
    if (reducedMotion.matches) {
      draw();
      host.classList.add('is-ready');
      return;
    }
    if (document.hidden) return;
    draw();
    host.classList.add('is-ready');
    lastTime = performance.now();
    lastPaint = lastTime;
    frameId = requestAnimationFrame(frame);
  }

  function syncColor() {
    networkColor = getComputedStyle(host).color;
    draw();
  }

  resize();
  syncColor();
  if (window.ResizeObserver) new ResizeObserver(resize).observe(host);
  else window.addEventListener('resize', resize);
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', syncMotion);
  else reducedMotion.addListener(syncMotion);
  if (colorScheme.addEventListener) colorScheme.addEventListener('change', syncColor);
  else colorScheme.addListener(syncColor);
  document.addEventListener('visibilitychange', syncMotion);
  syncMotion();
})();
