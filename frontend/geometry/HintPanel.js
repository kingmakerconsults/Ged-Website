import {
  getAIHelpEnabled,
  setAIHelpEnabled,
  subscribe,
} from './geometryStore.js';

const ensureStyles = () => {
  if (document.getElementById('geometry-hint-styles')) return;
  const style = document.createElement('style');
  style.id = 'geometry-hint-styles';
  style.textContent = `
    .geometry-hints {
      border-radius: 14px;
      padding: 16px 18px;
      background: rgba(244, 244, 249, 0.9);
      box-shadow: inset 0 1px 0 rgba(148, 163, 184, 0.25);
      display: flex;
      flex-direction: column;
      gap: 12px;
      color: #0f172a;
    }
    .geometry-hints.dark {
      background: rgba(15, 23, 42, 0.85);
      color: #e2e8f0;
      box-shadow: inset 0 1px 0 rgba(45, 212, 191, 0.25);
    }
    .geometry-hints h3 {
      margin: 0;
      font-size: 16px;
    }
    .geometry-hints button {
      align-self: flex-start;
      border: none;
      border-radius: 999px;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      background: linear-gradient(120deg, #0ea5e9, #22d3ee);
      color: #0f172a;
      box-shadow: 0 8px 18px rgba(14, 165, 233, 0.3);
    }
    .geometry-hints ul {
      list-style: decimal;
      margin: 0;
      padding-left: 20px;
      display: grid;
      gap: 6px;
    }
    .geometry-hints .disclaimer {
      font-size: 12px;
      opacity: 0.8;
    }
  `;
  document.head.appendChild(style);
};

class HintPanel {
  constructor(container, props = {}) {
    if (!container) throw new Error('HintPanel requires a mount container');
    ensureStyles();
    this.container = container;
    this.props = props;
    this.root = document.createElement('section');
    this.root.className = 'geometry-hints';
    container.appendChild(this.root);
    this.render();
    this.unsubscribe = subscribe(() => this.render());
  }

  destroy() {
    this.unsubscribe?.();
    this.root.remove();
  }

  setProps(nextProps) {
    this.props = { ...this.props, ...nextProps };
    this.render();
  }

  render() {
    const aiEnabled = getAIHelpEnabled();
    this.root.classList.toggle('dark', this.props.theme === 'dark');
    this.root.replaceChildren(...(aiEnabled ? this.renderOnContent() : this.renderOffContent()));
  }

  renderOffContent() {
    const heading = document.createElement('h3');
    heading.textContent = 'AI Help is currently off.';
    const message = document.createElement('p');
    message.textContent = 'Turn it on to preview guided reasoning steps.';
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Enable AI Help';
    button.addEventListener('click', () => setAIHelpEnabled(true));
    return [heading, message, button];
  }

  renderOnContent() {
    const heading = document.createElement('h3');
    heading.textContent = this.props.targetGoal || 'How to approach this problem';
    const list = document.createElement('ul');

    const steps = this.props.steps || [
      'Identify the relevant measurements on the diagram.',
      'Choose the formula that connects those measurements.',
      'Compute carefully and double-check units.',
    ];
    steps.forEach(step => {
      const item = document.createElement('li');
      item.textContent = step;
      list.appendChild(item);
    });

    const disclaimer = document.createElement('div');
    disclaimer.className = 'disclaimer';
    disclaimer.textContent = 'AI-style reasoning preview. Double-check your work.';

    return [heading, list, disclaimer];
  }
}

export default HintPanel;
