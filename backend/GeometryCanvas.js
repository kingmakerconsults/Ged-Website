// Simple client-side GeometryCanvas module served by backend
// Exports default and named GeometryCanvas to satisfy dynamic import usage

export class GeometryCanvas {
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

    // Draw a simple geometric grid and a rectangle
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += 20) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y <= height; y += 20) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(255,255,255,0.75)';
    ctx.lineWidth = 2;
    ctx.strokeRect(width/2 - 80, height/2 - 50, 160, 100);

    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.font = '16px system-ui, -apple-system, Segoe UI, Roboto, sans-serif';
    ctx.fillText('Geometry Tool (placeholder)', 12, 24);
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = '13px system-ui, -apple-system, Segoe UI, Roboto, sans-serif';
    ctx.fillText('This confirms /geometry/GeometryCanvas.js loaded.', 12, 44);
  }

  destroy() {
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
    this.canvas = null;
    this.container = null;
  }
}

export default GeometryCanvas;
