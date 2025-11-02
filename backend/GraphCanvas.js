// Simple client-side GraphCanvas module served by backend
// Exports default and named GraphCanvas to satisfy dynamic import usage

export class GraphCanvas {
  constructor(container, options = {}) {
    this.container = container;
    this.options = options;
    this.canvas = document.createElement('canvas');
    this.canvas.width = (container.clientWidth || 640);
    this.canvas.height = Math.max(320, container.clientHeight || 360);
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.display = 'block';
    this.canvas.style.background = '#0b1220';
    this.canvas.style.border = '1px solid rgba(148,163,184,0.35)';
    container.appendChild(this.canvas);
    const ctx = this.canvas.getContext('2d');
    this._drawPlaceholder(ctx);
  }

  _drawPlaceholder(ctx) {
    const { width, height } = this.canvas;
    // axes
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 1;
    // x-axis
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    // y-axis
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    // title
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.font = '16px system-ui, -apple-system, Segoe UI, Roboto, sans-serif';
    ctx.fillText('Graphing Tool (placeholder)', 12, 24);
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = '13px system-ui, -apple-system, Segoe UI, Roboto, sans-serif';
    ctx.fillText('This confirms /graphing/GraphCanvas.js loaded.', 12, 44);
  }

  destroy() {
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
    this.canvas = null;
    this.container = null;
  }
}

export default GraphCanvas;
