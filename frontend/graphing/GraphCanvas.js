import {
  addObject,
  getState,
  getStudentAnswer,
  removeObject,
  resetToSpec,
  setMode,
  setSelected,
  setViewport,
  subscribe,
  updateObject,
} from './graphStore.js';
import GraphToolbar from './GraphToolbar.js';
import {
  determineTickStep,
  evaluateFunctionAt,
  formatNumber,
  generateLinePoints,
  sampleFunction,
} from './graphMath.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

const THEME_TOKENS = {
  light: {
    background: '#ffffff',
    grid: '#e5e5e5',
    axis: '#111827',
    axisLabel: '#111827',
    highlight: '#0ea5e9',
    objectStroke: '#1f2937',
    objectFill: 'rgba(14, 165, 233, 0.12)',
    shadeFill: 'rgba(14, 165, 233, 0.12)',
    trace: '#111827',
    // Student-added objects get a distinct green color
    studentStroke: '#16a34a',
    studentFill: 'rgba(22, 163, 74, 0.18)',
  },
  dark: {
    background: '#020617',
    grid: 'rgba(14, 165, 233, 0.22)',
    axis: '#f8fafc',
    axisLabel: '#f8fafc',
    highlight: '#38bdf8',
    objectStroke: '#ffffff',
    objectFill: 'rgba(56, 189, 248, 0.18)',
    shadeFill: 'rgba(56, 189, 248, 0.16)',
    trace: '#f8fafc',
    studentStroke: '#4ade80',
    studentFill: 'rgba(74, 222, 128, 0.22)',
  },
};

/** Snap a coordinate value to the nearest integer grid point. */
const snapToGrid = (value, gridSize = 1) =>
  Math.round(value / gridSize) * gridSize;

const ensureStyles = () => {
  if (document.getElementById('graph-canvas-styles')) return;
  const style = document.createElement('style');
  style.id = 'graph-canvas-styles';
  style.textContent = `
    .graph-canvas-root {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 28px 60px rgba(15, 23, 42, 0.22);
      background: var(--graph-canvas-background, #ffffff);
      transition: background 180ms ease;
      touch-action: none;
      user-select: none;
    }
    .graph-canvas-svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    .graph-grid-line {
      stroke-width: 0.015;
    }
    .graph-axis-line {
      stroke-width: 0.04;
    }
    .graph-axis-label {
      font-size: 0.35px;
      font-family: 'Inter', 'Segoe UI', sans-serif;
      pointer-events: none;
      paint-order: stroke;
      stroke: rgba(0,0,0,0.08);
      stroke-width: 0.02;
    }
    .graph-object {
      cursor: pointer;
      transition: stroke 150ms ease, fill 150ms ease, opacity 150ms ease;
      opacity: 0;
      animation: graph-object-fade 150ms ease forwards;
    }
    .graph-object.selected {
      stroke-width: 0.08 !important;
      filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.6));
    }
    .graph-inequality-fill {
      pointer-events: none;
      transition: opacity 160ms ease;
      opacity: 0;
      animation: graph-object-fade 160ms ease forwards;
    }
    .graph-trace-tooltip {
      position: absolute;
      pointer-events: none;
      background: rgba(15, 23, 42, 0.9);
      color: #f8fafc;
      padding: 6px 10px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      box-shadow: 0 10px 20px rgba(15, 23, 42, 0.25);
      transform: translate(-50%, -120%);
      white-space: nowrap;
      z-index: 10;
      opacity: 0;
      transition: opacity 100ms ease;
    }
    .graph-trace-tooltip.visible {
      opacity: 1;
    }
    @keyframes graph-object-fade {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }
    /* Quiz-mode remove confirmation bubble */
    .graph-remove-bubble {
      position: absolute;
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(15, 23, 42, 0.92);
      color: #f8fafc;
      padding: 6px 10px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 600;
      box-shadow: 0 8px 20px rgba(15, 23, 42, 0.35);
      transform: translate(-50%, -140%);
      white-space: nowrap;
      z-index: 20;
      animation: graph-object-fade 120ms ease forwards;
    }
    .graph-remove-bubble button {
      appearance: none;
      border: none;
      border-radius: 6px;
      padding: 4px 10px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: background 100ms ease;
    }
    .graph-remove-bubble .remove-yes {
      background: #ef4444;
      color: #fff;
    }
    .graph-remove-bubble .remove-yes:hover {
      background: #dc2626;
    }
    .graph-remove-bubble .remove-no {
      background: rgba(255,255,255,0.15);
      color: #e2e8f0;
    }
    .graph-remove-bubble .remove-no:hover {
      background: rgba(255,255,255,0.25);
    }
  `;
  document.head.appendChild(style);
};

class GraphCanvas {
  constructor(container, options = {}) {
    if (!container) throw new Error('GraphCanvas requires a mount container');
    ensureStyles();
    this.container = container;
    this.options = options;
    this.quizMode = !!options.quizMode;
    this.state = getState();
    this.viewBox = { ...this.state.viewport };

    this.root = document.createElement('div');
    this.root.className = 'graph-canvas-root';
    this.container.appendChild(this.root);

    this.svg = document.createElementNS(SVG_NS, 'svg');
    this.svg.setAttribute('class', 'graph-canvas-svg');
    this.svg.setAttribute('role', 'application');
    this.svg.setAttribute('aria-label', 'Interactive graphing canvas');
    this.svg.setAttribute(
      'viewBox',
      `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.width} ${this.viewBox.height}`
    );
    this.root.appendChild(this.svg);

    this.gridLayer = document.createElementNS(SVG_NS, 'g');
    this.axesLayer = document.createElementNS(SVG_NS, 'g');
    this.objectsLayer = document.createElementNS(SVG_NS, 'g');
    this.overlayLayer = document.createElementNS(SVG_NS, 'g');

    this.svg.appendChild(this.gridLayer);
    this.svg.appendChild(this.axesLayer);
    this.svg.appendChild(this.objectsLayer);
    this.svg.appendChild(this.overlayLayer);

    this.traceTooltip = document.createElement('div');
    this.traceTooltip.className = 'graph-trace-tooltip';
    this.root.appendChild(this.traceTooltip);

    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(this.root);

    this.svg.addEventListener('pointerdown', this.handlePointerDown.bind(this));
    this.svg.addEventListener('pointermove', this.handlePointerMove.bind(this));
    window.addEventListener('pointerup', this.handlePointerUp.bind(this));
    this.svg.addEventListener('wheel', this.handleWheel.bind(this), {
      passive: false,
    });
    this.svg.addEventListener('click', (evt) => {
      if (evt.target === this.svg) {
        setSelected(null);
      }
    });

    this.panContext = null;
    this.dragContext = null; // for dragging student points
    this.addLineContext = null; // for two-click line drawing
    this.removeBubble = null; // quiz-mode remove confirmation

    this.unsubscribe = subscribe((snapshot) => {
      this.state = snapshot;
      this.viewBox = { ...snapshot.viewport };
      this.updateViewBox();
      this.render();
    });

    // Load objects from spec if provided — tag them as origin='spec'
    if (
      options.spec &&
      options.spec.objects &&
      Array.isArray(options.spec.objects)
    ) {
      options.spec.objects.forEach((obj) => {
        try {
          addObject({ ...obj, origin: 'spec' });
        } catch (e) {
          console.warn('[GraphCanvas] Failed to add object from spec:', e);
        }
      });
    }

    this.render();
  }

  destroy() {
    this.dismissRemoveBubble();
    this.unsubscribe?.();
    this.resizeObserver?.disconnect();
    this.root.remove();
  }

  handleResize() {
    const { width, height } = this.root.getBoundingClientRect();
    if (height === 0 || width === 0) return;
    const aspect = width / height;
    const nextHeight = this.viewBox.width / aspect;
    if (Number.isFinite(nextHeight)) {
      const centerY = this.viewBox.y + this.viewBox.height / 2;
      this.viewBox.height = nextHeight;
      this.viewBox.y = centerY - nextHeight / 2;
      setViewport(this.viewBox);
    }
  }

  /** Hit-test: find the nearest student-origin point within a screen-pixel radius. */
  hitTestStudentPoint(graphPt, radiusPx = 18) {
    const bounds = this.root.getBoundingClientRect();
    const pxPerUnit = bounds.width / this.viewBox.width;
    const radiusGraph = radiusPx / pxPerUnit;
    let closest = null;
    let closestDist = Infinity;
    for (const obj of this.state.objects) {
      if (obj.type !== 'point' || obj.origin !== 'student') continue;
      const dx = obj.metadata.x - graphPt.x;
      const dy = obj.metadata.y - graphPt.y;
      const dist = Math.hypot(dx, dy);
      if (dist < radiusGraph && dist < closestDist) {
        closest = obj;
        closestDist = dist;
      }
    }
    return closest;
  }

  /** Dismiss any active remove-confirmation bubble. */
  dismissRemoveBubble() {
    if (this.removeBubble) {
      this.removeBubble.remove();
      this.removeBubble = null;
    }
  }

  /** Show a small "Remove?" confirmation bubble near a student point (quiz mode). */
  showRemoveBubble(obj, evt) {
    this.dismissRemoveBubble();
    const bounds = this.root.getBoundingClientRect();
    const bubble = document.createElement('div');
    bubble.className = 'graph-remove-bubble';
    bubble.innerHTML = `
      <span>Remove point?</span>
      <button class="remove-yes">Remove</button>
      <button class="remove-no">Cancel</button>
    `;
    bubble.style.left = `${evt.clientX - bounds.left}px`;
    bubble.style.top = `${evt.clientY - bounds.top}px`;
    bubble.querySelector('.remove-yes').addEventListener('click', (e) => {
      e.stopPropagation();
      removeObject(obj.id);
      this.dismissRemoveBubble();
    });
    bubble.querySelector('.remove-no').addEventListener('click', (e) => {
      e.stopPropagation();
      this.dismissRemoveBubble();
    });
    this.root.appendChild(bubble);
    this.removeBubble = bubble;
  }

  handlePointerDown(evt) {
    const point = this.screenToGraph(evt);
    const mode = this.state.mode;

    // ── Quiz mode: click-to-plot / click-to-remove (no toolbar, no drag) ──
    if (this.quizMode) {
      this.dismissRemoveBubble();
      const hitPoint = this.hitTestStudentPoint(point);
      if (hitPoint) {
        // Clicked an existing student point — show remove confirmation
        this.showRemoveBubble(hitPoint, evt);
      } else {
        // Clicked empty space — plot a new point (snapped to grid)
        const snapped = { x: snapToGrid(point.x), y: snapToGrid(point.y) };
        addObject({
          type: 'point',
          definition: snapped,
          origin: 'student',
        });
      }
      return;
    }

    // ── Full toolbar mode (practice tool) ──

    // Add Point mode — snap to integer grid
    if (mode === 'add-point') {
      const snapped = { x: snapToGrid(point.x), y: snapToGrid(point.y) };
      addObject({
        type: 'point',
        definition: snapped,
        origin: 'student',
      });
      setMode('pan');
      return;
    }

    // Add Line mode — two-click: first click sets point 1, second sets point 2 and creates line
    if (mode === 'add-line') {
      const snapped = { x: snapToGrid(point.x), y: snapToGrid(point.y) };
      if (!this.addLineContext) {
        // First click — show a temporary helper point
        this.addLineContext = { p1: snapped };
        // Add a temporary visual point (student origin, will be auto-managed)
        this._lineHelperPointId = addObject({
          type: 'point',
          definition: { ...snapped, label: '①' },
          origin: 'student',
        });
        return;
      } else {
        // Second click — create the line through both points
        const p1 = this.addLineContext.p1;
        const p2 = snapped;
        // Remove helper point
        if (this._lineHelperPointId) {
          removeObject(this._lineHelperPointId);
          this._lineHelperPointId = null;
        }
        if (p1.x !== p2.x || p1.y !== p2.y) {
          addObject({
            type: 'line',
            definition: { form: 'two-points', points: [p1, p2] },
            origin: 'student',
          });
        }
        this.addLineContext = null;
        setMode('pan');
        return;
      }
    }

    // Pan/trace mode — but first check for drag on a student point
    if (mode === 'pan' || mode === 'trace') {
      const hitPoint = this.hitTestStudentPoint(point);
      if (hitPoint) {
        this.dragContext = {
          objectId: hitPoint.id,
          startGraph: point,
          pointerId: evt.pointerId,
        };
        setSelected(hitPoint.id);
        this.svg.setPointerCapture(evt.pointerId);
        return;
      }
      this.panContext = {
        startX: evt.clientX,
        startY: evt.clientY,
        origin: { ...this.viewBox },
      };
      this.svg.setPointerCapture(evt.pointerId);
    }
  }

  handlePointerMove(evt) {
    if (this.state.mode === 'trace') {
      this.updateTraceTooltip(evt);
    } else {
      this.hideTraceTooltip();
    }

    // Handle dragging a student point (snap to grid)
    if (this.dragContext) {
      const graphPt = this.screenToGraph(evt);
      const snapped = { x: snapToGrid(graphPt.x), y: snapToGrid(graphPt.y) };
      updateObject(this.dragContext.objectId, { definition: snapped });
      return;
    }

    if (!this.panContext) return;
    const { startX, startY, origin } = this.panContext;
    const dx = evt.clientX - startX;
    const dy = evt.clientY - startY;
    const bounds = this.root.getBoundingClientRect();
    const scaleX = origin.width / bounds.width;
    const scaleY = origin.height / bounds.height;
    const nextViewBox = {
      x: origin.x - dx * scaleX,
      y: origin.y + dy * scaleY,
      width: origin.width,
      height: origin.height,
    };
    this.viewBox = nextViewBox;
    setViewport(nextViewBox);
  }

  handlePointerUp(evt) {
    if (this.dragContext) {
      this.svg.releasePointerCapture(evt.pointerId);
      this.dragContext = null;
      return;
    }
    if (this.panContext) {
      this.svg.releasePointerCapture(evt.pointerId);
      this.panContext = null;
    }
    this.hideTraceTooltip();
  }

  handleWheel(evt) {
    if (!evt.ctrlKey) return;
    evt.preventDefault();
    const delta = evt.deltaY > 0 ? 1.1 : 0.9;
    const mouse = this.screenToGraph(evt);
    const newWidth = this.viewBox.width * delta;
    const newHeight = this.viewBox.height * delta;
    const focusXRatio = (mouse.x - this.viewBox.x) / this.viewBox.width;
    const focusYRatio = (mouse.y - this.viewBox.y) / this.viewBox.height;
    this.viewBox = {
      x: mouse.x - newWidth * focusXRatio,
      y: mouse.y - newHeight * focusYRatio,
      width: newWidth,
      height: newHeight,
    };
    setViewport(this.viewBox);
  }

  updateViewBox() {
    this.svg.setAttribute(
      'viewBox',
      `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.width} ${this.viewBox.height}`
    );
    this.root.style.setProperty(
      '--graph-canvas-background',
      THEME_TOKENS[this.state.theme].background
    );
  }

  screenToGraph(evt) {
    const bounds = this.root.getBoundingClientRect();
    const xRatio = (evt.clientX - bounds.left) / bounds.width;
    const yRatio = (evt.clientY - bounds.top) / bounds.height;
    const x = this.viewBox.x + this.viewBox.width * xRatio;
    const y = this.viewBox.y + this.viewBox.height * yRatio;
    return { x, y: this.invertY(y) };
  }

  invertY(svgY) {
    const top = this.viewBox.y;
    const bottom = this.viewBox.y + this.viewBox.height;
    return bottom - (svgY - top);
  }

  graphToSvg(point) {
    return {
      x: point.x,
      y: this.viewBox.y + this.viewBox.height - (point.y - this.viewBox.y),
    };
  }

  hideTraceTooltip() {
    this.traceTooltip.classList.remove('visible');
  }

  updateTraceTooltip(evt) {
    const functions = this.state.objects.filter(
      (obj) => obj.type === 'function' || obj.type === 'line'
    );
    if (functions.length === 0) {
      this.hideTraceTooltip();
      return;
    }
    const selected = this.state.objects.find(
      (obj) =>
        obj.id === this.state.selectedId &&
        (obj.type === 'function' || obj.type === 'line')
    );
    const target = selected || functions[0];
    const graphPoint = this.screenToGraph(evt);
    let yValue = null;
    if (target.type === 'line') {
      const { metadata } = target;
      if (metadata.verticalX !== null && metadata.verticalX !== undefined) {
        yValue = null;
      } else {
        yValue = metadata.slope * graphPoint.x + metadata.intercept;
      }
    } else {
      yValue = evaluateFunctionAt(
        {
          subtype: target.metadata.subtype,
          coefficients: target.metadata.coefficients,
        },
        graphPoint.x
      );
    }
    if (yValue === null || !Number.isFinite(yValue)) {
      this.hideTraceTooltip();
      return;
    }
    const bounds = this.root.getBoundingClientRect();
    this.traceTooltip.textContent = `(${formatNumber(
      graphPoint.x
    )}, ${formatNumber(yValue)})`;
    this.traceTooltip.style.left = `${evt.clientX - bounds.left}px`;
    this.traceTooltip.style.top = `${evt.clientY - bounds.top}px`;
    this.traceTooltip.classList.add('visible');
  }

  render() {
    const theme = THEME_TOKENS[this.state.theme];
    this.root.style.setProperty('--graph-canvas-background', theme.background);
    this.traceTooltip.style.background =
      this.state.theme === 'dark'
        ? 'rgba(15, 23, 42, 0.92)'
        : 'rgba(255, 255, 255, 0.95)';
    this.traceTooltip.style.color =
      this.state.theme === 'dark' ? '#f8fafc' : '#0f172a';
    this.traceTooltip.style.boxShadow =
      this.state.theme === 'dark'
        ? '0 12px 24px rgba(14, 165, 233, 0.25)'
        : '0 12px 24px rgba(15, 23, 42, 0.18)';
    this.renderGrid(theme);
    this.renderAxes(theme);
    this.renderObjects(theme);
  }

  getGraphBounds() {
    const minX = this.viewBox.x;
    const maxX = this.viewBox.x + this.viewBox.width;
    const maxY = this.invertY(this.viewBox.y);
    const minY = this.invertY(this.viewBox.y + this.viewBox.height);
    return { minX, maxX, minY, maxY };
  }

  renderGrid(theme) {
    const step = determineTickStep(this.viewBox.width);
    this.gridLayer.replaceChildren();
    const minX = this.viewBox.x;
    const maxX = this.viewBox.x + this.viewBox.width;
    const minY = this.viewBox.y;
    const maxY = this.viewBox.y + this.viewBox.height;

    const startX = Math.floor(minX / step) * step;
    const startY = Math.floor(minY / step) * step;

    for (let x = startX; x <= maxX; x += step) {
      const line = document.createElementNS(SVG_NS, 'line');
      line.setAttribute('x1', `${x}`);
      line.setAttribute('x2', `${x}`);
      line.setAttribute('y1', `${minY}`);
      line.setAttribute('y2', `${maxY}`);
      line.setAttribute('stroke', theme.grid);
      line.setAttribute('class', 'graph-grid-line');
      this.gridLayer.appendChild(line);
    }

    for (let y = startY; y <= maxY; y += step) {
      const line = document.createElementNS(SVG_NS, 'line');
      line.setAttribute('x1', `${minX}`);
      line.setAttribute('x2', `${maxX}`);
      line.setAttribute('y1', `${y}`);
      line.setAttribute('y2', `${y}`);
      line.setAttribute('stroke', theme.grid);
      line.setAttribute('class', 'graph-grid-line');
      this.gridLayer.appendChild(line);
    }
  }

  renderAxes(theme) {
    this.axesLayer.replaceChildren();
    const axisX = document.createElementNS(SVG_NS, 'line');
    axisX.setAttribute('x1', `${this.viewBox.x}`);
    axisX.setAttribute('x2', `${this.viewBox.x + this.viewBox.width}`);
    const zeroY = this.graphToSvg({ x: 0, y: 0 }).y;
    axisX.setAttribute('y1', `${zeroY}`);
    axisX.setAttribute('y2', `${zeroY}`);
    axisX.setAttribute('stroke', theme.axis);
    axisX.setAttribute('class', 'graph-axis-line');
    this.axesLayer.appendChild(axisX);

    const axisY = document.createElementNS(SVG_NS, 'line');
    axisY.setAttribute('y1', `${this.viewBox.y}`);
    axisY.setAttribute('y2', `${this.viewBox.y + this.viewBox.height}`);
    const zeroX = this.graphToSvg({ x: 0, y: 0 }).x;
    axisY.setAttribute('x1', `${zeroX}`);
    axisY.setAttribute('x2', `${zeroX}`);
    axisY.setAttribute('stroke', theme.axis);
    axisY.setAttribute('class', 'graph-axis-line');
    this.axesLayer.appendChild(axisY);

    const bounds = this.getGraphBounds();
    const { minX, maxX, minY, maxY } = bounds;
    const xStep = determineTickStep(maxX - minX);
    const yStep = determineTickStep(maxY - minY);

    const labelGroup = document.createElementNS(SVG_NS, 'g');

    for (let x = Math.floor(minX / xStep) * xStep; x <= maxX; x += xStep) {
      const position = this.graphToSvg({ x, y: 0 });
      const label = document.createElementNS(SVG_NS, 'text');
      label.textContent = formatNumber(x, 2);
      label.setAttribute('x', `${position.x + 0.1}`);
      label.setAttribute('y', `${position.y - 0.35}`);
      label.setAttribute('fill', theme.axisLabel);
      label.setAttribute('class', 'graph-axis-label');
      labelGroup.appendChild(label);

      const tick = document.createElementNS(SVG_NS, 'line');
      tick.setAttribute('x1', `${position.x}`);
      tick.setAttribute('x2', `${position.x}`);
      tick.setAttribute('y1', `${position.y - 0.25}`);
      tick.setAttribute('y2', `${position.y + 0.25}`);
      tick.setAttribute('stroke', theme.axis);
      tick.setAttribute('stroke-width', '0.04');
      this.axesLayer.appendChild(tick);
    }

    for (let y = Math.floor(minY / yStep) * yStep; y <= maxY; y += yStep) {
      if (Math.abs(y) < 1e-9) continue;
      const position = this.graphToSvg({ x: 0, y });
      const label = document.createElementNS(SVG_NS, 'text');
      label.textContent = formatNumber(y, 2);
      label.setAttribute('x', `${position.x + 0.3}`);
      label.setAttribute('y', `${position.y + 0.4}`);
      label.setAttribute('fill', theme.axisLabel);
      label.setAttribute('class', 'graph-axis-label');
      labelGroup.appendChild(label);

      const tick = document.createElementNS(SVG_NS, 'line');
      tick.setAttribute('x1', `${position.x - 0.25}`);
      tick.setAttribute('x2', `${position.x + 0.25}`);
      tick.setAttribute('y1', `${position.y}`);
      tick.setAttribute('y2', `${position.y}`);
      tick.setAttribute('stroke', theme.axis);
      tick.setAttribute('stroke-width', '0.04');
      this.axesLayer.appendChild(tick);
    }

    this.axesLayer.appendChild(labelGroup);
  }

  renderObjects(theme) {
    this.objectsLayer.replaceChildren();
    this.state.objects.forEach((object) => {
      const element = this.renderObject(object, theme);
      if (element) {
        element.dataset.id = object.id;
        element.addEventListener('click', (evt) => {
          evt.stopPropagation();
          setSelected(object.id);
        });
        this.objectsLayer.appendChild(element);
      }
    });
  }

  renderObject(object, theme) {
    switch (object.type) {
      case 'point':
        return this.renderPoint(object, theme);
      case 'line':
        return this.renderLine(object, theme);
      case 'inequality':
        return this.renderInequality(object, theme);
      case 'function':
        return this.renderFunction(object, theme);
      default:
        return null;
    }
  }

  renderPoint(object, theme) {
    const isStudent = object.origin === 'student';
    const fillColor = isStudent ? theme.studentFill : theme.objectFill;
    const strokeColor = isStudent ? theme.studentStroke : theme.objectStroke;
    const group = document.createElementNS(SVG_NS, 'g');
    group.setAttribute(
      'class',
      `graph-object ${
        object.id === this.state.selectedId ? 'selected' : ''
      }`.trim()
    );
    group.setAttribute('role', 'img');
    group.setAttribute('aria-label', object.ariaLabel);
    const svgPoint = this.graphToSvg({
      x: object.metadata.x,
      y: object.metadata.y,
    });
    const circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttribute('cx', `${svgPoint.x}`);
    circle.setAttribute('cy', `${svgPoint.y}`);
    circle.setAttribute('r', `${this.viewBox.width * 0.012}`);
    circle.setAttribute('fill', fillColor);
    circle.setAttribute('stroke', strokeColor);
    circle.setAttribute('stroke-width', '0.06');
    circle.setAttribute('aria-label', object.ariaLabel);
    group.appendChild(circle);
    // Label for student points (show coordinates)
    if (isStudent) {
      const label = document.createElementNS(SVG_NS, 'text');
      label.textContent = `(${object.metadata.x}, ${object.metadata.y})`;
      label.setAttribute('x', `${svgPoint.x + this.viewBox.width * 0.015}`);
      label.setAttribute('y', `${svgPoint.y - this.viewBox.height * 0.015}`);
      label.setAttribute('fill', strokeColor);
      label.setAttribute('font-size', `${this.viewBox.width * 0.022}`);
      label.setAttribute('font-family', "'Inter', 'Segoe UI', sans-serif");
      label.setAttribute('font-weight', '600');
      label.setAttribute('pointer-events', 'none');
      group.appendChild(label);
    }
    return group;
  }

  renderLine(object, theme) {
    const isStudent = object.origin === 'student';
    const strokeColor = isStudent ? theme.studentStroke : theme.objectStroke;
    const coeffs = object.metadata;
    const points = generateLinePoints(coeffs, this.getGraphBounds());
    if (points.length < 2) return null;
    const svgA = this.graphToSvg(points[0]);
    const svgB = this.graphToSvg(points[1]);
    const line = document.createElementNS(SVG_NS, 'line');
    line.setAttribute('x1', `${svgA.x}`);
    line.setAttribute('x2', `${svgB.x}`);
    line.setAttribute('y1', `${svgA.y}`);
    line.setAttribute('y2', `${svgB.y}`);
    line.setAttribute('stroke', strokeColor);
    line.setAttribute('stroke-width', isStudent ? '0.07' : '0.06');
    if (isStudent) {
      line.setAttribute('stroke-dasharray', '0.3,0.15');
    }
    line.setAttribute(
      'class',
      `graph-object ${
        object.id === this.state.selectedId ? 'selected' : ''
      }`.trim()
    );
    line.setAttribute('role', 'img');
    line.setAttribute('aria-label', object.ariaLabel);
    return line;
  }

  renderFunction(object, theme) {
    const range = [this.viewBox.x, this.viewBox.x + this.viewBox.width];
    const points = sampleFunction(
      {
        subtype: object.metadata.subtype,
        coefficients: object.metadata.coefficients,
      },
      range,
      260
    );
    if (points.length < 2) return null;
    const polyline = document.createElementNS(SVG_NS, 'polyline');
    const svgPoints = points
      .filter((pt) => Number.isFinite(pt.y))
      .map((pt) => {
        const svgPt = this.graphToSvg(pt);
        return `${svgPt.x},${svgPt.y}`;
      })
      .join(' ');
    polyline.setAttribute('points', svgPoints);
    polyline.setAttribute('fill', 'none');
    polyline.setAttribute('stroke', theme.objectStroke);
    polyline.setAttribute('stroke-width', '0.06');
    polyline.setAttribute(
      'class',
      `graph-object ${
        object.id === this.state.selectedId ? 'selected' : ''
      }`.trim()
    );
    polyline.setAttribute('role', 'img');
    polyline.setAttribute('aria-label', object.ariaLabel);
    return polyline;
  }

  renderInequality(object, theme) {
    const coeffs = object.metadata;
    const boundary = this.renderLine({ ...object, type: 'line' }, theme);
    if (!boundary) return null;
    if (!coeffs.inclusive) {
      boundary.setAttribute('stroke-dasharray', '0.4,0.2');
    }

    const polygon = this.buildInequalityPolygon(coeffs);
    const group = document.createElementNS(SVG_NS, 'g');
    group.setAttribute(
      'class',
      `graph-object ${
        object.id === this.state.selectedId ? 'selected' : ''
      }`.trim()
    );
    group.setAttribute('role', 'img');
    group.setAttribute('aria-label', object.ariaLabel);
    boundary.setAttribute('aria-label', object.ariaLabel);

    if (polygon.length >= 3) {
      const poly = document.createElementNS(SVG_NS, 'polygon');
      poly.setAttribute(
        'points',
        polygon
          .map((pt) => {
            const svgPt = this.graphToSvg(pt);
            return `${svgPt.x},${svgPt.y}`;
          })
          .join(' ')
      );
      poly.setAttribute('fill', theme.shadeFill);
      poly.setAttribute('class', 'graph-inequality-fill');
      group.appendChild(poly);
    }

    group.appendChild(boundary);
    return group;
  }

  buildInequalityPolygon(coeffs) {
    const { side } = coeffs;
    const bounds = this.getGraphBounds();
    const { minX, maxX, minY, maxY } = bounds;

    const corners = [
      { x: minX, y: minY },
      { x: maxX, y: minY },
      { x: maxX, y: maxY },
      { x: minX, y: maxY },
    ];

    const satisfies = (x, y) => {
      if (coeffs.verticalX !== null && coeffs.verticalX !== undefined) {
        return side === 'above' ? x >= coeffs.verticalX : x <= coeffs.verticalX;
      }
      const compareValue = coeffs.slope * x + coeffs.intercept;
      return side === 'above' ? y >= compareValue : y <= compareValue;
    };

    const points = [];
    corners.forEach((pt) => {
      const graphPt = { x: pt.x, y: pt.y };
      if (satisfies(graphPt.x, graphPt.y)) {
        points.push(graphPt);
      }
    });

    const intersections = this.computeBoundaryIntersections(coeffs, bounds);
    intersections.forEach((pt) => {
      if (
        !points.some(
          (existing) =>
            Math.abs(existing.x - pt.x) < 1e-6 &&
            Math.abs(existing.y - pt.y) < 1e-6
        )
      ) {
        points.push(pt);
      }
    });

    if (points.length < 3) return [];
    const centroid = points.reduce(
      (acc, pt) => ({
        x: acc.x + pt.x / points.length,
        y: acc.y + pt.y / points.length,
      }),
      { x: 0, y: 0 }
    );
    points.sort(
      (a, b) =>
        Math.atan2(a.y - centroid.y, a.x - centroid.x) -
        Math.atan2(b.y - centroid.y, b.x - centroid.x)
    );
    return points;
  }

  computeBoundaryIntersections(coeffs, bounds) {
    const { minX, maxX, minY, maxY } = bounds;

    const points = [];

    if (coeffs.verticalX !== null && coeffs.verticalX !== undefined) {
      if (coeffs.verticalX >= minX && coeffs.verticalX <= maxX) {
        points.push({ x: coeffs.verticalX, y: minY });
        points.push({ x: coeffs.verticalX, y: maxY });
      }
      return points;
    }

    const slope = coeffs.slope;
    const intercept = coeffs.intercept;

    const yAtMinX = slope * minX + intercept;
    const yAtMaxX = slope * maxX + intercept;
    if (yAtMinX >= minY && yAtMinX <= maxY)
      points.push({ x: minX, y: yAtMinX });
    if (yAtMaxX >= minY && yAtMaxX <= maxY)
      points.push({ x: maxX, y: yAtMaxX });

    if (Math.abs(slope) > 1e-9) {
      const xAtMinY = (minY - intercept) / slope;
      const xAtMaxY = (maxY - intercept) / slope;
      if (xAtMinY >= minX && xAtMinY <= maxX)
        points.push({ x: xAtMinY, y: minY });
      if (xAtMaxY >= minX && xAtMaxY <= maxX)
        points.push({ x: xAtMaxY, y: maxY });
    }

    return points;
  }
}

export default GraphCanvas;

// Module API for mounting from quiz panel
export function mount(el, payload = {}) {
  try {
    const spec = payload.spec || payload.graphSpec || null;
    const quizMode = !!payload.quizMode;

    // If remounting with a new spec, reset the store first
    resetToSpec(spec?.objects || []);

    // Create wrapper for canvas and toolbar
    const wrapper = document.createElement('div');
    wrapper.style.cssText =
      'display: grid; gap: 16px; width: 100%; height: 100%;';
    el.appendChild(wrapper);

    let toolbar = null;
    if (!quizMode) {
      // Full toolbar for practice/graphing tool mode
      const toolbarContainer = document.createElement('div');
      wrapper.appendChild(toolbarContainer);
      toolbar = new GraphToolbar(toolbarContainer);
    }

    // Create canvas container
    const canvasContainer = document.createElement('div');
    canvasContainer.style.cssText = 'flex: 1; min-height: 400px;';
    wrapper.appendChild(canvasContainer);

    // Initialize canvas (spec already loaded into store via resetToSpec)
    const canvas = new GraphCanvas(canvasContainer, { quizMode });

    // Store instances for cleanup
    el.__graphToolbar = toolbar;
    el.__graphCanvas = canvas;
    el.__graphWrapper = wrapper;

    // Expose answer-capture API on the panel element for QuizInterface to read
    el.__getGraphAnswer = getStudentAnswer;

    return { toolbar, canvas };
  } catch (e) {
    console.warn('[GraphCanvas] mount failed:', e?.message || e);
    throw e;
  }
}

export function unmount(el) {
  try {
    if (
      el &&
      el.__graphToolbar &&
      typeof el.__graphToolbar.destroy === 'function'
    ) {
      el.__graphToolbar.destroy();
    }
    if (
      el &&
      el.__graphCanvas &&
      typeof el.__graphCanvas.destroy === 'function'
    ) {
      el.__graphCanvas.destroy();
    }
    if (el && el.__graphWrapper) {
      el.__graphWrapper.remove();
    }
  } catch {}
  if (el) {
    delete el.__graphToolbar;
    delete el.__graphCanvas;
    delete el.__graphWrapper;
    delete el.__getGraphAnswer;
  }
}
