import {
  addObject,
  clearStudentObjects,
  getState,
  removeObject,
  setMode,
  setTheme,
  setViewport,
  subscribe,
  undoLastStudent,
} from './graphStore.js';

const ensureStyles = () => {
  if (document.getElementById('graph-toolbar-styles')) return;
  const style = document.createElement('style');
  style.id = 'graph-toolbar-styles';
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
    if (!container) throw new Error('GraphToolbar requires a mount container');
    ensureStyles();
    this.container = container;
    this.state = getState();
    this.root = document.createElement('div');
    this.root.className = 'graph-toolbar';
    this.container.appendChild(this.root);

    this.render();
    this.unsubscribe = subscribe((snapshot) => {
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
    this.root.replaceChildren(
      this.renderPrimaryRow(),
      this.renderFormsSection()
    );
  }

  renderPrimaryRow() {
    const row = document.createElement('div');
    row.className = 'toolbar-row';

    row.appendChild(this.createModeButton('pan', 'Move / Pan'));
    row.appendChild(this.createModeButton('add-point', 'Add Point'));
    row.appendChild(this.createModeButton('add-line', 'Draw Line'));
    row.appendChild(this.createModeButton('trace', 'Trace / Inspect'));

    const zoomIn = document.createElement('button');
    zoomIn.type = 'button';
    zoomIn.textContent = 'Zoom In';
    zoomIn.addEventListener('click', () => this.adjustZoom(0.9));
    row.appendChild(zoomIn);

    const zoomOut = document.createElement('button');
    zoomOut.type = 'button';
    zoomOut.textContent = 'Zoom Out';
    zoomOut.addEventListener('click', () => this.adjustZoom(1.1));
    row.appendChild(zoomOut);

    // Separator
    const sep = document.createElement('span');
    sep.style.cssText =
      'width: 1px; height: 24px; background: rgba(148,163,184,0.3); margin: 0 4px;';
    row.appendChild(sep);

    // Delete selected student object
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.textContent = '🗑 Delete';
    deleteBtn.title = 'Delete selected student object';
    const selectedObj = this.state.objects.find(
      (o) => o.id === this.state.selectedId
    );
    const canDelete = selectedObj && selectedObj.origin === 'student';
    deleteBtn.disabled = !canDelete;
    deleteBtn.style.opacity = canDelete ? '1' : '0.4';
    deleteBtn.addEventListener('click', () => {
      if (this.state.selectedId) removeObject(this.state.selectedId);
    });
    row.appendChild(deleteBtn);

    // Undo last student object
    const undoBtn = document.createElement('button');
    undoBtn.type = 'button';
    undoBtn.textContent = '↩ Undo';
    undoBtn.title = 'Remove last plotted object';
    const hasStudentObjs = this.state.objects.some(
      (o) => o.origin === 'student'
    );
    undoBtn.disabled = !hasStudentObjs;
    undoBtn.style.opacity = hasStudentObjs ? '1' : '0.4';
    undoBtn.addEventListener('click', () => undoLastStudent());
    row.appendChild(undoBtn);

    // Clear all student work
    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.textContent = '✕ Clear My Work';
    clearBtn.title = 'Remove all your plotted objects';
    clearBtn.disabled = !hasStudentObjs;
    clearBtn.style.opacity = hasStudentObjs ? '1' : '0.4';
    clearBtn.addEventListener('click', () => {
      if (confirm('Clear all your plotted points and lines?')) {
        clearStudentObjects();
      }
    });
    row.appendChild(clearBtn);

    const themeSelect = document.createElement('select');
    themeSelect.innerHTML =
      '<option value="light">Light</option><option value="dark">Dark</option>';
    themeSelect.value = this.state.theme;
    themeSelect.addEventListener('change', (evt) => setTheme(evt.target.value));
    row.appendChild(themeSelect);

    return row;
  }

  createModeButton(mode, label) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.classList.toggle('active', this.state.mode === mode);
    button.addEventListener('click', () => setMode(mode));
    return button;
  }

  adjustZoom(multiplier) {
    const state = getState();
    const view = state.viewport;
    const newWidth = view.width * multiplier;
    const newHeight = view.height * multiplier;
    const centerX = view.x + view.width / 2;
    const centerY = view.y + view.height / 2;
    setViewport({
      x: centerX - newWidth / 2,
      y: centerY - newHeight / 2,
      width: newWidth,
      height: newHeight,
    });
  }

  renderFormsSection() {
    const wrapper = document.createElement('div');
    wrapper.className = 'toolbar-forms';
    wrapper.appendChild(this.createPointForm());
    wrapper.appendChild(this.createSlopeForm());
    wrapper.appendChild(this.createTwoPointForm());
    wrapper.appendChild(this.createInequalityForm());
    wrapper.appendChild(this.createFunctionForm());
    return wrapper;
  }

  createPointForm() {
    const details = document.createElement('details');
    details.open = true;
    const summary = document.createElement('summary');
    summary.textContent = 'Plot a Point';
    details.appendChild(summary);

    const form = document.createElement('form');
    const xLabel = document.createElement('label');
    xLabel.textContent = 'x-coordinate';
    const xInput = document.createElement('input');
    xInput.type = 'number';
    xInput.step = '0.1';
    xInput.required = true;
    xLabel.appendChild(xInput);

    const yLabel = document.createElement('label');
    yLabel.textContent = 'y-coordinate';
    const yInput = document.createElement('input');
    yInput.type = 'number';
    yInput.step = '0.1';
    yInput.required = true;
    yLabel.appendChild(yInput);

    const actions = document.createElement('div');
    actions.className = 'form-actions';
    const addButton = document.createElement('button');
    addButton.type = 'submit';
    addButton.textContent = 'Add Point';
    actions.appendChild(addButton);

    form.appendChild(xLabel);
    form.appendChild(yLabel);
    form.appendChild(actions);

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      setMode('add-point');
      addObject({
        type: 'point',
        definition: {
          x: parseNumber(xInput.value),
          y: parseNumber(yInput.value),
        },
      });
      setMode('pan');
      form.reset();
    });

    details.appendChild(form);
    return details;
  }

  createSlopeForm() {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = 'Line: slope-intercept';
    details.appendChild(summary);

    const form = document.createElement('form');
    const slopeLabel = document.createElement('label');
    slopeLabel.textContent = 'Slope (m)';
    const slopeInput = document.createElement('input');
    slopeInput.type = 'number';
    slopeInput.step = '0.1';
    slopeInput.value = '1';
    slopeLabel.appendChild(slopeInput);

    const interceptLabel = document.createElement('label');
    interceptLabel.textContent = 'Y-intercept (b)';
    const interceptInput = document.createElement('input');
    interceptInput.type = 'number';
    interceptInput.step = '0.1';
    interceptInput.value = '0';
    interceptLabel.appendChild(interceptInput);

    const actions = document.createElement('div');
    actions.className = 'form-actions';
    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'Add Line';
    actions.appendChild(submit);

    form.appendChild(slopeLabel);
    form.appendChild(interceptLabel);
    form.appendChild(actions);

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      setMode('add-line');
      addObject({
        type: 'line',
        definition: {
          form: 'slope-intercept',
          slope: parseNumber(slopeInput.value),
          intercept: parseNumber(interceptInput.value),
        },
      });
      setMode('pan');
    });

    details.appendChild(form);
    return details;
  }

  createTwoPointForm() {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = 'Line: through two points';
    details.appendChild(summary);

    const form = document.createElement('form');
    const inputs = ['x₁', 'y₁', 'x₂', 'y₂'].map((label) => {
      const wrapper = document.createElement('label');
      wrapper.textContent = label;
      const input = document.createElement('input');
      input.type = 'number';
      input.step = '0.1';
      wrapper.appendChild(input);
      form.appendChild(wrapper);
      return input;
    });

    const actions = document.createElement('div');
    actions.className = 'form-actions';
    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'Add Line';
    actions.appendChild(submit);
    form.appendChild(actions);

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const [x1, y1, x2, y2] = inputs.map((input) => parseNumber(input.value));
      if (x1 === x2 && y1 === y2) return;
      setMode('add-line');
      addObject({
        type: 'line',
        definition: {
          form: 'two-points',
          points: [
            { x: x1, y: y1 },
            { x: x2, y: y2 },
          ],
        },
      });
      setMode('pan');
    });

    details.appendChild(form);
    return details;
  }

  createInequalityForm() {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = 'Linear inequality';
    details.appendChild(summary);

    const form = document.createElement('form');

    const comparisonLabel = document.createElement('label');
    comparisonLabel.textContent = 'Comparison';
    const select = document.createElement('select');
    ['>', '>=', '<', '<='].forEach((symbol) => {
      const option = document.createElement('option');
      option.value = symbol;
      option.textContent = symbol;
      select.appendChild(option);
    });
    comparisonLabel.appendChild(select);

    const slopeLabel = document.createElement('label');
    slopeLabel.textContent = 'Slope (m)';
    const slopeInput = document.createElement('input');
    slopeInput.type = 'number';
    slopeInput.step = '0.1';
    slopeInput.value = '1';
    slopeLabel.appendChild(slopeInput);

    const interceptLabel = document.createElement('label');
    interceptLabel.textContent = 'Y-intercept (b)';
    const interceptInput = document.createElement('input');
    interceptInput.type = 'number';
    interceptInput.step = '0.1';
    interceptInput.value = '0';
    interceptLabel.appendChild(interceptInput);

    const actions = document.createElement('div');
    actions.className = 'form-actions';
    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'Add Inequality';
    actions.appendChild(submit);

    form.appendChild(comparisonLabel);
    form.appendChild(slopeLabel);
    form.appendChild(interceptLabel);
    form.appendChild(actions);

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      setMode('add-inequality');
      addObject({
        type: 'inequality',
        definition: {
          comparison: select.value,
          form: 'slope-intercept',
          slope: parseNumber(slopeInput.value),
          intercept: parseNumber(interceptInput.value),
        },
      });
      setMode('pan');
    });

    details.appendChild(form);
    return details;
  }

  createFunctionForm() {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = 'Function y = f(x)';
    details.appendChild(summary);

    const form = document.createElement('form');

    const typeLabel = document.createElement('label');
    typeLabel.textContent = 'Type';
    const typeSelect = document.createElement('select');
    typeSelect.innerHTML =
      '<option value="linear">Linear (mx + b)</option><option value="quadratic">Quadratic (ax² + bx + c)</option><option value="absolute">Absolute a|x - h| + k</option>';
    typeLabel.appendChild(typeSelect);

    const coefficientWrapper = document.createElement('div');
    coefficientWrapper.className = 'function-coefficients';

    const renderCoefficientInputs = () => {
      coefficientWrapper.replaceChildren();
      if (typeSelect.value === 'linear') {
        coefficientWrapper.appendChild(
          this.createNumberInput('Slope (m)', '1')
        );
        coefficientWrapper.appendChild(
          this.createNumberInput('Intercept (b)', '0')
        );
      } else if (typeSelect.value === 'quadratic') {
        coefficientWrapper.appendChild(this.createNumberInput('a', '1'));
        coefficientWrapper.appendChild(this.createNumberInput('b', '0'));
        coefficientWrapper.appendChild(this.createNumberInput('c', '0'));
      } else {
        coefficientWrapper.appendChild(this.createNumberInput('a', '1'));
        coefficientWrapper.appendChild(this.createNumberInput('h', '0'));
        coefficientWrapper.appendChild(this.createNumberInput('k', '0'));
      }
    };

    typeSelect.addEventListener('change', renderCoefficientInputs);
    renderCoefficientInputs();

    const actions = document.createElement('div');
    actions.className = 'form-actions';
    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'Add Function';
    actions.appendChild(submit);

    form.appendChild(typeLabel);
    form.appendChild(coefficientWrapper);
    form.appendChild(actions);

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const inputs = Array.from(coefficientWrapper.querySelectorAll('input'));
      const values = inputs.map((input) => parseNumber(input.value));
      const subtype = typeSelect.value;
      let coefficients = {};
      if (subtype === 'linear') {
        const [m = 1, b = 0] = values;
        coefficients = { m, b };
      } else if (subtype === 'quadratic') {
        const [a = 1, b = 0, c = 0] = values;
        coefficients = { a, b, c };
      } else {
        const [a = 1, h = 0, k = 0] = values;
        coefficients = { a, h, k };
      }
      setMode('add-function');
      addObject({
        type: 'function',
        definition: {
          subtype,
          coefficients,
        },
      });
      setMode('pan');
    });

    details.appendChild(form);
    return details;
  }

  createNumberInput(labelText, defaultValue = '0') {
    const label = document.createElement('label');
    label.textContent = labelText;
    const input = document.createElement('input');
    input.type = 'number';
    input.step = '0.1';
    input.value = defaultValue;
    label.appendChild(input);
    return label;
  }
}

export default GraphToolbar;
