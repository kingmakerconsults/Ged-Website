const renderRectangleSVG = ({ w, h }) => `
<svg width="250" height="200" viewBox="0 0 250 200" xmlns="http://www.w3.org/2000/svg">
  <rect x="50" y="50" width="${w * 8}" height="${h * 8}" stroke="black" fill="none" stroke-width="2" />
  <text x="${50 + (w*8)/2}" y="45" text-anchor="middle" font-family="Inter, sans-serif" font-size="16">${w}</text>
  <text x="45" y="${50 + (h*8)/2}" text-anchor="end" dominant-baseline="middle" font-family="Inter, sans-serif" font-size="16">${h}</text>
</svg>`;

const renderTriangleSVG = ({ b, h }) => `
<svg width="250" height="200" viewBox="0 0 250 200" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,${50+h*8} ${50+b*8},${50+h*8} ${50+b*8},50" stroke="black" fill="none" stroke-width="2" />
  <text x="${50 + (b*8)/2}" y="${55+h*8}" text-anchor="middle" font-family="Inter, sans-serif" font-size="16">${b}</text>
  <text x="${55+b*8}" y="${50+(h*8)/2}" dominant-baseline="middle" font-family="Inter, sans-serif" font-size="16">${h}</text>
</svg>`;

const renderCircleSVG = ({ r }) => `
<svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
  <circle cx="150" cy="150" r="${r * 8}" stroke="black" fill="none" stroke-width="2" />
  <line x1="150" y1="150" x2="${150 + r * 8}" y2="150" stroke="black" stroke-dasharray="4" />
  <text x="${150 + (r*8)/2}" y="145" font-family="Inter, sans-serif" font-size="16">${r}</text>
</svg>`;

const renderCylinderSVG = ({ r, h }) => `
<svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
  <g stroke="black" fill="none" stroke-width="2">
    <ellipse cx="150" cy="50" rx="${r*5}" ry="${r*2}" />
    <path d="M ${150 - r*5},50 L ${150 - r*5},${50 + h*5}" />
    <path d="M ${150 + r*5},50 L ${150 + r*5},${50 + h*5}" />
    <ellipse cx="150" cy="${50 + h*5}" rx="${r*5}" ry="${r*2}" />
    <text x="145" y="${50 + (h*5)/2}" text-anchor="end" dominant-baseline="middle" font-family="Inter, sans-serif" font-size="16">${h}</text>
    <text x="150" y="${55+h*5}" text-anchor="middle" font-family="Inter, sans-serif" font-size="16">${r}</text>
  </g>
</svg>`;

const renderRectangularPrismSVG = ({ l, w, h }) => `
<svg width="300" height="250" viewBox="0 0 300 250" xmlns="http://www.w3.org/2000/svg">
    <g stroke="black" fill="none" stroke-width="2">
        <rect x="${50}" y="${50}" width="${l*8}" height="${h*8}" />
        <path d="M ${50},${50} l ${w*3},-${w*3}" />
        <path d="M ${50+l*8},${50} l ${w*3},-${w*3}" />
        <path d="M ${50+l*8},${50+h*8} l ${w*3},-${w*3}" />
        <path d="M ${50+w*3},${50-w*3} H ${50+w*3+l*8}" />
        <path d="M ${50+w*3+l*8},${50-w*3} V ${50-w*3+h*8}" />
        <text x="${50 + (l*8)/2}" y="${45+h*8}" text-anchor="middle" font-family="Inter, sans-serif" font-size="16">${l}</text>
        <text x="${55+l*8+(w*3)/2}" y="${45-w*3+(h*8)/2}" font-family="Inter, sans-serif" font-size="16">${w}</text>
        <text x="45" y="${50 + (h*8)/2}" text-anchor="end" dominant-baseline="middle" font-family="Inter, sans-serif" font-size="16">${h}</text>
    </g>
</svg>`;

const renderConeSVG = ({ r, h }) => `
<svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
    <g stroke="black" fill="none" stroke-width="2">
        <ellipse cx="150" cy="${50 + h*5}" rx="${r*5}" ry="${r*2}" />
        <path d="M ${150 - r*5},${50 + h*5} L 150,50" />
        <path d="M ${150 + r*5},${50 + h*5} L 150,50" />
        <text x="145" y="${50 + (h*5)/2}" text-anchor="end" dominant-baseline="middle" font-family="Inter, sans-serif" font-size="16">${h}</text>
        <text x="150" y="${55+h*5}" text-anchor="middle" font-family="Inter, sans-serif" font-size="16">${r}</text>
    </g>
</svg>`;

const shapeRenderers = {
    rectangle: renderRectangleSVG,
    triangle: renderTriangleSVG,
    circle: renderCircleSVG,
    cylinder: renderCylinderSVG,
    rectangular_prism: renderRectangularPrismSVG,
    cone: renderConeSVG
};

module.exports = { shapeRenderers };