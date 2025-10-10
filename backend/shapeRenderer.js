/**
 * shapeRenderer.js
 *
 * This module provides functions to render geometric shapes as SVG images.
 * Each function takes a 'dimensions' object and returns a string containing the complete SVG markup.
 * These SVGs are designed to be embedded directly into HTML or used in data URIs.
 */

const shapeRenderers = {
    /**
     * Renders a rectangle with labeled width and height.
     * @param {object} dims - Dimensions object.
     * @param {number} dims.w - The width of the rectangle.
     * @param {number} dims.h - The height of the rectangle.
     * @returns {string} SVG markup as a string.
     */
    rectangle: ({ w, h }) => {
        const width = w * 10;
        const height = h * 10;
        const padding = 20;
        const svgWidth = width + padding * 2;
        const svgHeight = height + padding * 2;

        return `
      <svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
        <rect x="${padding}" y="${padding}" width="${width}" height="${height}" fill="none" stroke="black" stroke-width="2"/>
        <text x="${width / 2 + padding}" y="${padding - 5}" font-family="Arial" font-size="12" text-anchor="middle">w = ${w}</text>
        <text x="${padding - 10}" y="${height / 2 + padding}" font-family="Arial" font-size="12" text-anchor="middle" transform="rotate(-90, ${padding - 10}, ${height/2 + padding})">h = ${h}</text>
      </svg>
    `;
    },

    /**
     * Renders a right-angled triangle with labeled base and height.
     * @param {object} dims - Dimensions object.
     * @param {number} dims.b - The base of the triangle.
     * @param {number} dims.h - The height of the triangle.
     * @returns {string} SVG markup as a string.
     */
    triangle: ({ b, h }) => {
        const base = b * 10;
        const height = h * 10;
        const padding = 20;
        const svgWidth = base + padding * 2;
        const svgHeight = height + padding * 2;

        return `
      <svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
        <polygon points="${padding},${padding} ${padding},${height + padding} ${base + padding},${height + padding}" fill="none" stroke="black" stroke-width="2"/>
        <text x="${base / 2 + padding}" y="${height + padding + 15}" font-family="Arial" font-size="12" text-anchor="middle">b = ${b}</text>
        <text x="${padding - 10}" y="${height / 2 + padding}" font-family="Arial" font-size="12" text-anchor="middle" transform="rotate(-90, ${padding-10}, ${height/2 + padding})">h = ${h}</text>
      </svg>
    `;
    },

    /**
     * Renders a circle with a labeled radius.
     * @param {object} dims - Dimensions object.
     * @param {number} dims.r - The radius of the circle.
     * @returns {string} SVG markup as a string.
     */
    circle: ({ r }) => {
        const radius = r * 10;
        const padding = 10;
        const svgSize = radius * 2 + padding * 2;
        const cx = radius + padding;
        const cy = radius + padding;

        return `
      <svg width="${svgSize}" height="${svgSize}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="black" stroke-width="2"/>
        <line x1="${cx}" y1="${cy}" x2="${cx + radius}" y2="${cy}" stroke="black" stroke-width="1" stroke-dasharray="2,2"/>
        <text x="${cx + radius / 2}" y="${cy - 5}" font-family="Arial" font-size="12" text-anchor="middle">r = ${r}</text>
      </svg>
    `;
    },

    /**
     * Renders a 2D representation of a cylinder with labeled radius and height.
     * @param {object} dims - Dimensions object.
     * @param {number} dims.r - The radius of the cylinder's base.
     * @param {number} dims.h - The height of the cylinder.
     * @returns {string} SVG markup as a string.
     */
    cylinder: ({ r, h }) => {
        const radius = r * 8;
        const height = h * 8;
        const ellipseHeight = radius / 2;
        const padding = 20;
        const svgWidth = radius * 2 + padding * 2;
        const svgHeight = height + ellipseHeight + padding * 2;

        return `
        <svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="${radius + padding}" cy="${padding + ellipseHeight / 2}" rx="${radius}" ry="${ellipseHeight}" fill="none" stroke="black" stroke-width="2"/>
            <line x1="${padding}" y1="${padding + ellipseHeight / 2}" x2="${padding}" y2="${padding + ellipseHeight / 2 + height}" stroke="black" stroke-width="2"/>
            <line x1="${radius * 2 + padding}" y1="${padding + ellipseHeight / 2}" x2="${radius * 2 + padding}" y2="${padding + ellipseHeight / 2 + height}" stroke="black" stroke-width="2"/>
            <ellipse cx="${radius + padding}" cy="${padding + ellipseHeight / 2 + height}" rx="${radius}" ry="${ellipseHeight}" fill="none" stroke="black" stroke-width="2" stroke-dasharray="4,4"/>
            <text x="${radius + padding}" y="${padding - 5}" font-family="Arial" font-size="12" text-anchor="middle">r = ${r}</text>
             <text x="${padding - 10}" y="${padding + ellipseHeight/2 + height/2}" font-family="Arial" font-size="12" text-anchor="middle" transform="rotate(-90, ${padding-10}, ${padding+ellipseHeight/2+height/2})">h = ${h}</text>
        </svg>
        `;
    },

    /**
     * Renders a 2D representation of a rectangular prism with labeled length, width, and height.
     * @param {object} dims - Dimensions object.
     * @param {number} dims.l - The length of the prism.
     * @param {number} dims.w - The width of the prism.
     * @param {number} dims.h - The height of the prism.
     * @returns {string} SVG markup as a string.
     */
    rectangular_prism: ({ l, w, h }) => {
        const length = l * 10;
        const width = w * 5; // perspective
        const height = h * 10;
        const padding = 20;
        const svgWidth = length + width + padding * 2;
        const svgHeight = height + width + padding * 2;

        const x1 = padding, y1 = padding + width;
        const x2 = padding + length, y2 = padding + width;
        const x3 = padding + length, y3 = padding + width + height;
        const x4 = padding, y4 = padding + width + height;

        const x5 = padding + width, y5 = padding;
        const x6 = padding + length + width, y6 = padding;
        const x7 = padding + length + width, y7 = padding + height;
        const x8 = padding + width, y8 = padding + height;

        return `
        <svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
            <polygon points="${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}" fill="rgba(200,200,200,0.2)" stroke="black" stroke-width="2"/>
            <polygon points="${x5},${y5} ${x6},${y6} ${x7},${y7} ${x8},${y8}" fill="rgba(200,200,200,0.2)" stroke="black" stroke-width="2"/>
            <line x1="${x1}" y1="${y1}" x2="${x5}" y2="${y5}" stroke="black" stroke-width="2"/>
            <line x1="${x2}" y1="${y2}" x2="${x6}" y2="${y6}" stroke="black" stroke-width="2"/>
            <line x1="${x3}" y1="${y3}" x2="${x7}" y2="${y7}" stroke="black" stroke-width="2"/>
            <line x1="${x4}" y1="${y4}" x2="${x8}" y2="${y8}" stroke="black" stroke-width="2"/>
            <text x="${padding + length/2}" y="${padding + width + height + 15}" font-family="Arial" font-size="12" text-anchor="middle">l = ${l}</text>
            <text x="${padding + length + width / 2 + 5}" y="${padding + height/2}" font-family="Arial" font-size="12" text-anchor="middle">w = ${w}</text>
            <text x="${padding - 10}" y="${padding + width + height/2}" font-family="Arial" font-size="12" text-anchor="middle" transform="rotate(-90, ${padding-10}, ${padding+width+height/2})">h = ${h}</text>
        </svg>
        `;
    },

    /**
     * Renders a 2D representation of a cone with labeled radius and height.
     * @param {object} dims - Dimensions object.
     * @param {number} dims.r - The radius of the cone's base.
     * @param {number} dims.h - The height of the cone.
     * @returns {string} SVG markup as a string.
     */
    cone: ({ r, h }) => {
        const radius = r * 8;
        const height = h * 12;
        const ellipseHeight = radius / 2;
        const padding = 20;
        const svgWidth = radius * 2 + padding * 2;
        const svgHeight = height + ellipseHeight + padding * 2;
        const apexX = padding + radius;
        const apexY = padding;

        return `
        <svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="${padding + radius}" cy="${padding + height}" rx="${radius}" ry="${ellipseHeight}" fill="none" stroke="black" stroke-width="2"/>
            <line x1="${apexX}" y1="${apexY}" x2="${padding}" y2="${padding + height}" stroke="black" stroke-width="2"/>
            <line x1="${apexX}" y1="${apexY}" x2="${padding + radius*2}" y2="${padding + height}" stroke="black" stroke-width="2"/>
            <line x1="${apexX}" y1="${apexY}" x2="${padding + radius}" y2="${padding + height}" stroke="black" stroke-width="1" stroke-dasharray="2,2"/>
            <text x="${padding + radius}" y="${padding + height + ellipseHeight/2 + 15}" font-family="Arial" font-size="12" text-anchor="middle">r = ${r}</text>
            <text x="${padding + radius + 5}" y="${padding + height/2}" font-family="Arial" font-size="12" text-anchor="start">h = ${h}</text>
        </svg>
        `;
    },

    /**
     * Renders a trapezoid with labeled bases and height.
     * @param {object} dims - Dimensions object.
     * @param {number} dims.b1 - The top base of the trapezoid.
     * @param {number} dims.b2 - The bottom base of the trapezoid.
     * @param {number} dims.h - The height of the trapezoid.
     * @returns {string} SVG markup as a string.
     */
    trapezoid: ({ b1, b2, h }) => {
        const topBase = b1 * 10;
        const bottomBase = b2 * 10;
        const height = h * 10;
        const padding = 20;
        const svgWidth = Math.max(topBase, bottomBase) + padding * 4;
        const svgHeight = height + padding * 2;
        const offset = (bottomBase - topBase) / 2;

        const p1x = padding + offset;
        const p1y = padding;
        const p2x = padding + offset + topBase;
        const p2y = padding;
        const p3x = padding + bottomBase;
        const p3y = padding + height;
        const p4x = padding;
        const p4y = padding + height;

        return `
        <svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
            <polygon points="${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y} ${p4x},${p4y}" fill="none" stroke="black" stroke-width="2"/>
            <text x="${p1x + topBase / 2}" y="${padding - 5}" font-family="Arial" font-size="12" text-anchor="middle">b1 = ${b1}</text>
            <text x="${padding + bottomBase / 2}" y="${padding + height + 15}" font-family="Arial" font-size="12" text-anchor="middle">b2 = ${b2}</text>
            <line x1="${p1x - 10}" y1="${padding}" x2="${p1x - 10}" y2="${padding + height}" stroke="black" stroke-width="1" stroke-dasharray="2,2"/>
            <text x="${p1x - 20}" y="${padding + height / 2}" font-family="Arial" font-size="12" text-anchor="end">h = ${h}</text>
        </svg>
        `;
    },

    /**
     * Renders a 2D representation of a square pyramid.
     * @param {object} dims - Dimensions object.
     * @param {number} dims.b - The base side length of the pyramid.
     * @param {number} dims.h - The slant height of the pyramid.
     * @returns {string} SVG markup as a string.
     */
    pyramid: ({ b, h }) => {
        const base = b * 10;
        const slantHeight = h * 10;
        const perspective = base * 0.5;
        const padding = 20;
        const svgWidth = base + perspective + padding * 2;
        const svgHeight = slantHeight + perspective + padding;

        const apexX = padding + (base + perspective) / 2;
        const apexY = padding;

        const p1x = padding, p1y = padding + slantHeight;
        const p2x = padding + base, p2y = padding + slantHeight;
        const p3x = padding + base + perspective, p3y = padding + slantHeight - perspective;
        const p4x = padding + perspective, p4y = padding + slantHeight - perspective;

        return `
        <svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
            <polygon points="${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y} ${p4x},${p4y}" fill="rgba(200,200,200,0.1)" stroke="black" stroke-width="1" />
            <line x1="${apexX}" y1="${apexY}" x2="${p1x}" y2="${p1y}" stroke="black" stroke-width="2"/>
            <line x1="${apexX}" y1="${apexY}" x2="${p2x}" y2="${p2y}" stroke="black" stroke-width="2"/>
            <line x1="${apexX}" y1="${apexY}" x2="${p3x}" y2="${p3y}" stroke="black" stroke-width="2"/>
            <line x1="${apexX}" y1="${apexY}" x2="${p4x}" y2="${p4y}" stroke="black" stroke-width="1" stroke-dasharray="2,2"/>
            <text x="${padding + base/2}" y="${p1y + 15}" font-family="Arial" font-size="12" text-anchor="middle">base = ${b}</text>
            <text x="${apexX + base/3}" y="${padding + slantHeight/2}" font-family="Arial" font-size="12" text-anchor="middle">slant height = ${h}</text>
        </svg>
        `;
    }
};

// Export the renderers object so it can be required by other modules.
module.exports = { shapeRenderers };