import {
  getState,
  setOverlayVisibility,
  setTheme,
  setTool,
  subscribe,
} from './geometryStore.js';

const TOOL_BUTTONS = [
  { id: 'select', label: 'Select / Move', icon: '🖱️' },
  { id: 'point', label: 'Point / Vertex', icon: '•' },
  { id: 'segment', label: 'Segment / Line', icon: '〰️' },
  { id: 'triangle', label: 'Triangle', icon: '△' },
  { id: 'circle', label: 'Circle', icon: '◯' },
  { id: 'polygon', label: 'Polygon', icon: '⬠' },
  { id: 'measure', label: 'Measure', icon: '📏' },
];

const OVERLAY_CONTROLS = [
  { id: 'ruler', label: 'Ruler', icon: '📐' },
  { id: 'protractor', label: 'Protractor', icon: '⦜' },
  { id: 'compass', label: 'Compass', icon: '🧭' },
];

const ensureStyles = () => {
  if (document.getElementById('geometry-toolbar-styles')) return;
  const style = document.createElement('style');
  style.id = 'geometry-toolbar-styles';
  style.textContent = `
    .geometry-toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 12px;
      background: var(--geometry-toolbar-bg, #ffffff);
      border-radius: 12px;
      box-shadow: 0 8px 16px rgba(15, 23, 42, 0.08);
    }
    .geometry-toolbar.dark {
      background: var(--geometry-toolbar-bg-dark, rgba(15, 23, 42, 0.8));
      color: #e2e8f0;
    }
    .geometry-toolbar button {
      appearance: none;
      border: 1px solid rgba(148, 163, 184, 0.4);
      background: #ffffff;
      color: #0f172a;
      padding: 8px 12px;
      border-radius: 10px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: transform 150ms ease, box-shadow 150ms ease, background 150ms ease;
    }
    .geometry-toolbar.dark button {
      background: rgba(15, 23, 42, 0.85);
      color: #f8fafc;
      border-color: rgba(148, 163, 184, 0.5);
    }
    .geometry-toolbar button.active {
      background: linear-gradient(120deg, #0ea5e9, #22d3ee);
      color: #0b1120;
      border-color: transparent;
      box-shadow: 0 6px 14px rgba(14, 165, 233, 0.3);
    }
    .geometry-toolbar button:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 10px rgba(15, 23, 42, 0.15);
    }
    .geometry-toolbar.dark button:hover {
      box-shadow: 0 6px 14px rgba(14, 165, 233, 0.25);
    }
    .geometry-toolbar .toolbar-section {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: center;
    }
    .geometry-toolbar .toolbar-divider {
      flex-basis: 100%;
      height: 1px;
      background: rgba(148, 163, 184, 0.25);
      margin: 6px 0;
    }
    .geometry-theme-toggle {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      color: inherit;
    }
    .geometry-theme-toggle select {
      padding: 6px 10px;
      border-radius: 8px;
      border: 1px solid rgba(148, 163, 184, 0.5);
      background: #ffffff;
      color: inherit;
      font-weight: 600;
      cursor: pointer;
    }
    .geometry-toolbar.dark .geometry-theme-toggle select {
      background: rgba(15, 23, 42, 0.85);
    }
  `;
  document.head.appendChild(style);
};

class ShapeLibrary {
  constructor(container) {
    if (!container) throw new Error('ShapeLibrary requires a mount container');
    ensureStyles();
    this.container = container;
    this.state = getState();
    this.root = document.createElement('div');
    this.root.className = 'geometry-toolbar';
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
    this.root.replaceChildren(this.renderToolsSection(), this.renderOverlaySection(), this.renderThemeSection());
  }

  renderToolsSection() {
    const section = document.createElement('div');
    section.className = 'toolbar-section';
    TOOL_BUTTONS.forEach(tool => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = `${tool.icon} ${tool.label}`;
      button.classList.toggle('active', this.state.tool === tool.id);
      button.addEventListener('click', () => setTool(tool.id));
      section.appendChild(button);
    });
    return section;
  }

  renderOverlaySection() {
    const wrapper = document.createElement('div');
    wrapper.className = 'toolbar-section';
    OVERLAY_CONTROLS.forEach(control => {
      const button = document.createElement('button');
      button.type = 'button';
      const overlayState = this.state.overlays?.[control.id];
      const active = overlayState?.visible;
      button.textContent = `${control.icon} ${control.label}`;
      button.classList.toggle('active', active);
      button.addEventListener('click', () => {
        setOverlayVisibility(control.id, !active);
      });
      wrapper.appendChild(button);
    });
    return wrapper;
  }

  renderThemeSection() {
    const wrapper = document.createElement('div');
    wrapper.className = 'toolbar-section geometry-theme-toggle';

    const label = document.createElement('span');
    label.textContent = 'Theme';
    wrapper.appendChild(label);

    const select = document.createElement('select');
    const lightOption = document.createElement('option');
    lightOption.value = 'light';
    lightOption.textContent = 'Light';
    const darkOption = document.createElement('option');
    darkOption.value = 'dark';
    darkOption.textContent = 'Dark';
    select.appendChild(lightOption);
    select.appendChild(darkOption);
    select.value = this.state.theme;
    select.addEventListener('change', evt => setTheme(evt.target.value));
    wrapper.appendChild(select);

    return wrapper;
  }
}

export default ShapeLibrary;
