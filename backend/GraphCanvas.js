// Simple client-side GraphCanvas module served by backend
// Exports default and named GraphCanvas to satisfy dynamic import usage

export class GraphCanvas {
  constructor(container, options = {}) {
    this.container = container;
    this.options = options || {};
    this.spec = this.options.spec || null;
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
    if (this.spec) {
      this._drawFromSpec(ctx, this.spec);
    } else {
      this._drawPlaceholder(ctx);
    }
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

  _drawFromSpec(ctx, spec) {
    const { width, height } = this.canvas;
    // Compute bounds
    let xs = [], ys = [];
    if (spec && Array.isArray(spec.points)) {
      xs = spec.points.map(p => p.x);
      ys = spec.points.map(p => p.y);
    }
    const xMin = Math.min(0, ...xs);
    const xMax = Math.max(10, ...xs);
    const yMin = Math.min(0, ...ys);
    const yMax = Math.max(10, ...ys);

    // margins
    const padL = 50, padR = 20, padT = 20, padB = 40;
    const plotW = width - padL - padR;
    const plotH = height - padT - padB;
    const sx = x => padL + (x - xMin) * (plotW / (xMax - xMin || 1));
    const sy = y => padT + plotH - (y - yMin) * (plotH / (yMax - yMin || 1));

    // background
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0,0,width,height);

    // axes
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 1;
    // x-axis at y=0
    if (yMin <= 0 && yMax >= 0) {
      ctx.beginPath(); ctx.moveTo(padL, sy(0)); ctx.lineTo(width - padR, sy(0)); ctx.stroke();
    }
    // y-axis at x=0
    if (xMin <= 0 && xMax >= 0) {
      ctx.beginPath(); ctx.moveTo(sx(0), padT); ctx.lineTo(sx(0), height - padB); ctx.stroke();
    }

    // labels
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = '13px system-ui, -apple-system, Segoe UI, Roboto, sans-serif';
    if (spec.xLabel) ctx.fillText(String(spec.xLabel), width/2 - 20, height - 12);
    if (spec.yLabel) {
      ctx.save();
      ctx.translate(14, height/2 + 20);
      ctx.rotate(-Math.PI/2);
      ctx.fillText(String(spec.yLabel), 0, 0);
      ctx.restore();
    }

    // data
    if (spec.type === 'line' && Array.isArray(spec.points) && spec.points.length >= 2) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      spec.points.forEach((pt, i) => {
        const X = sx(pt.x), Y = sy(pt.y);
        if (i === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
      });
      ctx.stroke();

      // markers
      ctx.fillStyle = '#e2e8f0';
      spec.points.forEach(pt => {
        const X = sx(pt.x), Y = sy(pt.y);
        ctx.beginPath(); ctx.arc(X, Y, 3, 0, Math.PI*2); ctx.fill();
      });
    }
  }
}

export default GraphCanvas;
