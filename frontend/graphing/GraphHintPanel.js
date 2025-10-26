import { getAIHelpEnabled, setAIHelpEnabled, subscribe } from './graphStore.js';

const ensureStyles = () => {
  if (document.getElementById('graph-hint-styles')) return;
  const style = document.createElement('style');
  style.id = 'graph-hint-styles';
  style.textContent = `
    .graph-hints {
      border-radius: 16px;
      padding: 18px 20px;
      background: rgba(244, 247, 255, 0.92);
      color: #0f172a;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: inset 0 1px 0 rgba(148, 163, 184, 0.22);
    }
    .graph-hints.dark {
      background: rgba(15, 23, 42, 0.85);
      color: #e2e8f0;
      box-shadow: inset 0 1px 0 rgba(56, 189, 248, 0.25);
    }
    .graph-hints h3 {
      margin: 0;
      font-size: 16px;
    }
    .graph-hints button {
      align-self: flex-start;
      border: none;
      border-radius: 999px;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      background: linear-gradient(120deg, #0ea5e9, #38bdf8);
      color: #0b1120;
      box-shadow: 0 10px 22px rgba(14, 165, 233, 0.3);
    }
    .graph-hints ul {
      margin: 0;
      padding-left: 20px;
      display: grid;
      gap: 6px;
    }
    .graph-hints .disclaimer {
      font-size: 12px;
      opacity: 0.75;
    }
  `;
  document.head.appendChild(style);
};

class GraphHintPanel {
  constructor(container, props = {}) {
    if (!container) throw new Error('GraphHintPanel requires a mount container');
    ensureStyles();
    this.container = container;
    this.props = props;
    this.root = document.createElement('section');
    this.root.className = 'graph-hints';
    this.container.appendChild(this.root);

    this.render();
    this.unsubscribe = subscribe(() => this.render());
  }

  destroy() {
    this.unsubscribe?.();
    this.root.remove();
  }

  setProps(nextProps = {}) {
    this.props = { ...this.props, ...nextProps };
    this.render();
  }

  render() {
    const aiEnabled = getAIHelpEnabled();
    this.root.classList.toggle('dark', this.props.theme === 'dark');
    this.root.replaceChildren(...(aiEnabled ? this.renderOnState() : this.renderOffState()));
  }

  renderOffState() {
    const heading = document.createElement('h3');
    heading.textContent = 'AI Help is currently off.';
    const message = document.createElement('p');
    message.textContent = 'Enable it to preview guided reasoning steps for this goal.';
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Enable AI Help';
    button.addEventListener('click', () => setAIHelpEnabled(true));
    return [heading, message, button];
  }

  renderOnState() {
    const heading = document.createElement('h3');
    heading.textContent = this.props.targetGoal || 'Graph reasoning steps';
    const list = document.createElement('ul');

    const steps = this.props.steps || [
      'Identify the key values from the equation or points given.',
      'Plot or trace those values carefully on the grid.',
      'Check intercepts and slope to confirm the placement.',
    ];
    steps.forEach(step => {
      const li = document.createElement('li');
      li.textContent = step;
      list.appendChild(li);
    });

    const disclaimer = document.createElement('div');
    disclaimer.className = 'disclaimer';
    disclaimer.textContent = 'AI-style reasoning preview. Double-check your work.';

    return [heading, list, disclaimer];
  }
}

export default GraphHintPanel;
