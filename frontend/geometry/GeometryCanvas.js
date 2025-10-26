import {
  addShape,
  getState,
  setMeasurement,
  setSelection,
  subscribe,
  updateOverlay,
  updateShape,
} from './geometryStore.js';
import {
  DEFAULT_MAX_DECIMALS,
  assignLabels,
  buildAriaLabel,
  computeShapeMetrics,
  distance,
  formatNumber,
  roundValue,
} from './geometryMath.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const GRID_SIZE = 10;
const MIN_ZOOM = 0.35;
const MAX_ZOOM = 4;

const THEME_VARIANTS = {
  light: {
    background: '#ffffff',
    gridStroke: '#e5e5e5',
    primaryStroke: '#1d1d1f',
    primaryFill: 'rgba(33, 33, 33, 0.06)',
    text: '#111111',
    glow: 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))',
    handleFill: '#ffffff',
    handleStroke: '#333333',
    overlayStroke: '#2c3e50',
    overlayFill: 'rgba(52, 152, 219, 0.08)',
    measurementText: '#0f172a',
  },
  dark: {
    background: '#050505',
    gridStroke: 'rgba(0,255,255,0.12)',
    primaryStroke: '#ffffff',
    primaryFill: 'rgba(0,255,255,0.12)',
    text: '#e2fdff',
    glow: 'drop-shadow(0 0 8px rgba(0,255,255,0.3))',
    handleFill: '#001a1d',
    handleStroke: '#8af3ff',
    overlayStroke: '#8af3ff',
    overlayFill: 'rgba(0,255,255,0.08)',
    measurementText: '#ffffff',
  },
};

const ensureStyleTag = () => {
  if (document.getElementById('geometry-canvas-styles')) return;
  const style = document.createElement('style');
  style.id = 'geometry-canvas-styles';
  style.textContent = `
    .geometry-canvas-root {
      position: relative;
      width: 100%;
      height: 100%;
      touch-action: none;
      border-radius: 12px;
      overflow: hidden;
    }
    .geometry-canvas-svg {
      width: 100%;
      height: 100%;
      display: block;
      transition: background-color 160ms ease;
    }
    .geometry-shape {
      transition: opacity 150ms ease, stroke 160ms ease, fill 160ms ease;
      opacity: 0;
      animation: geometry-shape-fade 150ms ease forwards;
      filter: var(--geometry-shape-shadow, none);
    }
    .geometry-handle {
      cursor: pointer;
      transition: transform 120ms ease;
    }
    .geometry-handle:hover {
      transform: scale(1.15);
    }
    .geometry-overlay {
      cursor: move;
      transition: opacity 150ms ease;
    }
    .geometry-overlay-handle {
      cursor: grab;
    }
    .geometry-overlay-handle:active {
      cursor: grabbing;
    }
    .geometry-measure-label {
      font-size: 10px;
      user-select: none;
      pointer-events: none;
    }
    @keyframes geometry-shape-fade {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
};

class GeometryCanvas {
  constructor(container, options = {}) {
    if (!container) {
      throw new Error('GeometryCanvas requires a container element.');
    }

    ensureStyleTag();

    this.container = container;
    this.container.classList.add('geometry-canvas-root');

    this.state = getState();
    this.viewBox = { x: -200, y: -200, width: 400, height: 400 };
    this.panStart = null;
    this.draft = null;
    this.measurePoints = [];
    this.dragContext = null;
    this.options = options;

    this.svg = document.createElementNS(SVG_NS, 'svg');
    this.svg.setAttribute('class', 'geometry-canvas-svg');
    this.svg.setAttribute('role', 'application');
    this.svg.setAttribute('aria-label', 'Interactive geometry canvas');
    this.svg.setAttribute('viewBox', `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.width} ${this.viewBox.height}`);

    this.defs = document.createElementNS(SVG_NS, 'defs');
    this.gridPattern = document.createElementNS(SVG_NS, 'pattern');
    this.gridPattern.setAttribute('id', `grid-pattern-${Math.random().toString(36).slice(2, 8)}`);
    this.gridPattern.setAttribute('patternUnits', 'userSpaceOnUse');
    this.gridPattern.setAttribute('width', GRID_SIZE);
    this.gridPattern.setAttribute('height', GRID_SIZE);

    this.gridPath = document.createElementNS(SVG_NS, 'path');
    this.gridPath.setAttribute('d', `M ${GRID_SIZE} 0 L 0 0 0 ${GRID_SIZE}`);
    this.gridPath.setAttribute('fill', 'none');
    this.gridPath.setAttribute('stroke-width', '0.5');

    this.gridPattern.appendChild(this.gridPath);
    this.defs.appendChild(this.gridPattern);

    this.dropShadowFilter = document.createElementNS(SVG_NS, 'filter');
    this.dropShadowFilter.setAttribute('id', 'geometry-shadow');
    const feDrop = document.createElementNS(SVG_NS, 'feDropShadow');
    feDrop.setAttribute('dx', '0');
    feDrop.setAttribute('dy', '2');
    feDrop.setAttribute('stdDeviation', '2');
    feDrop.setAttribute('flood-color', 'rgba(0,0,0,0.18)');
    this.dropShadowFilter.appendChild(feDrop);
    this.defs.appendChild(this.dropShadowFilter);

    this.svg.appendChild(this.defs);

    this.gridRect = document.createElementNS(SVG_NS, 'rect');
    this.gridRect.setAttribute('x', '-1000');
    this.gridRect.setAttribute('y', '-1000');
    this.gridRect.setAttribute('width', '2000');
    this.gridRect.setAttribute('height', '2000');
    this.gridRect.setAttribute('fill', `url(#${this.gridPattern.getAttribute('id')})`);
    this.svg.appendChild(this.gridRect);

    this.overlayGroup = document.createElementNS(SVG_NS, 'g');
    this.overlayGroup.setAttribute('class', 'geometry-overlays');
    this.svg.appendChild(this.overlayGroup);

    this.shapeGroup = document.createElementNS(SVG_NS, 'g');
    this.shapeGroup.setAttribute('class', 'geometry-shapes');
    this.svg.appendChild(this.shapeGroup);

    this.measureGroup = document.createElementNS(SVG_NS, 'g');
    this.measureGroup.setAttribute('class', 'geometry-measurements');
    this.svg.appendChild(this.measureGroup);

    this.handleGroup = document.createElementNS(SVG_NS, 'g');
    this.handleGroup.setAttribute('class', 'geometry-handles');
    this.svg.appendChild(this.handleGroup);

    container.appendChild(this.svg);

    this.shapeElements = new Map();
    this.overlayElements = new Map();

    this.svg.addEventListener('pointerdown', this.onPointerDown.bind(this));
    this.svg.addEventListener('pointermove', this.onPointerMove.bind(this));
    this.svg.addEventListener('pointerup', this.onPointerUp.bind(this));
    this.svg.addEventListener('pointerleave', this.onPointerUp.bind(this));
    this.svg.addEventListener('wheel', this.onWheel.bind(this), { passive: false });
    this.svg.addEventListener('dblclick', this.onDoubleClick.bind(this));

    this.unsubscribe = subscribe(snapshot => {
      const previousTool = this.state?.tool;
      this.state = snapshot;
      if (previousTool === 'measure' && snapshot.tool !== 'measure') {
        this.measurePoints = [];
      }
      this.render();
    });

    this.render();
  }

  destroy() {
    this.unsubscribe?.();
    this.svg.remove();
  }

  get theme() {
    return THEME_VARIANTS[this.state.theme] || THEME_VARIANTS.light;
  }

  setViewBox(viewBox) {
    this.viewBox = viewBox;
    this.svg.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`);
    this.updateGridPattern();
  }

  updateGridPattern() {
    const { gridStroke } = this.theme;
    this.gridPath.setAttribute('stroke', gridStroke);
    const scale = this.viewBox.width / this.svg.clientWidth || 1;
    this.gridPath.setAttribute('stroke-width', `${0.5 * Math.max(scale, 0.5)}`);
    this.gridPattern.setAttribute('patternTransform', `translate(${this.viewBox.x} ${this.viewBox.y})`);
  }

  toWorldPoint(evt) {
    const rect = this.svg.getBoundingClientRect();
    const xRatio = (evt.clientX - rect.left) / rect.width;
    const yRatio = (evt.clientY - rect.top) / rect.height;
    const x = this.viewBox.x + xRatio * this.viewBox.width;
    const y = this.viewBox.y + yRatio * this.viewBox.height;
    return { x, y };
  }

  snapPoint(point) {
    const snap = value => Math.round(value / GRID_SIZE) * GRID_SIZE;
    return {
      x: snap(point.x),
      y: snap(point.y),
    };
  }

  onPointerDown(evt) {
    const tool = this.state.tool;
    const rawPoint = this.toWorldPoint(evt);
    const point = this.snapPoint(rawPoint);
    const target = evt.target;
    evt.preventDefault();

    const overlayHandle = target.dataset.overlayHandle;
    if (overlayHandle) {
      const overlayName = target.dataset.overlayName;
      const overlayState = this.state.overlays[overlayName];
      if (!overlayState) return;
      if (overlayHandle === 'rotate') {
        this.dragContext = {
          type: 'overlay-rotate',
          overlay: overlayName,
          origin: { x: overlayState.x, y: overlayState.y },
        };
      } else if (overlayHandle === 'resize') {
        this.dragContext = {
          type: 'overlay-resize',
          overlay: overlayName,
          origin: { x: overlayState.x, y: overlayState.y },
        };
      } else {
        this.dragContext = {
          type: 'overlay',
          overlay: overlayName,
          offset: { x: rawPoint.x - overlayState.x, y: rawPoint.y - overlayState.y },
        };
      }
      return;
    }

    const vertexHandle = target.dataset.vertexIndex;
    if (vertexHandle) {
      const shapeId = target.dataset.shapeId;
      if (vertexHandle === 'radius') {
        const circleParams = this.getCircleParams(shapeId);
        this.dragContext = {
          type: 'circle-radius',
          shapeId,
          center: circleParams?.center,
        };
        setSelection(shapeId);
        return;
      }
      if (vertexHandle === 'center') {
        const circleParams = this.getCircleParams(shapeId);
        this.dragContext = {
          type: 'circle-center',
          shapeId,
          circle: circleParams,
        };
        setSelection(shapeId);
        return;
      }
      this.dragContext = {
        type: 'vertex',
        shapeId,
        index: Number(vertexHandle),
      };
      setSelection(shapeId);
      return;
    }

    const shapeId = target.closest?.('[data-shape-id]')?.dataset?.shapeId;
    if (shapeId && tool === 'select') {
      setSelection(shapeId);
        this.dragContext = {
          type: 'shape',
          shapeId,
          startPoint: point,
          rawStart: rawPoint,
          originalPoints: this.getShapePoints(shapeId),
          originalCircle: this.getCircleParams(shapeId),
        };
      return;
    }

    if (tool === 'select') {
      this.dragContext = {
        type: 'pan',
        start: { x: evt.clientX, y: evt.clientY },
        viewBox: { ...this.viewBox },
      };
      setSelection(null);
      return;
    }

    if (tool === 'measure') {
      this.handleMeasurePoint(point);
      return;
    }

    this.handleDrawingPoint(point);
  }

  onPointerMove(evt) {
    if (!this.dragContext && !this.draft) return;
    const rawPoint = this.toWorldPoint(evt);
    const point = this.snapPoint(rawPoint);

    if (this.dragContext) {
      switch (this.dragContext.type) {
        case 'pan': {
          const { start, viewBox } = this.dragContext;
          const deltaX = ((evt.clientX - start.x) / this.svg.clientWidth) * viewBox.width;
          const deltaY = ((evt.clientY - start.y) / this.svg.clientHeight) * viewBox.height;
          this.setViewBox({
            x: viewBox.x - deltaX,
            y: viewBox.y - deltaY,
            width: viewBox.width,
            height: viewBox.height,
          });
          break;
        }
        case 'vertex': {
          updateShape(this.dragContext.shapeId, {
            params: {
              points: this.getShapePoints(this.dragContext.shapeId).map((pt, index) => {
                if (index === this.dragContext.index) {
                  return { ...pt, x: point.x, y: point.y };
                }
                return pt;
              }),
            },
          });
          break;
        }
        case 'shape': {
          const { shapeId, rawStart, originalPoints, originalCircle } = this.dragContext;
          const dx = rawPoint.x - rawStart.x;
          const dy = rawPoint.y - rawStart.y;
          if (originalPoints) {
            updateShape(shapeId, {
              params: {
                points: originalPoints.map(pt => ({
                  ...pt,
                  x: pt.x + dx,
                  y: pt.y + dy,
                })),
              },
            });
          } else if (originalCircle) {
            updateShape(shapeId, {
              params: {
                center: {
                  x: originalCircle.center.x + dx,
                  y: originalCircle.center.y + dy,
                },
                radius: originalCircle.radius,
              },
            });
          }
          break;
        }
        case 'circle-radius': {
          const { shapeId, center } = this.dragContext;
          if (!center) break;
          const radius = distance(center, rawPoint);
          updateShape(shapeId, {
            params: {
              center,
              radius,
            },
          });
          break;
        }
        case 'circle-center': {
          const { shapeId, circle } = this.dragContext;
          if (!circle) break;
          updateShape(shapeId, {
            params: {
              center: {
                x: rawPoint.x,
                y: rawPoint.y,
              },
              radius: circle.radius,
            },
          });
          break;
        }
        case 'overlay': {
          updateOverlay(this.dragContext.overlay, {
            x: rawPoint.x - this.dragContext.offset.x,
            y: rawPoint.y - this.dragContext.offset.y,
          });
          break;
        }
        case 'overlay-rotate': {
          const { origin, overlay } = this.dragContext;
          const angle = Math.atan2(rawPoint.y - origin.y, rawPoint.x - origin.x);
          updateOverlay(overlay, {
            rotation: angle,
          });
          break;
        }
        case 'overlay-resize': {
          const { origin, overlay } = this.dragContext;
          const length = distance(origin, rawPoint);
          if (overlay === 'ruler') {
            updateOverlay(overlay, {
              length,
            });
          } else if (overlay === 'compass') {
            updateOverlay(overlay, {
              radius: length,
            });
          }
          break;
        }
        default:
          break;
      }
    }

    if (this.draft) {
      this.updateDraft(point);
    }
  }

  onPointerUp() {
    if (this.dragContext?.type === 'overlay') {
      this.dragContext = null;
      return;
    }
    this.dragContext = null;
  }

  onWheel(evt) {
    if (!evt.ctrlKey) return;
    evt.preventDefault();
    const delta = evt.deltaY;
    const scaleFactor = delta > 0 ? 1.1 : 0.9;
    const newWidth = Math.min(Math.max(this.viewBox.width * scaleFactor, 200 * MIN_ZOOM), 2000 * MAX_ZOOM);
    const newHeight = (newWidth / this.viewBox.width) * this.viewBox.height;

    const cursor = this.toWorldPoint(evt);
    const dx = cursor.x - this.viewBox.x;
    const dy = cursor.y - this.viewBox.y;

    const ratioX = dx / this.viewBox.width;
    const ratioY = dy / this.viewBox.height;

    const newViewBox = {
      width: newWidth,
      height: newHeight,
      x: cursor.x - ratioX * newWidth,
      y: cursor.y - ratioY * newHeight,
    };
    this.setViewBox(newViewBox);
  }

  onDoubleClick(evt) {
    if (this.state.tool === 'polygon' && this.draft?.points?.length >= 3) {
      evt.preventDefault();
      this.finalizeDraft();
    }
  }

  handleDrawingPoint(point) {
    const tool = this.state.tool;
    const shapeTypeMap = {
      point: 'point',
      segment: 'segment',
      line: 'segment',
      triangle: 'triangle',
      circle: 'circle',
      polygon: 'polygon',
    };

    const shape = shapeTypeMap[tool];
    if (!shape) return;

    if (shape === 'point') {
      addShape({
        shape: 'point',
        params: {
          points: [
            {
              x: point.x,
              y: point.y,
              label: 'A',
            },
          ],
        },
      });
      return;
    }

    if (!this.draft) {
      this.draft = {
        shape,
        points: [point],
      };
      this.renderDraft();
      return;
    }

    this.draft.points.push(point);
    if ((shape === 'segment' && this.draft.points.length === 2) ||
      (shape === 'triangle' && this.draft.points.length === 3) ||
      (shape === 'circle' && this.draft.points.length === 2)) {
      this.finalizeDraft();
    } else {
      this.renderDraft();
    }
  }

  handleMeasurePoint(point) {
    this.measurePoints.push(point);
    if (this.measurePoints.length === 2) {
      const [a, b] = this.measurePoints;
      const length = roundValue(distance(a, b), DEFAULT_MAX_DECIMALS);
      setMeasurement({
        type: 'distance',
        label: `Distance ≈ ${formatNumber(length)}`,
        value: length,
        points: [a, b],
      });
    }
    if (this.measurePoints.length === 3) {
      const [a, b, c] = this.measurePoints;
      const ab = distance(a, b);
      const cb = distance(c, b);
      if (ab > 0 && cb > 0) {
        const angleRadians = Math.atan2(a.y - b.y, a.x - b.x) - Math.atan2(c.y - b.y, c.x - b.x);
        let degrees = (angleRadians * 180) / Math.PI;
        degrees = Math.abs(((degrees + 540) % 360) - 180);
        const rounded = roundValue(degrees, DEFAULT_MAX_DECIMALS);
        setMeasurement({
          type: 'angle',
          label: `Angle ≈ ${formatNumber(rounded)}°`,
          value: rounded,
          points: [a, b, c],
        });
      }
      this.measurePoints = [];
    }
    this.renderMeasurementOverlay();
  }

  updateDraft(point) {
    if (!this.draft) return;
    const { shape, points } = this.draft;
    if (shape === 'circle') {
      if (points.length === 1) {
        this.draft.preview = {
          center: points[0],
          radius: distance(points[0], point),
        };
      } else {
        this.draft.points[this.draft.points.length - 1] = point;
      }
    } else {
      this.draft.points[this.draft.points.length - 1] = point;
    }
    this.renderDraft();
  }

  finalizeDraft() {
    if (!this.draft) return;
    const { shape, points } = this.draft;
    if (shape === 'circle') {
      if (points.length < 2) {
        this.draft = null;
        return;
      }
      const [center, edge] = points;
      const radius = distance(center, edge);
      addShape({
        shape: 'circle',
        params: {
          center,
          radius,
          label: 'Circle',
        },
      });
    } else {
      if (shape === 'polygon' && points.length < 3) {
        this.draft = null;
        this.renderDraft();
        return;
      }
      const labelled = assignLabels(points);
      const normalizedPoints = labelled.map(pt => ({
        ...pt,
      }));
      addShape({
        shape,
        params: {
          points: normalizedPoints,
        },
      });
    }
    this.draft = null;
    this.renderDraft();
  }

  getShapePoints(shapeId) {
    const shape = this.state.shapes.find(item => item.id === shapeId);
    if (!shape) return null;
    return shape.params?.points?.map(pt => ({ ...pt })) || null;
  }

  getCircleParams(shapeId) {
    const shape = this.state.shapes.find(item => item.id === shapeId);
    if (shape?.shape !== 'circle') return null;
    return {
      center: { ...shape.params.center },
      radius: shape.params.radius,
    };
  }

  render() {
    const { background, primaryStroke } = this.theme;
    this.svg.style.background = background;
    this.svg.style.color = primaryStroke;
    this.svg.style.setProperty('--geometry-shape-shadow', this.theme.glow);
    this.updateGridPattern();
    this.renderShapes();
    this.renderHandles();
    this.renderOverlays();
    this.renderMeasurementOverlay();
  }

  renderShapes() {
    const existingIds = new Set(this.state.shapes.map(shape => shape.id));
    for (const [id, group] of this.shapeElements.entries()) {
      if (!existingIds.has(id)) {
        group.remove();
        this.shapeElements.delete(id);
      }
    }

    this.state.shapes.forEach(shape => {
      const metrics = computeShapeMetrics(shape) || {};
      const ariaLabel = buildAriaLabel(shape, metrics);
      let group = this.shapeElements.get(shape.id);
      if (!group) {
        group = document.createElementNS(SVG_NS, 'g');
        group.dataset.shapeId = shape.id;
        group.setAttribute('class', 'geometry-shape');
        this.shapeGroup.appendChild(group);
        this.shapeElements.set(shape.id, group);
      }
      group.setAttribute('aria-label', ariaLabel);
      group.replaceChildren(...this.createShapeElements(shape));
      if (this.state.selectedId === shape.id) {
        group.classList.add('selected');
      } else {
        group.classList.remove('selected');
      }
    });
  }

  createShapeElements(shape) {
    const { primaryStroke, primaryFill, text } = this.theme;
    const elements = [];
    if (shape.shape === 'point') {
      const [pt] = shape.params.points;
      const circle = document.createElementNS(SVG_NS, 'circle');
      circle.setAttribute('cx', pt.x);
      circle.setAttribute('cy', pt.y);
      circle.setAttribute('r', 3.5);
      circle.setAttribute('fill', primaryStroke);
      elements.push(circle);
    } else if (shape.shape === 'segment') {
      const [a, b] = shape.params.points;
      const line = document.createElementNS(SVG_NS, 'line');
      line.setAttribute('x1', a.x);
      line.setAttribute('y1', a.y);
      line.setAttribute('x2', b.x);
      line.setAttribute('y2', b.y);
      line.setAttribute('stroke', primaryStroke);
      line.setAttribute('stroke-width', '2');
      line.setAttribute('stroke-linecap', 'round');
      elements.push(line);
    } else if (shape.shape === 'triangle' || shape.shape === 'polygon') {
      const polygon = document.createElementNS(SVG_NS, 'polygon');
      const pointString = shape.params.points.map(pt => `${pt.x},${pt.y}`).join(' ');
      polygon.setAttribute('points', pointString);
      polygon.setAttribute('stroke', primaryStroke);
      polygon.setAttribute('fill', primaryFill);
      polygon.setAttribute('stroke-width', '2');
      polygon.setAttribute('stroke-linejoin', 'round');
      elements.push(polygon);
    } else if (shape.shape === 'circle') {
      const { center, radius } = shape.params;
      const circle = document.createElementNS(SVG_NS, 'circle');
      circle.setAttribute('cx', center.x);
      circle.setAttribute('cy', center.y);
      circle.setAttribute('r', radius);
      circle.setAttribute('stroke', primaryStroke);
      circle.setAttribute('fill', primaryFill);
      circle.setAttribute('stroke-width', '2');
      elements.push(circle);
    }

    if (shape.params?.points) {
      shape.params.points.forEach(pt => {
        const textEl = document.createElementNS(SVG_NS, 'text');
      textEl.setAttribute('x', pt.x + 4);
      textEl.setAttribute('y', pt.y - 6);
      textEl.setAttribute('fill', text);
      textEl.setAttribute('font-size', '10');
      textEl.setAttribute('pointer-events', 'none');
      textEl.textContent = pt.label;
      elements.push(textEl);
    });
    }

    return elements;
  }

  renderHandles() {
    this.handleGroup.replaceChildren();
    const { handleFill, handleStroke } = this.theme;
    const selected = this.state.shapes.find(shape => shape.id === this.state.selectedId);
    if (!selected) return;

    if (selected.params?.points) {
      selected.params.points.forEach((pt, index) => {
        const handle = document.createElementNS(SVG_NS, 'circle');
        handle.dataset.vertexIndex = index;
        handle.dataset.shapeId = selected.id;
        handle.setAttribute('class', 'geometry-handle');
        handle.setAttribute('cx', pt.x);
        handle.setAttribute('cy', pt.y);
        handle.setAttribute('r', 5);
        handle.setAttribute('fill', handleFill);
        handle.setAttribute('stroke', handleStroke);
        handle.setAttribute('stroke-width', '1.5');
        this.handleGroup.appendChild(handle);
      });
    }

    if (selected.shape === 'circle') {
      const { center, radius } = selected.params;
      const centerHandle = document.createElementNS(SVG_NS, 'circle');
      centerHandle.dataset.vertexIndex = 'center';
      centerHandle.dataset.shapeId = selected.id;
      centerHandle.setAttribute('class', 'geometry-handle');
      centerHandle.setAttribute('cx', center.x);
      centerHandle.setAttribute('cy', center.y);
      centerHandle.setAttribute('r', 5);
      centerHandle.setAttribute('fill', handleFill);
      centerHandle.setAttribute('stroke', handleStroke);
      centerHandle.setAttribute('stroke-width', '1.5');
      this.handleGroup.appendChild(centerHandle);

      const radiusHandle = document.createElementNS(SVG_NS, 'circle');
      radiusHandle.dataset.vertexIndex = 'radius';
      radiusHandle.dataset.shapeId = selected.id;
      radiusHandle.setAttribute('class', 'geometry-handle');
      radiusHandle.setAttribute('cx', center.x + radius);
      radiusHandle.setAttribute('cy', center.y);
      radiusHandle.setAttribute('r', 5);
      radiusHandle.setAttribute('fill', handleFill);
      radiusHandle.setAttribute('stroke', handleStroke);
      radiusHandle.setAttribute('stroke-width', '1.5');
      this.handleGroup.appendChild(radiusHandle);
    }
  }

  renderOverlays() {
    const overlays = this.state.overlays || {};
    const overlayNames = Object.keys(overlays);

    overlayNames.forEach(name => {
      const overlay = overlays[name];
      let group = this.overlayElements.get(name);
      if (!overlay.visible) {
        if (group) {
          group.remove();
          this.overlayElements.delete(name);
        }
        return;
      }

      if (!group) {
        group = document.createElementNS(SVG_NS, 'g');
        group.dataset.overlayName = name;
        group.setAttribute('class', 'geometry-overlay');
        this.overlayGroup.appendChild(group);
        this.overlayElements.set(name, group);
      }
      group.replaceChildren(...this.createOverlayElements(name, overlay));
    });
  }

  createOverlayElements(name, overlay) {
    const { overlayStroke, overlayFill, text } = this.theme;
    if (name === 'ruler') {
      const group = document.createElementNS(SVG_NS, 'g');
      group.setAttribute('transform', `translate(${overlay.x} ${overlay.y}) rotate(${(overlay.rotation * 180) / Math.PI})`);

      const body = document.createElementNS(SVG_NS, 'rect');
      body.setAttribute('x', '0');
      body.setAttribute('y', '-6');
      body.setAttribute('width', overlay.length);
      body.setAttribute('height', 12);
      body.setAttribute('rx', 3);
      body.setAttribute('fill', overlayFill);
      body.setAttribute('stroke', overlayStroke);
      body.setAttribute('stroke-width', '1.4');
      body.dataset.overlayHandle = 'move';
      body.dataset.overlayName = 'ruler';
      group.appendChild(body);

      const tickGroup = document.createElementNS(SVG_NS, 'g');
      const tickSpacing = GRID_SIZE / 2;
      const tickCount = Math.floor(overlay.length / tickSpacing);
      for (let i = 0; i <= tickCount; i++) {
        const tick = document.createElementNS(SVG_NS, 'line');
        const x = i * tickSpacing;
        tick.setAttribute('x1', x);
        tick.setAttribute('x2', x);
        tick.setAttribute('y1', i % 2 === 0 ? -6 : -3);
        tick.setAttribute('y2', 6);
        tick.setAttribute('stroke', overlayStroke);
        tick.setAttribute('stroke-width', i % 2 === 0 ? '1.2' : '0.8');
        tickGroup.appendChild(tick);
      }
      group.appendChild(tickGroup);

      const textEl = document.createElementNS(SVG_NS, 'text');
      textEl.setAttribute('x', overlay.length / 2);
      textEl.setAttribute('y', -10);
      textEl.setAttribute('fill', text);
      textEl.setAttribute('font-size', '10');
      textEl.setAttribute('text-anchor', 'middle');
      textEl.textContent = `≈ ${formatNumber(overlay.length / GRID_SIZE)} units`;
      group.appendChild(textEl);

      const rotateHandle = document.createElementNS(SVG_NS, 'circle');
      rotateHandle.setAttribute('cx', overlay.length + 8);
      rotateHandle.setAttribute('cy', 0);
      rotateHandle.setAttribute('r', 4);
      rotateHandle.setAttribute('fill', overlayFill);
      rotateHandle.setAttribute('stroke', overlayStroke);
      rotateHandle.dataset.overlayHandle = 'rotate';
      rotateHandle.dataset.overlayName = 'ruler';
      group.appendChild(rotateHandle);

      group.dataset.overlayHandle = 'move';
      group.dataset.overlayName = 'ruler';
      return [group];
    }

    if (name === 'protractor') {
      const group = document.createElementNS(SVG_NS, 'g');
      group.setAttribute('transform', `translate(${overlay.x} ${overlay.y}) rotate(${(overlay.rotation * 180) / Math.PI})`);

      const arc = document.createElementNS(SVG_NS, 'path');
      const radius = 60;
      const d = `M 0 0 A ${radius} ${radius} 0 0 1 ${radius} 0`; // semicircle
      arc.setAttribute('d', d);
      arc.setAttribute('fill', overlayFill);
      arc.setAttribute('stroke', overlayStroke);
      arc.setAttribute('stroke-width', '1.4');
      group.appendChild(arc);

      for (let i = 0; i <= 180; i += 10) {
        const tick = document.createElementNS(SVG_NS, 'line');
        const inner = radius - (i % 30 === 0 ? 8 : 4);
        const outer = radius;
        const angleRad = (i * Math.PI) / 180;
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);
        tick.setAttribute('x1', cos * inner);
        tick.setAttribute('y1', -sin * inner);
        tick.setAttribute('x2', cos * outer);
        tick.setAttribute('y2', -sin * outer);
        tick.setAttribute('stroke', overlayStroke);
        tick.setAttribute('stroke-width', i % 30 === 0 ? '1.2' : '0.6');
        group.appendChild(tick);
        if (i % 30 === 0) {
          const textEl = document.createElementNS(SVG_NS, 'text');
          textEl.setAttribute('x', cos * (inner - 6));
          textEl.setAttribute('y', -sin * (inner - 6));
          textEl.setAttribute('fill', text);
          textEl.setAttribute('font-size', '9');
          textEl.setAttribute('text-anchor', 'middle');
          textEl.setAttribute('alignment-baseline', 'middle');
          textEl.textContent = `${i}°`;
          group.appendChild(textEl);
        }
      }

      const rotateHandle = document.createElementNS(SVG_NS, 'circle');
      rotateHandle.setAttribute('cx', radius + 10);
      rotateHandle.setAttribute('cy', 0);
      rotateHandle.setAttribute('r', 5);
      rotateHandle.setAttribute('fill', overlayFill);
      rotateHandle.setAttribute('stroke', overlayStroke);
      rotateHandle.dataset.overlayHandle = 'rotate';
      rotateHandle.dataset.overlayName = 'protractor';
      group.appendChild(rotateHandle);

      group.dataset.overlayHandle = 'move';
      group.dataset.overlayName = 'protractor';
      return [group];
    }

    if (name === 'compass') {
      const group = document.createElementNS(SVG_NS, 'g');
      group.setAttribute('transform', `translate(${overlay.x} ${overlay.y}) rotate(${(overlay.rotation * 180) / Math.PI})`);

      const leg1 = document.createElementNS(SVG_NS, 'line');
      leg1.setAttribute('x1', 0);
      leg1.setAttribute('y1', 0);
      leg1.setAttribute('x2', 0);
      leg1.setAttribute('y2', -overlay.radius);
      leg1.setAttribute('stroke', overlayStroke);
      leg1.setAttribute('stroke-width', '2');
      group.appendChild(leg1);

      const leg2 = document.createElementNS(SVG_NS, 'line');
      leg2.setAttribute('x1', 8);
      leg2.setAttribute('y1', 0);
      leg2.setAttribute('x2', 8);
      leg2.setAttribute('y2', -overlay.radius);
      leg2.setAttribute('stroke', overlayStroke);
      leg2.setAttribute('stroke-width', '2');
      group.appendChild(leg2);

      const arc = document.createElementNS(SVG_NS, 'path');
      const d = `M 0 ${-overlay.radius} A ${overlay.radius} ${overlay.radius} 0 0 0 8 ${-overlay.radius}`;
      arc.setAttribute('d', d);
      arc.setAttribute('stroke', overlayStroke);
      arc.setAttribute('fill', 'none');
      arc.setAttribute('stroke-width', '1.2');
      group.appendChild(arc);

      const textEl = document.createElementNS(SVG_NS, 'text');
      textEl.setAttribute('x', 4);
      textEl.setAttribute('y', -overlay.radius - 8);
      textEl.setAttribute('fill', text);
      textEl.setAttribute('font-size', '10');
      textEl.setAttribute('text-anchor', 'middle');
      textEl.textContent = `r ≈ ${formatNumber(overlay.radius)} units`;
      group.appendChild(textEl);

      const resizeHandle = document.createElementNS(SVG_NS, 'circle');
      resizeHandle.setAttribute('cx', 4);
      resizeHandle.setAttribute('cy', -overlay.radius);
      resizeHandle.setAttribute('r', 5);
      resizeHandle.setAttribute('fill', overlayFill);
      resizeHandle.setAttribute('stroke', overlayStroke);
      resizeHandle.dataset.overlayHandle = 'resize';
      resizeHandle.dataset.overlayName = 'compass';
      group.appendChild(resizeHandle);

      group.dataset.overlayHandle = 'move';
      group.dataset.overlayName = 'compass';
      return [group];
    }

    return [];
  }

  renderMeasurementOverlay() {
    this.measureGroup.replaceChildren();
    const measurement = this.state.measurement;
    if (!measurement) return;

    const { measurementText, primaryStroke, overlayFill } = this.theme;

    if (measurement.type === 'distance' && measurement.points?.length === 2) {
      const [a, b] = measurement.points;
      const line = document.createElementNS(SVG_NS, 'line');
      line.setAttribute('x1', a.x);
      line.setAttribute('y1', a.y);
      line.setAttribute('x2', b.x);
      line.setAttribute('y2', b.y);
      line.setAttribute('stroke', primaryStroke);
      line.setAttribute('stroke-width', '1.2');
      line.setAttribute('stroke-dasharray', '4 2');
      this.measureGroup.appendChild(line);

      const textEl = document.createElementNS(SVG_NS, 'text');
      textEl.setAttribute('class', 'geometry-measure-label');
      textEl.setAttribute('x', (a.x + b.x) / 2);
      textEl.setAttribute('y', (a.y + b.y) / 2 - 6);
      textEl.setAttribute('fill', measurementText);
      textEl.setAttribute('text-anchor', 'middle');
      textEl.textContent = measurement.label;
      this.measureGroup.appendChild(textEl);
    }

    if (measurement.type === 'angle' && measurement.points?.length === 3) {
      const [a, b, c] = measurement.points;
      const path = document.createElementNS(SVG_NS, 'path');
      const radius = 20;
      const startAngle = Math.atan2(a.y - b.y, a.x - b.x);
      const endAngle = Math.atan2(c.y - b.y, c.x - b.x);
      const largeArc = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0;
      const startX = b.x + radius * Math.cos(startAngle);
      const startY = b.y + radius * Math.sin(startAngle);
      const endX = b.x + radius * Math.cos(endAngle);
      const endY = b.y + radius * Math.sin(endAngle);
      const d = `M ${b.x} ${b.y} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 0 ${endX} ${endY} Z`;
      path.setAttribute('d', d);
      path.setAttribute('fill', overlayFill || 'rgba(52, 152, 219, 0.15)');
      path.setAttribute('stroke', primaryStroke);
      path.setAttribute('stroke-width', '1');
      this.measureGroup.appendChild(path);

      const textEl = document.createElementNS(SVG_NS, 'text');
      textEl.setAttribute('class', 'geometry-measure-label');
      textEl.setAttribute('x', b.x + radius + 6);
      textEl.setAttribute('y', b.y - radius - 6);
      textEl.setAttribute('fill', measurementText);
      textEl.textContent = `${measurement.label}`;
      this.measureGroup.appendChild(textEl);
    }
  }

  renderDraft() {
    if (this.draftGroup) {
      this.draftGroup.remove();
      this.draftGroup = null;
    }
    if (!this.draft) return;
    const { shape, points, preview } = this.draft;
    const { primaryStroke, primaryFill } = this.theme;
    const group = document.createElementNS(SVG_NS, 'g');
    group.setAttribute('class', 'geometry-shape');

    if (shape === 'segment' && points.length >= 2) {
      const [a, b] = points;
      const line = document.createElementNS(SVG_NS, 'line');
      line.setAttribute('x1', a.x);
      line.setAttribute('y1', a.y);
      line.setAttribute('x2', b.x);
      line.setAttribute('y2', b.y);
      line.setAttribute('stroke', primaryStroke);
      line.setAttribute('stroke-width', '1.4');
      line.setAttribute('stroke-dasharray', '4 3');
      group.appendChild(line);
    }

    if ((shape === 'triangle' || shape === 'polygon') && points.length >= 2) {
      const polyline = document.createElementNS(SVG_NS, 'polyline');
      const pointString = points.map(pt => `${pt.x},${pt.y}`).join(' ');
      polyline.setAttribute('points', pointString);
      polyline.setAttribute('stroke', primaryStroke);
      polyline.setAttribute('fill', 'none');
      polyline.setAttribute('stroke-width', '1.4');
      polyline.setAttribute('stroke-dasharray', '4 2');
      group.appendChild(polyline);
    }

    if (shape === 'circle' && preview) {
      const circle = document.createElementNS(SVG_NS, 'circle');
      circle.setAttribute('cx', preview.center.x);
      circle.setAttribute('cy', preview.center.y);
      circle.setAttribute('r', preview.radius);
      circle.setAttribute('stroke', primaryStroke);
      circle.setAttribute('fill', primaryFill);
      circle.setAttribute('stroke-width', '1.2');
      circle.setAttribute('opacity', '0.4');
      group.appendChild(circle);
    }

    this.draftGroup = group;
    this.svg.appendChild(group);
  }
}

export default GeometryCanvas;
