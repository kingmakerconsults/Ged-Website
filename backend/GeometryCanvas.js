// Simple client-side GeometryCanvas module served by backend
// Exports default and named GeometryCanvas to satisfy dynamic import usage

export class GeometryCanvas {
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

  _drawFromSpec(ctx, spec) {
    const { width, height } = this.canvas;
    // background
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0,0,width,height);

    // simple grid
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += 20) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke(); }
    for (let y = 0; y <= height; y += 20) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }

    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.lineWidth = 2;

    const drawTriangle = (a=3,b=4) => {
      const scale = 12;
      const ox = width/2 - a*scale/2;
      const oy = height/2 + b*scale/2;
      const p1 = { x: ox, y: oy };
      const p2 = { x: ox + a*scale, y: oy };
      const p3 = { x: ox, y: oy - b*scale };
      ctx.beginPath(); ctx.moveTo(p1.x,p1.y); ctx.lineTo(p2.x,p2.y); ctx.lineTo(p3.x,p3.y); ctx.closePath(); ctx.stroke();
    };

    const drawRect = (w=6,h=4) => {
      const scale = 12;
      const x = width/2 - (w*scale)/2;
      const y = height/2 - (h*scale)/2;
      ctx.strokeRect(x,y,w*scale,h*scale);
    };

    switch (spec.shape) {
      case 'right_triangle':
      case 'triangle': {
        const a = Number(spec.params?.a) || 3;
        const b = Number(spec.params?.b) || 4;
        drawTriangle(a,b);
        break;
      }
      case 'rectangle': {
        const w = Number(spec.params?.width) || 6;
        const h = Number(spec.params?.height) || 4;
        drawRect(w,h);
        break;
      }
      case 'circle': {
        const r = Number(spec.params?.radius) || 50;
        ctx.beginPath(); ctx.arc(width/2, height/2, Math.min(r, Math.min(width,height)/3), 0, Math.PI*2); ctx.stroke();
        break;
      }
      default: {
        ctx.font = '14px system-ui, -apple-system, Segoe UI, Roboto, sans-serif';
        ctx.fillText(`Shape: ${String(spec.shape||'unknown')}`, 12, 24);
        break;
      }
    }
  }
}

export default GeometryCanvas;

// Simple module API for easier mounting from the quiz panel
export function mount(el, payload = {}) {
  try {
    const spec = payload.spec || payload.geometrySpec || null;
    const instance = new GeometryCanvas(el, { spec });
    el.__geometryInstance = instance;
    return instance;
  } catch (e) {
    console.warn('[GeometryCanvas] mount failed:', e?.message || e);
    throw e;
  }
}

export function unmount(el) {
  try {
    if (el && el.__geometryInstance && typeof el.__geometryInstance.destroy === 'function') {
      el.__geometryInstance.destroy();
    }
  } catch {}
  if (el) delete el.__geometryInstance;
}
