import {
  getState,
  setAIHelpEnabled,
  subscribe,
} from './geometryStore.js';
import {
  assignLabels,
  computeShapeMetrics,
  formatNumber,
} from './geometryMath.js';

const ensureStyles = () => {
  if (document.getElementById('geometry-inspector-styles')) return;
  const style = document.createElement('style');
  style.id = 'geometry-inspector-styles';
  style.textContent = `
    .geometry-inspector {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 18px;
      border-radius: 14px;
      background: linear-gradient(160deg, rgba(248, 250, 252, 0.92), rgba(226, 232, 240, 0.65));
      color: #0f172a;
      min-width: 260px;
      max-width: 320px;
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
    }
    .geometry-inspector.dark {
      background: linear-gradient(160deg, rgba(15, 23, 42, 0.92), rgba(30, 41, 59, 0.72));
      color: #e2e8f0;
      box-shadow: 0 24px 48px rgba(15, 118, 110, 0.18);
    }
    .geometry-inspector h2 {
      margin: 0;
      font-size: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .geometry-inspector .metric-card {
      background: rgba(255, 255, 255, 0.85);
      border-radius: 12px;
      padding: 12px 14px;
      box-shadow: inset 0 1px 0 rgba(148, 163, 184, 0.25);
    }
    .geometry-inspector.dark .metric-card {
      background: rgba(15, 23, 42, 0.85);
      box-shadow: inset 0 1px 0 rgba(14, 165, 233, 0.25);
    }
    .geometry-inspector ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 6px;
    }
    .geometry-inspector li {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }
    .geometry-inspector .ai-toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 10px 12px;
      border-radius: 10px;
      background: rgba(14, 165, 233, 0.12);
      color: inherit;
    }
    .geometry-inspector button.toggle {
      appearance: none;
      border: none;
      border-radius: 999px;
      padding: 6px 16px;
      font-weight: 600;
      cursor: pointer;
      background: linear-gradient(120deg, #0ea5e9, #06b6d4);
      color: #0f172a;
      box-shadow: 0 6px 16px rgba(6, 182, 212, 0.3);
    }
    .geometry-inspector button.toggle.off {
      background: rgba(148, 163, 184, 0.25);
      box-shadow: none;
      color: inherit;
    }
    .geometry-inspector .formula {
      font-family: 'Fira Code', 'SFMono-Regular', monospace;
      font-size: 13px;
      padding: 6px 8px;
      background: rgba(148, 163, 184, 0.15);
      border-radius: 8px;
      display: inline-block;
    }
    .geometry-inspector.dark .formula {
      background: rgba(14, 116, 144, 0.35);
    }
    .geometry-inspector .disclaimer {
      font-size: 12px;
      opacity: 0.8;
    }
  `;
  document.head.appendChild(style);
};

const formulaForShape = shape => {
  if (!shape) return '—';
  switch (shape.shape) {
    case 'triangle':
      return 'Area = ½ · base · height';
    case 'polygon':
      return 'Area = Shoelace method';
    case 'circle':
      return 'Area = πr², Circumference = 2πr';
    case 'segment':
      return 'Length = √[(x₂ − x₁)² + (y₂ − y₁)²]';
    case 'point':
      return 'Coordinates (x, y)';
    default:
      return 'Measurements shown below';
  }
};

const buildMetricList = (shape, metrics) => {
  if (!shape || !metrics) return [];
  switch (shape.shape) {
    case 'point': {
      const [pt] = shape.params.points;
      return [[`Point ${pt.label}`, `(${formatNumber(pt.x)}, ${formatNumber(pt.y)})`]];
    }
    case 'segment': {
      const [a, b] = assignLabels(shape.params.points);
      return [[`Length ${a.label}${b.label}`, `${formatNumber(metrics.length)} units`]];
    }
    case 'triangle': {
      const rows = [];
      Object.entries(metrics.sides || {}).forEach(([label, value]) => {
        rows.push([`Side ${label}`, `${formatNumber(value)} units`]);
      });
      Object.entries(metrics.angles || {}).forEach(([label, value]) => {
        rows.push([`${label}`, `${formatNumber(value)}°`]);
      });
      rows.push(['Perimeter', `${formatNumber(metrics.perimeter)} units`]);
      rows.push(['Area', `${formatNumber(metrics.area)} sq units`]);
      return rows;
    }
    case 'polygon': {
      const rows = [];
      Object.entries(metrics.sides || {}).forEach(([label, value]) => {
        rows.push([`Side ${label}`, `${formatNumber(value)} units`]);
      });
      rows.push(['Perimeter', `${formatNumber(metrics.perimeter)} units`]);
      rows.push(['Area', `${formatNumber(metrics.area)} sq units`]);
      return rows;
    }
    case 'circle': {
      return [
        ['Center', `(${formatNumber(metrics.center?.x ?? shape.params.center.x)}, ${formatNumber(metrics.center?.y ?? shape.params.center.y)})`],
        ['Radius', `${formatNumber(metrics.radius)} units`],
        ['Diameter', `${formatNumber(metrics.diameter)} units`],
        ['Circumference', `${formatNumber(metrics.circumference)} units`],
        ['Area', `${formatNumber(metrics.area)} sq units`],
      ];
    }
    default:
      return [];
  }
};

const AI_SNIPPETS = {
  triangle: [
    'To find the area of a triangle, identify a base and its corresponding height.',
    'Apply the formula A = ½ × base × height.',
    'Substitute known values and simplify.',
  ],
  circle: [
    'Radius is the distance from the center to any point on the circle.',
    'Use C = 2πr for circumference and A = πr² for area.',
    'Keep π as 3.14 or a fraction unless instructed otherwise.',
  ],
  polygon: [
    'Label vertices in order to keep track of side lengths.',
    'Use the shoelace method for general polygons to compute area.',
    'Add the lengths of each side to find the perimeter.',
  ],
  segment: [
    'Use the distance formula between the two endpoints.',
    'Substitute the coordinates carefully before simplifying.',
  ],
  default: [
    'Break the problem into known formulas.',
    'Substitute measured values carefully.',
    'Check units before finalizing your answer.',
  ],
};

class InspectorPanel {
  constructor(container) {
    if (!container) throw new Error('InspectorPanel requires a mount container');
    ensureStyles();
    this.container = container;
    this.state = getState();
    this.root = document.createElement('aside');
    this.root.className = 'geometry-inspector';
    container.appendChild(this.root);
    this.render();
    this.unsubscribe = subscribe(snapshot => {
      this.state = snapshot;
      this.render();
    });
  }

  destroy() {
    this.unsubscribe?.();
    this.root.remove();
  }

  render() {
    this.root.classList.toggle('dark', this.state.theme === 'dark');
    const selectedShape = this.state.shapes.find(shape => shape.id === this.state.selectedId) || null;
    const metrics = computeShapeMetrics(selectedShape);

    this.root.replaceChildren(this.renderHeader(selectedShape), this.renderMetrics(selectedShape, metrics), this.renderMeasurement(), this.renderAIToggle(selectedShape), this.renderFormula(selectedShape), this.renderDisclaimer());
  }

  renderHeader(shape) {
    const header = document.createElement('h2');
    const title = document.createElement('span');
    title.textContent = shape?.label || 'No shape selected';
    header.appendChild(title);
    return header;
  }

  renderMetrics(shape, metrics) {
    const card = document.createElement('div');
    card.className = 'metric-card';
    const list = document.createElement('ul');
    const rows = buildMetricList(shape, metrics);
    if (rows.length === 0) {
      const empty = document.createElement('p');
      empty.textContent = 'Select a shape to see measurements.';
      card.appendChild(empty);
    } else {
      rows.forEach(([label, value]) => {
        const item = document.createElement('li');
        const labelSpan = document.createElement('span');
        labelSpan.textContent = label;
        const valueSpan = document.createElement('span');
        valueSpan.textContent = value;
        item.appendChild(labelSpan);
        item.appendChild(valueSpan);
        list.appendChild(item);
      });
      card.appendChild(list);
    }
    return card;
  }

  renderMeasurement() {
    const measurement = this.state.measurement;
    if (!measurement) return document.createDocumentFragment();
    const card = document.createElement('div');
    card.className = 'metric-card';
    const title = document.createElement('strong');
    title.textContent = measurement.type === 'angle' ? 'Measured Angle' : 'Measured Distance';
    const paragraph = document.createElement('p');
    paragraph.textContent = measurement.label;
    card.appendChild(title);
    card.appendChild(paragraph);
    return card;
  }

  renderAIToggle(shape) {
    const wrapper = document.createElement('div');
    wrapper.className = 'ai-toggle';

    const label = document.createElement('div');
    label.innerHTML = `<strong>AI Steps</strong><br /><small>${this.state.aiHelpEnabled ? 'Showing guided reasoning' : 'Numeric details only'}</small>`;
    wrapper.appendChild(label);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = `toggle ${this.state.aiHelpEnabled ? '' : 'off'}`;
    button.textContent = this.state.aiHelpEnabled ? 'On' : 'Off';
    button.addEventListener('click', () => setAIHelpEnabled(!this.state.aiHelpEnabled));
    wrapper.appendChild(button);

    if (this.state.aiHelpEnabled) {
      const reasoning = document.createElement('ul');
      reasoning.style.marginTop = '8px';
      const snippetKey = shape?.shape && AI_SNIPPETS[shape.shape] ? shape.shape : 'default';
      (AI_SNIPPETS[snippetKey] || AI_SNIPPETS.default).forEach(text => {
        const item = document.createElement('li');
        item.textContent = text;
        reasoning.appendChild(item);
      });
      wrapper.appendChild(reasoning);
    }

    return wrapper;
  }

  renderFormula(shape) {
    const container = document.createElement('div');
    const heading = document.createElement('strong');
    heading.textContent = 'Formula Highlight';
    const formula = document.createElement('div');
    formula.className = 'formula';
    formula.textContent = formulaForShape(shape);
    container.appendChild(heading);
    container.appendChild(formula);
    return container;
  }

  renderDisclaimer() {
    if (!this.state.aiHelpEnabled) {
      const spacer = document.createElement('div');
      spacer.className = 'disclaimer';
      spacer.textContent = '';
      return spacer;
    }
    const disclaimer = document.createElement('div');
    disclaimer.className = 'disclaimer';
    disclaimer.textContent = 'AI-style reasoning preview. Double-check your work.';
    return disclaimer;
  }
}

export default InspectorPanel;
