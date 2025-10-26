import {
  getState,
  setAIHelpEnabled,
  subscribe,
} from './graphStore.js';
import { formatNumber } from './graphMath.js';

const ensureStyles = () => {
  if (document.getElementById('graph-inspector-styles')) return;
  const style = document.createElement('style');
  style.id = 'graph-inspector-styles';
  style.textContent = `
    .graph-inspector {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 20px;
      min-width: 260px;
      max-width: 320px;
      border-radius: 18px;
      background: rgba(248, 250, 252, 0.95);
      box-shadow: 0 24px 48px rgba(15, 23, 42, 0.2);
      color: #0f172a;
    }
    .graph-inspector.dark {
      background: rgba(15, 23, 42, 0.85);
      color: #e2e8f0;
      box-shadow: 0 28px 54px rgba(8, 145, 178, 0.25);
    }
    .graph-inspector h2 {
      margin: 0;
      font-size: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .graph-inspector .metric-card {
      background: rgba(255, 255, 255, 0.9);
      border-radius: 14px;
      padding: 14px;
      box-shadow: inset 0 1px 0 rgba(148, 163, 184, 0.2);
    }
    .graph-inspector.dark .metric-card {
      background: rgba(15, 23, 42, 0.92);
      box-shadow: inset 0 1px 0 rgba(56, 189, 248, 0.24);
    }
    .graph-inspector dl {
      margin: 0;
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 8px 12px;
      font-size: 14px;
    }
    .graph-inspector dt {
      font-weight: 600;
    }
    .graph-inspector .ai-toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 12px;
      background: rgba(56, 189, 248, 0.12);
    }
    .graph-inspector button.toggle {
      appearance: none;
      border: none;
      border-radius: 999px;
      padding: 8px 16px;
      font-weight: 600;
      cursor: pointer;
      background: linear-gradient(120deg, #0ea5e9, #38bdf8);
      color: #0b1120;
      box-shadow: 0 8px 18px rgba(14, 165, 233, 0.3);
    }
    .graph-inspector button.toggle.off {
      background: rgba(148, 163, 184, 0.2);
      color: inherit;
      box-shadow: none;
    }
    .graph-inspector .formula {
      font-family: 'Fira Code', 'SFMono-Regular', monospace;
      font-size: 13px;
      padding: 6px 10px;
      border-radius: 10px;
      background: rgba(148, 163, 184, 0.18);
      display: inline-block;
    }
    .graph-inspector.dark .formula {
      background: rgba(14, 116, 144, 0.35);
    }
    .graph-inspector .disclaimer {
      font-size: 12px;
      opacity: 0.75;
    }
  `;
  document.head.appendChild(style);
};

const describeLineEquation = (slope, intercept) => {
  if (!Number.isFinite(slope)) return 'x = —';
  if (Math.abs(slope) < 1e-9) {
    return `y = ${formatNumber(intercept)}`;
  }
  const slopeText = formatNumber(slope);
  let interceptText = '';
  if (intercept > 0) {
    interceptText = ` + ${formatNumber(intercept)}`;
  } else if (intercept < 0) {
    interceptText = ` - ${formatNumber(Math.abs(intercept))}`;
  }
  return `y = ${slopeText}x${interceptText}`;
};

const buildDetails = object => {
  if (!object) return [];
  switch (object.type) {
    case 'point':
      return [
        ['Coordinates', `(${formatNumber(object.metadata.x)}, ${formatNumber(object.metadata.y)})`],
      ];
    case 'line': {
      const rows = [];
      if (object.metadata.verticalX !== null && object.metadata.verticalX !== undefined) {
        rows.push(['Equation', `x = ${formatNumber(object.metadata.verticalX)}`]);
      } else {
        rows.push(['Equation', describeLineEquation(object.metadata.slope, object.metadata.intercept)]);
        rows.push(['Slope (m)', formatNumber(object.metadata.slope)]);
        rows.push(['Y-intercept (b)', formatNumber(object.metadata.intercept)]);
        if (object.metadata.xIntercept !== null) {
          rows.push(['X-intercept', formatNumber(object.metadata.xIntercept)]);
        }
      }
      if (object.metadata.through) {
        rows.push([
          'Through points',
          object.metadata.through
            .map(pt => `(${formatNumber(pt.x)}, ${formatNumber(pt.y)})`)
            .join(' and '),
        ]);
      }
      return rows;
    }
    case 'inequality': {
      const rows = [];
      if (object.metadata.verticalX !== null && object.metadata.verticalX !== undefined) {
        rows.push(['Boundary', `x = ${formatNumber(object.metadata.verticalX)}`]);
      } else {
        rows.push(['Boundary', describeLineEquation(object.metadata.slope, object.metadata.intercept)]);
        rows.push(['Slope (m)', formatNumber(object.metadata.slope)]);
        rows.push(['Y-intercept (b)', formatNumber(object.metadata.intercept)]);
        if (object.metadata.xIntercept !== null) {
          rows.push(['X-intercept', formatNumber(object.metadata.xIntercept)]);
        }
      }
      rows.push(['Shading', object.metadata.side === 'above' ? 'Above the line' : 'Below the line']);
      rows.push(['Boundary style', object.metadata.inclusive ? 'Solid (≥ or ≤)' : 'Dashed (> or <)']);
      return rows;
    }
    case 'function': {
      const rows = [];
      rows.push(['Expression', object.metadata.expression]);
      if (object.metadata.subtype === 'linear') {
        rows.push(['Trend', object.metadata.direction === 'increasing' ? 'Increasing' : 'Decreasing']);
      }
      if (object.metadata.vertex) {
        rows.push(['Vertex', `(${formatNumber(object.metadata.vertex.x)}, ${formatNumber(object.metadata.vertex.y)})`]);
        rows.push(['Axis of symmetry', `x = ${formatNumber(object.metadata.vertex.x)}`]);
      }
      if (object.metadata.subtype === 'quadratic' || object.metadata.subtype === 'absolute') {
        rows.push(['Opens', object.metadata.direction === 'opens up' ? 'Upward' : 'Downward']);
        rows.push([
          'Extrema',
          object.metadata.direction === 'opens up'
            ? `Minimum at y = ${formatNumber(object.metadata.vertex?.y)}`
            : `Maximum at y = ${formatNumber(object.metadata.vertex?.y)}`,
        ]);
      }
      return rows;
    }
    default:
      return [];
  }
};

const AI_SNIPPETS = {
  point: ['Points are written as (x, y). Use them to locate positions on the plane.'],
  line: [
    'Slope m tells you how much y changes for each 1-step increase in x.',
    'The y-intercept b is where the line meets the y-axis.',
  ],
  inequality: [
    'Use the boundary line to separate the plane.',
    'Shading above means y-values larger than the line; below means smaller.',
  ],
  function: [
    'Follow how the y-value changes as x increases to understand the trend.',
    'Vertices highlight turning points for quadratics or absolute value graphs.',
  ],
};

class GraphInspectorPanel {
  constructor(container) {
    if (!container) throw new Error('GraphInspectorPanel requires a mount container');
    ensureStyles();
    this.container = container;
    this.state = getState();

    this.root = document.createElement('section');
    this.root.className = 'graph-inspector';
    this.container.appendChild(this.root);

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
    const selected = this.state.objects.find(obj => obj.id === this.state.selectedId) || null;
    this.root.replaceChildren(this.renderHeader(selected), this.renderDetails(selected), this.renderAiSection(selected));
  }

  renderHeader(selected) {
    const header = document.createElement('h2');
    const title = document.createElement('span');
    title.textContent = selected ? selected.type.toUpperCase() : 'No selection';
    header.appendChild(title);

    const toggleButton = document.createElement('button');
    toggleButton.type = 'button';
    toggleButton.className = `toggle ${this.state.aiHelpEnabled ? '' : 'off'}`.trim();
    toggleButton.textContent = this.state.aiHelpEnabled ? 'AI Steps ON' : 'AI Steps OFF';
    toggleButton.addEventListener('click', () => setAIHelpEnabled(!this.state.aiHelpEnabled));

    header.appendChild(toggleButton);
    header.classList.add('ai-toggle');
    return header;
  }

  renderDetails(selected) {
    const card = document.createElement('div');
    card.className = 'metric-card';
    if (!selected) {
      const empty = document.createElement('p');
      empty.textContent = 'Select an object on the graph to inspect its measurements.';
      card.appendChild(empty);
      return card;
    }

    const list = document.createElement('dl');
    buildDetails(selected).forEach(([label, value]) => {
      const dt = document.createElement('dt');
      dt.textContent = label;
      const dd = document.createElement('dd');
      dd.textContent = value;
      list.appendChild(dt);
      list.appendChild(dd);
    });
    card.appendChild(list);

    return card;
  }

  renderAiSection(selected) {
    const card = document.createElement('div');
    card.className = 'metric-card';
    if (!this.state.aiHelpEnabled) {
      const message = document.createElement('p');
      message.textContent = 'AI Help is off. Enable it to preview reasoning tips.';
      card.appendChild(message);
      return card;
    }

    if (!selected) {
      const message = document.createElement('p');
      message.textContent = 'Select a graph object to view interpretation hints.';
      card.appendChild(message);
      const disclaimer = document.createElement('div');
      disclaimer.className = 'disclaimer';
      disclaimer.textContent = 'AI-style reasoning preview. Double-check your work.';
      card.appendChild(disclaimer);
      return card;
    }

    const heading = document.createElement('div');
    heading.textContent = 'Interpretation';
    heading.style.fontWeight = '600';
    card.appendChild(heading);

    const hints = AI_SNIPPETS[selected.type] || AI_SNIPPETS.function;
    const list = document.createElement('ul');
    list.style.margin = '0';
    list.style.paddingLeft = '20px';
    list.style.display = 'grid';
    list.style.gap = '6px';
    hints.forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      list.appendChild(li);
    });
    card.appendChild(list);

    const disclaimer = document.createElement('div');
    disclaimer.className = 'disclaimer';
    disclaimer.textContent = 'AI-style reasoning preview. Double-check your work.';
    card.appendChild(disclaimer);

    return card;
  }
}

export default GraphInspectorPanel;
