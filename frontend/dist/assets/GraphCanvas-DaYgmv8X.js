const DEFAULT_MAX_DECIMALS = 3;
const roundValue = (value, decimals = DEFAULT_MAX_DECIMALS) => {
  if (value === null || value === void 0 || Number.isNaN(value)) return null;
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
};
const formatNumber = (value, decimals = DEFAULT_MAX_DECIMALS) => {
  const rounded = roundValue(value, decimals);
  if (rounded === null) return "—";
  if (!Number.isFinite(rounded)) return rounded > 0 ? "∞" : rounded < 0 ? "-∞" : "∞";
  return Number(rounded).toFixed(Math.min(decimals, DEFAULT_MAX_DECIMALS)).replace(/\.0+$/, "");
};
const slopeBetweenPoints = (a, b) => {
  if (!a || !b) return null;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (Math.abs(dx) < 1e-9) return Infinity;
  return dy / dx;
};
const slopeInterceptFromPoints = (a, b) => {
  if (!a || !b) return { slope: null, intercept: null };
  const slope = slopeBetweenPoints(a, b);
  if (!Number.isFinite(slope)) {
    return { slope: Infinity, intercept: null, verticalX: a.x };
  }
  const intercept = a.y - slope * a.x;
  return { slope, intercept, verticalX: null };
};
const xIntercept = ({ slope, intercept, verticalX }) => {
  if (verticalX !== null && verticalX !== void 0) return verticalX;
  if (!Number.isFinite(slope)) return null;
  if (Math.abs(slope) < 1e-9) return null;
  return -intercept / slope;
};
const yIntercept = ({ slope, intercept, verticalX }) => {
  if (verticalX !== null && verticalX !== void 0) return null;
  return intercept;
};
const evaluateLinear = (coeffs, x) => {
  if (coeffs.verticalX !== null && coeffs.verticalX !== void 0) {
    return null;
  }
  return coeffs.slope * x + coeffs.intercept;
};
const evaluateQuadratic = (coeffs, x) => {
  const { a = 1, b = 0, c = 0 } = coeffs;
  return a * x * x + b * x + c;
};
const evaluateAbsolute = (coeffs, x) => {
  const { a = 1, h = 0, k = 0 } = coeffs;
  return a * Math.abs(x - h) + k;
};
const evaluateFunctionAt = (definition, x) => {
  if (!definition) return null;
  switch (definition.subtype) {
    case "linear":
      return evaluateLinear(definition.coefficients, x);
    case "quadratic":
      return evaluateQuadratic(definition.coefficients, x);
    case "absolute":
      return evaluateAbsolute(definition.coefficients, x);
    default:
      return null;
  }
};
const describeFunctionExpression = (definition) => {
  if (!definition) return "y = ?";
  switch (definition.subtype) {
    case "linear": {
      const { m = 1, b = 0 } = definition.coefficients;
      const slopeText = m === 1 ? "x" : m === -1 ? "-x" : `${formatNumber(m)}x`;
      const interceptText = b === 0 ? "" : b > 0 ? ` + ${formatNumber(b)}` : ` - ${formatNumber(Math.abs(b))}`;
      return `y = ${slopeText}${interceptText}`;
    }
    case "quadratic": {
      const { a = 1, b = 0, c = 0 } = definition.coefficients;
      const terms = [];
      if (a !== 0) {
        const aText = a === 1 ? "" : a === -1 ? "-" : `${formatNumber(a)}`;
        terms.push(`${aText}x²`);
      }
      if (b !== 0) {
        const sign = b > 0 ? " + " : " - ";
        const bText = Math.abs(b) === 1 ? "" : formatNumber(Math.abs(b));
        terms.push(`${sign}${bText}x`);
      }
      if (c !== 0 || terms.length === 0) {
        const sign = c >= 0 ? terms.length ? " + " : "" : " - ";
        terms.push(`${sign}${formatNumber(Math.abs(c))}`);
      }
      return `y = ${terms.join("").replace(/^ \+ /, "")}`;
    }
    case "absolute": {
      const { a = 1, h = 0, k = 0 } = definition.coefficients;
      const aText = a === 1 ? "" : a === -1 ? "-" : `${formatNumber(a)}`;
      const hText = h === 0 ? "x" : h > 0 ? `(x - ${formatNumber(h)})` : `(x + ${formatNumber(Math.abs(h))})`;
      const kText = k === 0 ? "" : k > 0 ? ` + ${formatNumber(k)}` : ` - ${formatNumber(Math.abs(k))}`;
      return `y = ${aText}|${hText}|${kText}`;
    }
    default:
      return "y = ?";
  }
};
const computeAbsoluteVertex = (coefficients) => {
  const { h = 0, k = 0 } = coefficients;
  return { x: h, y: k };
};
const computeQuadraticVertex = (coefficients) => {
  const { a = 1, b = 0, c = 0 } = coefficients;
  const x = -b / (2 * a);
  const y = evaluateQuadratic(coefficients, x);
  return { x, y };
};
const sampleFunction = (definition, range, samples = 160) => {
  if (!definition || !range) return [];
  const [minX, maxX] = range;
  const step = (maxX - minX) / (samples - 1);
  const points = [];
  for (let i = 0; i < samples; i += 1) {
    const x = minX + step * i;
    const y = evaluateFunctionAt(definition, x);
    if (Number.isFinite(y)) {
      points.push({ x, y });
    }
  }
  return points;
};
const determineTickStep = (span) => {
  if (!span || !Number.isFinite(span) || span <= 0) return 1;
  const raw = span / 8;
  const power = Math.pow(10, Math.floor(Math.log10(raw)));
  const multiples = [1, 2, 5, 10];
  for (const multiplier of multiples) {
    const candidate = power * multiplier;
    if (candidate >= raw) {
      return candidate;
    }
  }
  return power * 10;
};
const computeLineSummary = (definition) => {
  if (!definition) return null;
  if (definition.form === "two-points") {
    const [a, b] = definition.points || [];
    return slopeInterceptFromPoints(a, b);
  }
  if (definition.form === "standard") {
    const { a = 0, b = 0, c = 0 } = definition;
    if (Math.abs(b) < 1e-9) {
      return { slope: Infinity, intercept: null, verticalX: -c / a };
    }
    const slope2 = -a / b;
    const intercept2 = -c / b;
    return { slope: slope2, intercept: intercept2, verticalX: null };
  }
  const { slope = 0, intercept = 0 } = definition;
  return { slope, intercept, verticalX: null };
};
const isAboveComparison = (comparison) => comparison === ">" || comparison === ">=";
const buildInequalityRegion = (comparison) => ({
  inclusive: comparison === ">=" || comparison === "<=",
  side: isAboveComparison(comparison) ? "above" : "below"
});
const createLineAriaLabel = (coeffs, extras = {}) => {
  if (!coeffs) return "Line";
  if (Number.isFinite(coeffs.slope)) {
    const slopeText = formatNumber(coeffs.slope);
    const interceptText = formatNumber(coeffs.intercept);
    return `Line with slope ${slopeText} and y-intercept ${interceptText}`;
  }
  return `Vertical line x = ${formatNumber(extras.verticalX ?? coeffs.verticalX)}`;
};
const describeLineExpression = (coeffs) => {
  if (!coeffs) return "Line";
  if (coeffs.verticalX !== null && coeffs.verticalX !== void 0) {
    return `x = ${formatNumber(coeffs.verticalX)}`;
  }
  if (Math.abs(coeffs.slope) < 1e-9) {
    return `y = ${formatNumber(coeffs.intercept)}`;
  }
  const slopeText = formatNumber(coeffs.slope);
  const intercept = coeffs.intercept || 0;
  let interceptText = "";
  if (intercept > 0) {
    interceptText = ` + ${formatNumber(intercept)}`;
  } else if (intercept < 0) {
    interceptText = ` - ${formatNumber(Math.abs(intercept))}`;
  }
  return `y = ${slopeText}x${interceptText}`;
};
const prepareGraphObject = (object = {}) => {
  const base = {
    id: object.id || null,
    type: object.type,
    definition: { ...object.definition },
    metadata: {},
    ariaLabel: ""
  };
  switch (object.type) {
    case "point": {
      const { x = 0, y = 0, label = null } = object.definition || {};
      base.metadata = {
        x,
        y,
        label,
        formatted: `(${formatNumber(x)}, ${formatNumber(y)})`
      };
      base.ariaLabel = `Point at (${formatNumber(x)}, ${formatNumber(y)})`;
      break;
    }
    case "line": {
      const summary = computeLineSummary(object.definition);
      base.metadata = {
        ...summary,
        form: object.definition.form || "slope-intercept",
        through: object.definition.points || null,
        expression: describeLineExpression(summary),
        xIntercept: xIntercept(summary),
        yIntercept: yIntercept(summary)
      };
      base.ariaLabel = createLineAriaLabel(summary, { verticalX: summary.verticalX });
      break;
    }
    case "inequality": {
      const { comparison = ">", ...rest } = object.definition || {};
      const lineSummary = computeLineSummary(rest);
      const region = buildInequalityRegion(comparison);
      base.metadata = {
        ...lineSummary,
        comparison,
        ...region,
        expression: lineSummary.verticalX !== null && lineSummary.verticalX !== void 0 ? (() => {
          const operatorMap = {
            ">": ">",
            ">=": "≥",
            "<": "<",
            "<=": "≤"
          };
          const operator = operatorMap[comparison] || comparison;
          return `x ${operator} ${formatNumber(lineSummary.verticalX)}`;
        })() : (() => {
          const boundary = describeLineExpression(lineSummary);
          const cleaned = boundary.startsWith("y = ") ? boundary.slice(4) : boundary;
          return `y ${comparison} ${cleaned}`;
        })(),
        xIntercept: xIntercept(lineSummary),
        yIntercept: yIntercept(lineSummary)
      };
      const directionText = region.side === "above" ? "above" : "below";
      base.ariaLabel = `Shaded region ${directionText} the line ${createLineAriaLabel(lineSummary)}`;
      break;
    }
    case "function": {
      const { subtype = "linear", coefficients = {} } = object.definition || {};
      let vertex = null;
      if (subtype === "quadratic") {
        vertex = computeQuadraticVertex(coefficients);
      } else if (subtype === "absolute") {
        vertex = computeAbsoluteVertex(coefficients);
      }
      base.metadata = {
        subtype,
        coefficients,
        expression: describeFunctionExpression({ subtype, coefficients }),
        vertex,
        direction: subtype === "quadratic" ? coefficients.a >= 0 ? "opens up" : "opens down" : subtype === "absolute" ? coefficients.a >= 0 ? "opens up" : "opens down" : coefficients.m >= 0 ? "increasing" : "decreasing"
      };
      base.ariaLabel = `${subtype.charAt(0).toUpperCase()}${subtype.slice(1)} function ${base.metadata.expression}`;
      break;
    }
    default:
      base.metadata = {};
      base.ariaLabel = "Graph object";
  }
  return base;
};
const generateLinePoints = (coeffs, bounds) => {
  if (!coeffs || !bounds) return [];
  const { minX, maxX, minY, maxY } = bounds;
  const points = [];
  if (coeffs.verticalX !== null && coeffs.verticalX !== void 0) {
    points.push({ x: coeffs.verticalX, y: minY });
    points.push({ x: coeffs.verticalX, y: maxY });
    return points;
  }
  const candidates = [];
  const yAtMinX = evaluateLinear(coeffs, minX);
  const yAtMaxX = evaluateLinear(coeffs, maxX);
  if (yAtMinX !== null) candidates.push({ x: minX, y: yAtMinX });
  if (yAtMaxX !== null) candidates.push({ x: maxX, y: yAtMaxX });
  if (coeffs.slope !== 0) {
    const xi = xIntercept(coeffs);
    if (xi !== null && xi >= minX && xi <= maxX) {
      candidates.push({ x: xi, y: 0 });
    }
  }
  const yi = yIntercept(coeffs);
  if (yi !== null && yi >= minY && yi <= maxY) {
    candidates.push({ x: 0, y: yi });
  }
  if (candidates.length < 2) {
    const mid = (minX + maxX) / 2;
    const yMid = evaluateLinear(coeffs, mid);
    if (yMid !== null) {
      const delta = (maxX - minX) / 2;
      const y1 = evaluateLinear(coeffs, mid - delta);
      const y2 = evaluateLinear(coeffs, mid + delta);
      if (y1 !== null) candidates.push({ x: mid - delta, y: y1 });
      if (y2 !== null) candidates.push({ x: mid + delta, y: y2 });
    }
  }
  const unique = [];
  const keySet = /* @__PURE__ */ new Set();
  candidates.forEach((pt) => {
    const key = `${roundValue(pt.x, 6)}:${roundValue(pt.y, 6)}`;
    if (!keySet.has(key)) {
      keySet.add(key);
      unique.push(pt);
    }
  });
  if (unique.length < 2) return unique;
  unique.sort((a, b) => a.x - b.x);
  return [unique[0], unique[unique.length - 1]];
};
let nextId = 1;
const clone = (value) => JSON.parse(JSON.stringify(value));
const state = {
  theme: "light",
  mode: "pan",
  objects: [],
  selectedId: null,
  aiHelpEnabled: false,
  viewport: {
    x: -12,
    y: -10,
    width: 24,
    height: 20
  }
};
const listeners = /* @__PURE__ */ new Set();
const notify = () => {
  const snapshot = clone(state);
  listeners.forEach((listener) => {
    try {
      listener(snapshot);
    } catch (err) {
      console.error("graphStore listener error", err);
    }
  });
};
const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const getState = () => clone(state);
const addObject = (object = {}) => {
  const id = object.id || `graph-object-${nextId++}`;
  if (!object.type) {
    throw new Error('graphStore.addObject requires a "type" property.');
  }
  const base = {
    id,
    type: object.type,
    definition: { ...object.definition }
  };
  const prepared = prepareGraphObject(base);
  prepared.id = id;
  state.objects = [...state.objects, prepared];
  state.selectedId = id;
  notify();
  return id;
};
const setSelected = (id) => {
  state.selectedId = id;
  notify();
};
const setMode = (mode) => {
  state.mode = mode;
  notify();
};
const setTheme = (theme) => {
  state.theme = theme === "dark" ? "dark" : "light";
  notify();
};
const setViewport = (nextViewport) => {
  if (!nextViewport) return;
  state.viewport = {
    ...state.viewport,
    ...nextViewport
  };
  notify();
};
const ensureStyles$1 = () => {
  if (document.getElementById("graph-toolbar-styles")) return;
  const style = document.createElement("style");
  style.id = "graph-toolbar-styles";
  style.textContent = `
    .graph-toolbar {
      display: grid;
      gap: 12px;
      padding: 16px;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 20px 48px rgba(15, 23, 42, 0.18);
      backdrop-filter: blur(12px);
      color: #000000;
    }
    .graph-toolbar.dark {
      background: rgba(15, 23, 42, 0.78);
      color: #e2e8f0;
      box-shadow: 0 22px 50px rgba(13, 148, 136, 0.22);
    }
    .graph-toolbar .toolbar-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }
    .graph-toolbar button,
    .graph-toolbar select {
      appearance: none;
      border: none;
      border-radius: 12px;
      padding: 8px 14px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease;
      background: #ffffff;
      color: inherit;
      box-shadow: inset 0 1px 0 rgba(148, 163, 184, 0.22);
    }
    .graph-toolbar.dark button,
    .graph-toolbar.dark select {
      background: rgba(15, 23, 42, 0.88);
      box-shadow: inset 0 1px 0 rgba(56, 189, 248, 0.28);
    }
    .graph-toolbar button.active {
      background: linear-gradient(120deg, #0ea5e9, #22d3ee);
      color: #0b1120;
      box-shadow: 0 12px 24px rgba(14, 165, 233, 0.3);
    }
    .graph-toolbar button:hover {
      transform: translateY(-1px);
    }
    .graph-toolbar details {
      background: #ffffff;
      border-radius: 14px;
      padding: 12px 14px;
      box-shadow: inset 0 1px 0 rgba(148, 163, 184, 0.2);
    }
    .graph-toolbar.dark details {
      background: rgba(15, 23, 42, 0.88);
      box-shadow: inset 0 1px 0 rgba(56, 189, 248, 0.2);
    }
    .graph-toolbar details summary {
      font-weight: 700;
      cursor: pointer;
      margin-bottom: 8px;
    }
    .graph-toolbar form {
      display: grid;
      gap: 8px;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    }
    .graph-toolbar .function-coefficients {
      display: grid;
      gap: 8px;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    }
    .graph-toolbar label {
      display: grid;
      gap: 4px;
      font-size: 13px;
    }
    .graph-toolbar input {
      border: 1px solid rgba(148, 163, 184, 0.4);
      border-radius: 10px;
      padding: 6px 10px;
      font-size: 14px;
      background: #ffffff;
      color: inherit;
    }
    .graph-toolbar.dark input {
      background: rgba(15, 23, 42, 0.92);
      border-color: rgba(56, 189, 248, 0.35);
      color: inherit;
    }
    .graph-toolbar .form-actions {
      grid-column: 1 / -1;
      display: flex;
      justify-content: flex-end;
    }
    .graph-toolbar .form-actions button {
      background: linear-gradient(120deg, #0ea5e9, #38bdf8);
      color: #0b1120;
      box-shadow: 0 10px 22px rgba(14, 165, 233, 0.3);
    }
  `;
  document.head.appendChild(style);
};
const parseNumber = (value) => {
  const num = parseFloat(value);
  return Number.isFinite(num) ? num : 0;
};
class GraphToolbar {
  constructor(container) {
    if (!container) throw new Error("GraphToolbar requires a mount container");
    ensureStyles$1();
    this.container = container;
    this.state = getState();
    this.root = document.createElement("div");
    this.root.className = "graph-toolbar";
    this.container.appendChild(this.root);
    this.render();
    this.unsubscribe = subscribe((snapshot) => {
      this.state = snapshot;
      this.render();
    });
  }
  destroy() {
    var _a;
    (_a = this.unsubscribe) == null ? void 0 : _a.call(this);
    this.root.remove();
  }
  render() {
    this.root.classList.toggle("dark", this.state.theme === "dark");
    this.root.replaceChildren(this.renderPrimaryRow(), this.renderFormsSection());
  }
  renderPrimaryRow() {
    const row = document.createElement("div");
    row.className = "toolbar-row";
    row.appendChild(this.createModeButton("pan", "Move / Pan"));
    row.appendChild(this.createModeButton("add-point", "Add Point"));
    row.appendChild(this.createModeButton("trace", "Trace / Inspect"));
    const zoomIn = document.createElement("button");
    zoomIn.type = "button";
    zoomIn.textContent = "Zoom In";
    zoomIn.addEventListener("click", () => this.adjustZoom(0.9));
    row.appendChild(zoomIn);
    const zoomOut = document.createElement("button");
    zoomOut.type = "button";
    zoomOut.textContent = "Zoom Out";
    zoomOut.addEventListener("click", () => this.adjustZoom(1.1));
    row.appendChild(zoomOut);
    const themeSelect = document.createElement("select");
    themeSelect.innerHTML = '<option value="light">Light</option><option value="dark">Dark</option>';
    themeSelect.value = this.state.theme;
    themeSelect.addEventListener("change", (evt) => setTheme(evt.target.value));
    row.appendChild(themeSelect);
    return row;
  }
  createModeButton(mode, label) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.classList.toggle("active", this.state.mode === mode);
    button.addEventListener("click", () => setMode(mode));
    return button;
  }
  adjustZoom(multiplier) {
    const state2 = getState();
    const view = state2.viewport;
    const newWidth = view.width * multiplier;
    const newHeight = view.height * multiplier;
    const centerX = view.x + view.width / 2;
    const centerY = view.y + view.height / 2;
    setViewport({
      x: centerX - newWidth / 2,
      y: centerY - newHeight / 2,
      width: newWidth,
      height: newHeight
    });
  }
  renderFormsSection() {
    const wrapper = document.createElement("div");
    wrapper.className = "toolbar-forms";
    wrapper.appendChild(this.createPointForm());
    wrapper.appendChild(this.createSlopeForm());
    wrapper.appendChild(this.createTwoPointForm());
    wrapper.appendChild(this.createInequalityForm());
    wrapper.appendChild(this.createFunctionForm());
    return wrapper;
  }
  createPointForm() {
    const details = document.createElement("details");
    details.open = true;
    const summary = document.createElement("summary");
    summary.textContent = "Plot a Point";
    details.appendChild(summary);
    const form = document.createElement("form");
    const xLabel = document.createElement("label");
    xLabel.textContent = "x-coordinate";
    const xInput = document.createElement("input");
    xInput.type = "number";
    xInput.step = "0.1";
    xInput.required = true;
    xLabel.appendChild(xInput);
    const yLabel = document.createElement("label");
    yLabel.textContent = "y-coordinate";
    const yInput = document.createElement("input");
    yInput.type = "number";
    yInput.step = "0.1";
    yInput.required = true;
    yLabel.appendChild(yInput);
    const actions = document.createElement("div");
    actions.className = "form-actions";
    const addButton = document.createElement("button");
    addButton.type = "submit";
    addButton.textContent = "Add Point";
    actions.appendChild(addButton);
    form.appendChild(xLabel);
    form.appendChild(yLabel);
    form.appendChild(actions);
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      setMode("add-point");
      addObject({
        type: "point",
        definition: { x: parseNumber(xInput.value), y: parseNumber(yInput.value) }
      });
      setMode("pan");
      form.reset();
    });
    details.appendChild(form);
    return details;
  }
  createSlopeForm() {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = "Line: slope-intercept";
    details.appendChild(summary);
    const form = document.createElement("form");
    const slopeLabel = document.createElement("label");
    slopeLabel.textContent = "Slope (m)";
    const slopeInput = document.createElement("input");
    slopeInput.type = "number";
    slopeInput.step = "0.1";
    slopeInput.value = "1";
    slopeLabel.appendChild(slopeInput);
    const interceptLabel = document.createElement("label");
    interceptLabel.textContent = "Y-intercept (b)";
    const interceptInput = document.createElement("input");
    interceptInput.type = "number";
    interceptInput.step = "0.1";
    interceptInput.value = "0";
    interceptLabel.appendChild(interceptInput);
    const actions = document.createElement("div");
    actions.className = "form-actions";
    const submit = document.createElement("button");
    submit.type = "submit";
    submit.textContent = "Add Line";
    actions.appendChild(submit);
    form.appendChild(slopeLabel);
    form.appendChild(interceptLabel);
    form.appendChild(actions);
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      setMode("add-line");
      addObject({
        type: "line",
        definition: {
          form: "slope-intercept",
          slope: parseNumber(slopeInput.value),
          intercept: parseNumber(interceptInput.value)
        }
      });
      setMode("pan");
    });
    details.appendChild(form);
    return details;
  }
  createTwoPointForm() {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = "Line: through two points";
    details.appendChild(summary);
    const form = document.createElement("form");
    const inputs = ["x₁", "y₁", "x₂", "y₂"].map((label) => {
      const wrapper = document.createElement("label");
      wrapper.textContent = label;
      const input = document.createElement("input");
      input.type = "number";
      input.step = "0.1";
      wrapper.appendChild(input);
      form.appendChild(wrapper);
      return input;
    });
    const actions = document.createElement("div");
    actions.className = "form-actions";
    const submit = document.createElement("button");
    submit.type = "submit";
    submit.textContent = "Add Line";
    actions.appendChild(submit);
    form.appendChild(actions);
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const [x1, y1, x2, y2] = inputs.map((input) => parseNumber(input.value));
      if (x1 === x2 && y1 === y2) return;
      setMode("add-line");
      addObject({
        type: "line",
        definition: {
          form: "two-points",
          points: [
            { x: x1, y: y1 },
            { x: x2, y: y2 }
          ]
        }
      });
      setMode("pan");
    });
    details.appendChild(form);
    return details;
  }
  createInequalityForm() {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = "Linear inequality";
    details.appendChild(summary);
    const form = document.createElement("form");
    const comparisonLabel = document.createElement("label");
    comparisonLabel.textContent = "Comparison";
    const select = document.createElement("select");
    [">", ">=", "<", "<="].forEach((symbol) => {
      const option = document.createElement("option");
      option.value = symbol;
      option.textContent = symbol;
      select.appendChild(option);
    });
    comparisonLabel.appendChild(select);
    const slopeLabel = document.createElement("label");
    slopeLabel.textContent = "Slope (m)";
    const slopeInput = document.createElement("input");
    slopeInput.type = "number";
    slopeInput.step = "0.1";
    slopeInput.value = "1";
    slopeLabel.appendChild(slopeInput);
    const interceptLabel = document.createElement("label");
    interceptLabel.textContent = "Y-intercept (b)";
    const interceptInput = document.createElement("input");
    interceptInput.type = "number";
    interceptInput.step = "0.1";
    interceptInput.value = "0";
    interceptLabel.appendChild(interceptInput);
    const actions = document.createElement("div");
    actions.className = "form-actions";
    const submit = document.createElement("button");
    submit.type = "submit";
    submit.textContent = "Add Inequality";
    actions.appendChild(submit);
    form.appendChild(comparisonLabel);
    form.appendChild(slopeLabel);
    form.appendChild(interceptLabel);
    form.appendChild(actions);
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      setMode("add-inequality");
      addObject({
        type: "inequality",
        definition: {
          comparison: select.value,
          form: "slope-intercept",
          slope: parseNumber(slopeInput.value),
          intercept: parseNumber(interceptInput.value)
        }
      });
      setMode("pan");
    });
    details.appendChild(form);
    return details;
  }
  createFunctionForm() {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = "Function y = f(x)";
    details.appendChild(summary);
    const form = document.createElement("form");
    const typeLabel = document.createElement("label");
    typeLabel.textContent = "Type";
    const typeSelect = document.createElement("select");
    typeSelect.innerHTML = '<option value="linear">Linear (mx + b)</option><option value="quadratic">Quadratic (ax² + bx + c)</option><option value="absolute">Absolute a|x - h| + k</option>';
    typeLabel.appendChild(typeSelect);
    const coefficientWrapper = document.createElement("div");
    coefficientWrapper.className = "function-coefficients";
    const renderCoefficientInputs = () => {
      coefficientWrapper.replaceChildren();
      if (typeSelect.value === "linear") {
        coefficientWrapper.appendChild(this.createNumberInput("Slope (m)", "1"));
        coefficientWrapper.appendChild(this.createNumberInput("Intercept (b)", "0"));
      } else if (typeSelect.value === "quadratic") {
        coefficientWrapper.appendChild(this.createNumberInput("a", "1"));
        coefficientWrapper.appendChild(this.createNumberInput("b", "0"));
        coefficientWrapper.appendChild(this.createNumberInput("c", "0"));
      } else {
        coefficientWrapper.appendChild(this.createNumberInput("a", "1"));
        coefficientWrapper.appendChild(this.createNumberInput("h", "0"));
        coefficientWrapper.appendChild(this.createNumberInput("k", "0"));
      }
    };
    typeSelect.addEventListener("change", renderCoefficientInputs);
    renderCoefficientInputs();
    const actions = document.createElement("div");
    actions.className = "form-actions";
    const submit = document.createElement("button");
    submit.type = "submit";
    submit.textContent = "Add Function";
    actions.appendChild(submit);
    form.appendChild(typeLabel);
    form.appendChild(coefficientWrapper);
    form.appendChild(actions);
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputs = Array.from(coefficientWrapper.querySelectorAll("input"));
      const values = inputs.map((input) => parseNumber(input.value));
      const subtype = typeSelect.value;
      let coefficients = {};
      if (subtype === "linear") {
        const [m = 1, b = 0] = values;
        coefficients = { m, b };
      } else if (subtype === "quadratic") {
        const [a = 1, b = 0, c = 0] = values;
        coefficients = { a, b, c };
      } else {
        const [a = 1, h = 0, k = 0] = values;
        coefficients = { a, h, k };
      }
      setMode("add-function");
      addObject({
        type: "function",
        definition: {
          subtype,
          coefficients
        }
      });
      setMode("pan");
    });
    details.appendChild(form);
    return details;
  }
  createNumberInput(labelText, defaultValue = "0") {
    const label = document.createElement("label");
    label.textContent = labelText;
    const input = document.createElement("input");
    input.type = "number";
    input.step = "0.1";
    input.value = defaultValue;
    label.appendChild(input);
    return label;
  }
}
const SVG_NS = "http://www.w3.org/2000/svg";
const THEME_TOKENS = {
  light: {
    background: "#ffffff",
    grid: "#e5e5e5",
    axis: "#111827",
    axisLabel: "#111827",
    highlight: "#0ea5e9",
    objectStroke: "#1f2937",
    objectFill: "rgba(14, 165, 233, 0.12)",
    shadeFill: "rgba(14, 165, 233, 0.12)",
    trace: "#111827"
  },
  dark: {
    background: "#020617",
    grid: "rgba(14, 165, 233, 0.22)",
    axis: "#f8fafc",
    axisLabel: "#f8fafc",
    highlight: "#38bdf8",
    objectStroke: "#ffffff",
    objectFill: "rgba(56, 189, 248, 0.18)",
    shadeFill: "rgba(56, 189, 248, 0.16)",
    trace: "#f8fafc"
  }
};
const ensureStyles = () => {
  if (document.getElementById("graph-canvas-styles")) return;
  const style = document.createElement("style");
  style.id = "graph-canvas-styles";
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
  `;
  document.head.appendChild(style);
};
class GraphCanvas {
  constructor(container, options = {}) {
    if (!container) throw new Error("GraphCanvas requires a mount container");
    ensureStyles();
    this.container = container;
    this.options = options;
    this.state = getState();
    this.viewBox = { ...this.state.viewport };
    this.root = document.createElement("div");
    this.root.className = "graph-canvas-root";
    this.container.appendChild(this.root);
    this.svg = document.createElementNS(SVG_NS, "svg");
    this.svg.setAttribute("class", "graph-canvas-svg");
    this.svg.setAttribute("role", "application");
    this.svg.setAttribute("aria-label", "Interactive graphing canvas");
    this.svg.setAttribute(
      "viewBox",
      `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.width} ${this.viewBox.height}`
    );
    this.root.appendChild(this.svg);
    this.gridLayer = document.createElementNS(SVG_NS, "g");
    this.axesLayer = document.createElementNS(SVG_NS, "g");
    this.objectsLayer = document.createElementNS(SVG_NS, "g");
    this.overlayLayer = document.createElementNS(SVG_NS, "g");
    this.svg.appendChild(this.gridLayer);
    this.svg.appendChild(this.axesLayer);
    this.svg.appendChild(this.objectsLayer);
    this.svg.appendChild(this.overlayLayer);
    this.traceTooltip = document.createElement("div");
    this.traceTooltip.className = "graph-trace-tooltip";
    this.root.appendChild(this.traceTooltip);
    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(this.root);
    this.svg.addEventListener("pointerdown", this.handlePointerDown.bind(this));
    this.svg.addEventListener("pointermove", this.handlePointerMove.bind(this));
    window.addEventListener("pointerup", this.handlePointerUp.bind(this));
    this.svg.addEventListener("wheel", this.handleWheel.bind(this), {
      passive: false
    });
    this.svg.addEventListener("click", (evt) => {
      if (evt.target === this.svg) {
        setSelected(null);
      }
    });
    this.panContext = null;
    this.unsubscribe = subscribe((snapshot) => {
      this.state = snapshot;
      this.viewBox = { ...snapshot.viewport };
      this.updateViewBox();
      this.render();
    });
    if (options.spec && options.spec.objects && Array.isArray(options.spec.objects)) {
      options.spec.objects.forEach((obj) => {
        try {
          addObject(obj);
        } catch (e) {
          console.warn("[GraphCanvas] Failed to add object from spec:", e);
        }
      });
    }
    this.render();
  }
  destroy() {
    var _a, _b;
    (_a = this.unsubscribe) == null ? void 0 : _a.call(this);
    (_b = this.resizeObserver) == null ? void 0 : _b.disconnect();
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
  handlePointerDown(evt) {
    const point = this.screenToGraph(evt);
    const mode = this.state.mode;
    if (mode === "add-point") {
      addObject({
        type: "point",
        definition: { x: point.x, y: point.y }
      });
      setMode("pan");
      return;
    }
    if (mode === "pan" || mode === "trace") {
      this.panContext = {
        startX: evt.clientX,
        startY: evt.clientY,
        origin: { ...this.viewBox }
      };
      this.svg.setPointerCapture(evt.pointerId);
    }
  }
  handlePointerMove(evt) {
    if (this.state.mode === "trace") {
      this.updateTraceTooltip(evt);
    } else {
      this.hideTraceTooltip();
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
      height: origin.height
    };
    this.viewBox = nextViewBox;
    setViewport(nextViewBox);
  }
  handlePointerUp(evt) {
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
      height: newHeight
    };
    setViewport(this.viewBox);
  }
  updateViewBox() {
    this.svg.setAttribute(
      "viewBox",
      `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.width} ${this.viewBox.height}`
    );
    this.root.style.setProperty(
      "--graph-canvas-background",
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
      y: this.viewBox.y + this.viewBox.height - (point.y - this.viewBox.y)
    };
  }
  hideTraceTooltip() {
    this.traceTooltip.classList.remove("visible");
  }
  updateTraceTooltip(evt) {
    const functions = this.state.objects.filter(
      (obj) => obj.type === "function" || obj.type === "line"
    );
    if (functions.length === 0) {
      this.hideTraceTooltip();
      return;
    }
    const selected = this.state.objects.find(
      (obj) => obj.id === this.state.selectedId && (obj.type === "function" || obj.type === "line")
    );
    const target = selected || functions[0];
    const graphPoint = this.screenToGraph(evt);
    let yValue = null;
    if (target.type === "line") {
      const { metadata } = target;
      if (metadata.verticalX !== null && metadata.verticalX !== void 0) {
        yValue = null;
      } else {
        yValue = metadata.slope * graphPoint.x + metadata.intercept;
      }
    } else {
      yValue = evaluateFunctionAt(
        {
          subtype: target.metadata.subtype,
          coefficients: target.metadata.coefficients
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
    this.traceTooltip.classList.add("visible");
  }
  render() {
    const theme = THEME_TOKENS[this.state.theme];
    this.root.style.setProperty("--graph-canvas-background", theme.background);
    this.traceTooltip.style.background = this.state.theme === "dark" ? "rgba(15, 23, 42, 0.92)" : "rgba(255, 255, 255, 0.95)";
    this.traceTooltip.style.color = this.state.theme === "dark" ? "#f8fafc" : "#0f172a";
    this.traceTooltip.style.boxShadow = this.state.theme === "dark" ? "0 12px 24px rgba(14, 165, 233, 0.25)" : "0 12px 24px rgba(15, 23, 42, 0.18)";
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
      const line = document.createElementNS(SVG_NS, "line");
      line.setAttribute("x1", `${x}`);
      line.setAttribute("x2", `${x}`);
      line.setAttribute("y1", `${minY}`);
      line.setAttribute("y2", `${maxY}`);
      line.setAttribute("stroke", theme.grid);
      line.setAttribute("class", "graph-grid-line");
      this.gridLayer.appendChild(line);
    }
    for (let y = startY; y <= maxY; y += step) {
      const line = document.createElementNS(SVG_NS, "line");
      line.setAttribute("x1", `${minX}`);
      line.setAttribute("x2", `${maxX}`);
      line.setAttribute("y1", `${y}`);
      line.setAttribute("y2", `${y}`);
      line.setAttribute("stroke", theme.grid);
      line.setAttribute("class", "graph-grid-line");
      this.gridLayer.appendChild(line);
    }
  }
  renderAxes(theme) {
    this.axesLayer.replaceChildren();
    const axisX = document.createElementNS(SVG_NS, "line");
    axisX.setAttribute("x1", `${this.viewBox.x}`);
    axisX.setAttribute("x2", `${this.viewBox.x + this.viewBox.width}`);
    const zeroY = this.graphToSvg({ x: 0, y: 0 }).y;
    axisX.setAttribute("y1", `${zeroY}`);
    axisX.setAttribute("y2", `${zeroY}`);
    axisX.setAttribute("stroke", theme.axis);
    axisX.setAttribute("class", "graph-axis-line");
    this.axesLayer.appendChild(axisX);
    const axisY = document.createElementNS(SVG_NS, "line");
    axisY.setAttribute("y1", `${this.viewBox.y}`);
    axisY.setAttribute("y2", `${this.viewBox.y + this.viewBox.height}`);
    const zeroX = this.graphToSvg({ x: 0, y: 0 }).x;
    axisY.setAttribute("x1", `${zeroX}`);
    axisY.setAttribute("x2", `${zeroX}`);
    axisY.setAttribute("stroke", theme.axis);
    axisY.setAttribute("class", "graph-axis-line");
    this.axesLayer.appendChild(axisY);
    const bounds = this.getGraphBounds();
    const { minX, maxX, minY, maxY } = bounds;
    const xStep = determineTickStep(maxX - minX);
    const yStep = determineTickStep(maxY - minY);
    const labelGroup = document.createElementNS(SVG_NS, "g");
    for (let x = Math.floor(minX / xStep) * xStep; x <= maxX; x += xStep) {
      const position = this.graphToSvg({ x, y: 0 });
      const label = document.createElementNS(SVG_NS, "text");
      label.textContent = formatNumber(x, 2);
      label.setAttribute("x", `${position.x + 0.1}`);
      label.setAttribute("y", `${position.y - 0.35}`);
      label.setAttribute("fill", theme.axisLabel);
      label.setAttribute("class", "graph-axis-label");
      labelGroup.appendChild(label);
      const tick = document.createElementNS(SVG_NS, "line");
      tick.setAttribute("x1", `${position.x}`);
      tick.setAttribute("x2", `${position.x}`);
      tick.setAttribute("y1", `${position.y - 0.25}`);
      tick.setAttribute("y2", `${position.y + 0.25}`);
      tick.setAttribute("stroke", theme.axis);
      tick.setAttribute("stroke-width", "0.04");
      this.axesLayer.appendChild(tick);
    }
    for (let y = Math.floor(minY / yStep) * yStep; y <= maxY; y += yStep) {
      if (Math.abs(y) < 1e-9) continue;
      const position = this.graphToSvg({ x: 0, y });
      const label = document.createElementNS(SVG_NS, "text");
      label.textContent = formatNumber(y, 2);
      label.setAttribute("x", `${position.x + 0.3}`);
      label.setAttribute("y", `${position.y + 0.4}`);
      label.setAttribute("fill", theme.axisLabel);
      label.setAttribute("class", "graph-axis-label");
      labelGroup.appendChild(label);
      const tick = document.createElementNS(SVG_NS, "line");
      tick.setAttribute("x1", `${position.x - 0.25}`);
      tick.setAttribute("x2", `${position.x + 0.25}`);
      tick.setAttribute("y1", `${position.y}`);
      tick.setAttribute("y2", `${position.y}`);
      tick.setAttribute("stroke", theme.axis);
      tick.setAttribute("stroke-width", "0.04");
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
        element.addEventListener("click", (evt) => {
          evt.stopPropagation();
          setSelected(object.id);
        });
        this.objectsLayer.appendChild(element);
      }
    });
  }
  renderObject(object, theme) {
    switch (object.type) {
      case "point":
        return this.renderPoint(object, theme);
      case "line":
        return this.renderLine(object, theme);
      case "inequality":
        return this.renderInequality(object, theme);
      case "function":
        return this.renderFunction(object, theme);
      default:
        return null;
    }
  }
  renderPoint(object, theme) {
    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute(
      "class",
      `graph-object ${object.id === this.state.selectedId ? "selected" : ""}`.trim()
    );
    group.setAttribute("role", "img");
    group.setAttribute("aria-label", object.ariaLabel);
    const svgPoint = this.graphToSvg({
      x: object.metadata.x,
      y: object.metadata.y
    });
    const circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttribute("cx", `${svgPoint.x}`);
    circle.setAttribute("cy", `${svgPoint.y}`);
    circle.setAttribute("r", `${this.viewBox.width * 0.01}`);
    circle.setAttribute("fill", theme.objectFill);
    circle.setAttribute("stroke", theme.objectStroke);
    circle.setAttribute("stroke-width", "0.05");
    circle.setAttribute("aria-label", object.ariaLabel);
    group.appendChild(circle);
    return group;
  }
  renderLine(object, theme) {
    const coeffs = object.metadata;
    const points = generateLinePoints(coeffs, this.getGraphBounds());
    if (points.length < 2) return null;
    const svgA = this.graphToSvg(points[0]);
    const svgB = this.graphToSvg(points[1]);
    const line = document.createElementNS(SVG_NS, "line");
    line.setAttribute("x1", `${svgA.x}`);
    line.setAttribute("x2", `${svgB.x}`);
    line.setAttribute("y1", `${svgA.y}`);
    line.setAttribute("y2", `${svgB.y}`);
    line.setAttribute("stroke", theme.objectStroke);
    line.setAttribute("stroke-width", "0.06");
    line.setAttribute(
      "class",
      `graph-object ${object.id === this.state.selectedId ? "selected" : ""}`.trim()
    );
    line.setAttribute("role", "img");
    line.setAttribute("aria-label", object.ariaLabel);
    return line;
  }
  renderFunction(object, theme) {
    const range = [this.viewBox.x, this.viewBox.x + this.viewBox.width];
    const points = sampleFunction(
      {
        subtype: object.metadata.subtype,
        coefficients: object.metadata.coefficients
      },
      range,
      260
    );
    if (points.length < 2) return null;
    const polyline = document.createElementNS(SVG_NS, "polyline");
    const svgPoints = points.filter((pt) => Number.isFinite(pt.y)).map((pt) => {
      const svgPt = this.graphToSvg(pt);
      return `${svgPt.x},${svgPt.y}`;
    }).join(" ");
    polyline.setAttribute("points", svgPoints);
    polyline.setAttribute("fill", "none");
    polyline.setAttribute("stroke", theme.objectStroke);
    polyline.setAttribute("stroke-width", "0.06");
    polyline.setAttribute(
      "class",
      `graph-object ${object.id === this.state.selectedId ? "selected" : ""}`.trim()
    );
    polyline.setAttribute("role", "img");
    polyline.setAttribute("aria-label", object.ariaLabel);
    return polyline;
  }
  renderInequality(object, theme) {
    const coeffs = object.metadata;
    const boundary = this.renderLine({ ...object, type: "line" }, theme);
    if (!boundary) return null;
    if (!coeffs.inclusive) {
      boundary.setAttribute("stroke-dasharray", "0.4,0.2");
    }
    const polygon = this.buildInequalityPolygon(coeffs);
    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute(
      "class",
      `graph-object ${object.id === this.state.selectedId ? "selected" : ""}`.trim()
    );
    group.setAttribute("role", "img");
    group.setAttribute("aria-label", object.ariaLabel);
    boundary.setAttribute("aria-label", object.ariaLabel);
    if (polygon.length >= 3) {
      const poly = document.createElementNS(SVG_NS, "polygon");
      poly.setAttribute(
        "points",
        polygon.map((pt) => {
          const svgPt = this.graphToSvg(pt);
          return `${svgPt.x},${svgPt.y}`;
        }).join(" ")
      );
      poly.setAttribute("fill", theme.shadeFill);
      poly.setAttribute("class", "graph-inequality-fill");
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
      { x: minX, y: maxY }
    ];
    const satisfies = (x, y) => {
      if (coeffs.verticalX !== null && coeffs.verticalX !== void 0) {
        return side === "above" ? x >= coeffs.verticalX : x <= coeffs.verticalX;
      }
      const compareValue = coeffs.slope * x + coeffs.intercept;
      return side === "above" ? y >= compareValue : y <= compareValue;
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
      if (!points.some(
        (existing) => Math.abs(existing.x - pt.x) < 1e-6 && Math.abs(existing.y - pt.y) < 1e-6
      )) {
        points.push(pt);
      }
    });
    if (points.length < 3) return [];
    const centroid = points.reduce(
      (acc, pt) => ({
        x: acc.x + pt.x / points.length,
        y: acc.y + pt.y / points.length
      }),
      { x: 0, y: 0 }
    );
    points.sort(
      (a, b) => Math.atan2(a.y - centroid.y, a.x - centroid.x) - Math.atan2(b.y - centroid.y, b.x - centroid.x)
    );
    return points;
  }
  computeBoundaryIntersections(coeffs, bounds) {
    const { minX, maxX, minY, maxY } = bounds;
    const points = [];
    if (coeffs.verticalX !== null && coeffs.verticalX !== void 0) {
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
function mount(el, payload = {}) {
  try {
    const spec = payload.spec || payload.graphSpec || null;
    const wrapper = document.createElement("div");
    wrapper.style.cssText = "display: grid; gap: 16px; width: 100%; height: 100%;";
    el.appendChild(wrapper);
    const toolbarContainer = document.createElement("div");
    wrapper.appendChild(toolbarContainer);
    const canvasContainer = document.createElement("div");
    canvasContainer.style.cssText = "flex: 1; min-height: 400px;";
    wrapper.appendChild(canvasContainer);
    const toolbar = new GraphToolbar(toolbarContainer);
    const canvas = new GraphCanvas(canvasContainer, { spec });
    el.__graphToolbar = toolbar;
    el.__graphCanvas = canvas;
    el.__graphWrapper = wrapper;
    return { toolbar, canvas };
  } catch (e) {
    console.warn("[GraphCanvas] mount failed:", (e == null ? void 0 : e.message) || e);
    throw e;
  }
}
function unmount(el) {
  try {
    if (el && el.__graphToolbar && typeof el.__graphToolbar.destroy === "function") {
      el.__graphToolbar.destroy();
    }
    if (el && el.__graphCanvas && typeof el.__graphCanvas.destroy === "function") {
      el.__graphCanvas.destroy();
    }
    if (el && el.__graphWrapper) {
      el.__graphWrapper.remove();
    }
  } catch {
  }
  if (el) {
    delete el.__graphToolbar;
    delete el.__graphCanvas;
    delete el.__graphWrapper;
  }
}
export {
  GraphCanvas as default,
  mount,
  unmount
};
//# sourceMappingURL=GraphCanvas-DaYgmv8X.js.map
