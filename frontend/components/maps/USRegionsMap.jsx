import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * USRegionsMap
 * - Inlines the SVG at /maps/us-regions.svg
 * - Uses /data/usRegions.json for authoritative region groupings
 * - Emits onRegionSelect(regionName)
 * - Keyboard accessible (Tab focuses states, Enter selects region)
 * - No inline styles inside SVG paths; styling via CSS classes
 */
export default function USRegionsMap({
  selectedRegion = null,
  onRegionSelect = () => {},
  disabled = false,
  showLabels = false,
  className = '',
}) {
  const containerRef = useRef(null);
  const [svgMarkup, setSvgMarkup] = useState('');
  const [regions, setRegions] = useState({
    midwest: [],
    northeast: [],
    south: [],
    west: [],
  });
  const [hoverRegion, setHoverRegion] = useState(null);

  useEffect(() => {
    let cancelled = false;
    // Load SVG text from public
    fetch('/maps/us-regions.svg')
      .then((r) =>
        r.ok ? r.text() : Promise.reject(new Error('SVG not found'))
      )
      .then((text) => {
        if (cancelled) return;
        setSvgMarkup(text);
      })
      .catch((err) => {
        console.warn('[USRegionsMap] Failed to load SVG:', err?.message || err);
        setSvgMarkup(
          '<svg viewBox="0 0 960 600" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="US Regions Map (placeholder)"><rect x="0" y="0" width="960" height="600" class="usrg-placeholder"/></svg>'
        );
      });
    // Load region metadata
    fetch('/data/usRegions.json')
      .then((r) =>
        r.ok ? r.json() : Promise.reject(new Error('usRegions.json not found'))
      )
      .then((json) => {
        if (cancelled) return;
        setRegions(json || {});
      })
      .catch((err) =>
        console.warn(
          '[USRegionsMap] Failed to load region metadata:',
          err?.message || err
        )
      );
    return () => {
      cancelled = true;
    };
  }, []);

  // After SVG mounts, annotate nodes and wire events
  useEffect(() => {
    const root = containerRef.current;
    if (!root || !svgMarkup) return;

    // Inject markup
    root.innerHTML = svgMarkup;

    const svg = root.querySelector('svg');
    if (!svg) return;
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'U.S. Regions map');
    svg.classList.add('usrg-svg');

    // Find all state paths (assume per-state <path> with id or data-state)
    const statePaths = svg.querySelectorAll('path');

    const stateToRegion = new Map();
    const regionToStates = new Map(
      Object.entries(regions).map(([k, arr]) => [k, new Set(arr)])
    );

    // Annotate each path with data-state and data-region if possible
    statePaths.forEach((p) => {
      const code = (
        p.getAttribute('data-state') ||
        p.getAttribute('id') ||
        p.getAttribute('name') ||
        ''
      ).toUpperCase();
      if (code && !p.getAttribute('data-state')) {
        p.setAttribute('data-state', code);
      }
      let region = p.getAttribute('data-region');
      if (!region && code) {
        for (const [rName, set] of regionToStates.entries()) {
          if (set.has(code)) {
            region = rName;
            break;
          }
        }
      }
      if (region) {
        p.setAttribute('data-region', region);
        stateToRegion.set(code, region);
      }
      p.setAttribute('tabindex', disabled ? '-1' : '0');
      p.setAttribute('role', 'button');
      p.classList.add('usrg-state');
    });

    const getRegionFromTarget = (el) => {
      if (!el) return null;
      const state = el.getAttribute('data-state');
      return state
        ? stateToRegion.get(state) || null
        : el.getAttribute('data-region');
    };

    const applyHighlight = (regionName) => {
      statePaths.forEach((p) => {
        const r = p.getAttribute('data-region');
        p.classList.toggle('hovered', Boolean(regionName && r === regionName));
        p.classList.toggle(
          'selected',
          Boolean(selectedRegion && r === selectedRegion)
        );
        p.classList.toggle('disabled', Boolean(disabled));
      });
      svg.setAttribute('data-selected-region', selectedRegion || '');
      svg.setAttribute('data-hover-region', regionName || '');
      svg.setAttribute('data-disabled', disabled ? 'true' : 'false');
    };

    const onEnterRegion = (e) => {
      if (disabled) return;
      const regionName = getRegionFromTarget(e.currentTarget);
      setHoverRegion(regionName);
      applyHighlight(regionName);
    };
    const onLeaveRegion = () => {
      if (disabled) return;
      setHoverRegion(null);
      applyHighlight(null);
    };
    const onClickRegion = (e) => {
      if (disabled) return;
      const regionName = getRegionFromTarget(e.currentTarget);
      if (regionName) onRegionSelect(regionName);
    };
    const onKeyDownRegion = (e) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const regionName = getRegionFromTarget(e.currentTarget);
        if (regionName) onRegionSelect(regionName);
      }
    };

    statePaths.forEach((p) => {
      p.addEventListener('mouseenter', onEnterRegion);
      p.addEventListener('mouseleave', onLeaveRegion);
      p.addEventListener('click', onClickRegion);
      p.addEventListener('keydown', onKeyDownRegion);
    });

    // Optional: Render labels
    if (showLabels) {
      const ns = 'http://www.w3.org/2000/svg';
      const labelsLayer = document.createElementNS(ns, 'g');
      labelsLayer.setAttribute('class', 'usrg-labels');
      svg.appendChild(labelsLayer);
      statePaths.forEach((p) => {
        const code = p.getAttribute('data-state');
        if (!code) return;
        try {
          const bbox = p.getBBox();
          const tx = document.createElementNS(ns, 'text');
          tx.setAttribute('x', String(bbox.x + bbox.width / 2));
          tx.setAttribute('y', String(bbox.y + bbox.height / 2));
          tx.setAttribute('text-anchor', 'middle');
          tx.setAttribute('class', 'usrg-label');
          tx.textContent = code;
          labelsLayer.appendChild(tx);
        } catch {}
      });
    }

    applyHighlight(hoverRegion);

    return () => {
      statePaths.forEach((p) => {
        p.removeEventListener('mouseenter', onEnterRegion);
        p.removeEventListener('mouseleave', onLeaveRegion);
        p.removeEventListener('click', onClickRegion);
        p.removeEventListener('keydown', onKeyDownRegion);
      });
    };
  }, [svgMarkup, regions, selectedRegion, disabled, showLabels]);

  return (
    <div
      ref={containerRef}
      className={[
        'usrg-container',
        className,
        disabled ? 'is-disabled' : '',
      ].join(' ')}
      aria-disabled={disabled ? 'true' : 'false'}
    />
  );
}
