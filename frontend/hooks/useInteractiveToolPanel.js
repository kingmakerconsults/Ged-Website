/**
 * useInteractiveToolPanel Hook
 *
 * Manages the lifecycle of interactive tool panels (graph and geometry)
 * for quiz questions that require visual aids.
 */

import { useEffect, useRef } from 'react';

export function useInteractiveToolPanel({
  enabled,
  currentQuestion,
  toolPanelRef,
  hasGraphData,
  hasGeometryData,
}) {
  const toolInstanceRef = useRef(null);
  const toolTypeRef = useRef(null);

  const currentIndex = currentQuestion?.index ?? -1;

  // Determine if we need to show the tool panel
  const needsToolPanel = enabled && (hasGraphData || hasGeometryData);

  useEffect(() => {
    if (!enabled || !toolPanelRef?.current) return;

    const panel = toolPanelRef.current;
    const currentQ = currentQuestion;

    // Determine which tool type to mount
    const nextType = hasGraphData
      ? 'graph'
      : hasGeometryData
      ? 'geometry'
      : null;

    // Cleanup previous tool
    const destroyTool = () => {
      if (toolInstanceRef.current) {
        try {
          if (typeof toolInstanceRef.current.destroy === 'function') {
            toolInstanceRef.current.destroy();
          } else if (typeof toolInstanceRef.current.unmount === 'function') {
            toolInstanceRef.current.unmount();
          }
        } catch (err) {
          console.warn('[tool-panel] destroy error:', err?.message || err);
        }
        toolInstanceRef.current = null;
      }
      toolTypeRef.current = null;
    };

    // If same tool type and question, skip remounting
    if (toolTypeRef.current === nextType && nextType) {
      return;
    }

    destroyTool();

    // If no tool needed, hide and exit
    if (!nextType) {
      try {
        panel.style.display = 'none';
        panel.setAttribute('aria-hidden', 'true');
      } catch {}
      return;
    }

    // Show panel
    try {
      panel.style.display = '';
      panel.removeAttribute('aria-hidden');
    } catch {}

    // Ensure container has a reasonable height for canvases
    panel.style.minHeight = '320px';

    // Dynamically import modules served from /frontend
    (async () => {
      try {
        if (!enabled) return;

        if (nextType === 'graph') {
          const mod = await import('../graphing/GraphCanvas.js');
          const mount = mod && mod.mount;
          const unmount = mod && mod.unmount;
          const GraphCanvas = mod && (mod.default || mod.GraphCanvas);
          const payload = {
            graphSpec:
              (currentQ &&
                (currentQ.graphSpec ||
                  currentQ.graphData ||
                  currentQ.coordinatePlane)) ||
              null,
          };
          if (typeof mount === 'function') {
            mount(panel, payload);
            toolInstanceRef.current = {
              destroy: () => {
                try {
                  unmount && unmount(panel);
                } catch {}
              },
            };
            toolTypeRef.current = 'graph';
          } else if (typeof GraphCanvas === 'function') {
            toolInstanceRef.current = new GraphCanvas(panel, {
              spec: payload.graphSpec,
            });
            toolTypeRef.current = 'graph';
          }
        } else if (nextType === 'geometry') {
          const mod = await import('../geometry/GeometryCanvas.js');
          const mount = mod && mod.mount;
          const unmount = mod && mod.unmount;
          const GeometryCanvas = mod && (mod.default || mod.GeometryCanvas);
          const payload = {
            geometrySpec: (currentQ && currentQ.geometrySpec) || null,
          };
          if (typeof mount === 'function') {
            mount(panel, payload);
            toolInstanceRef.current = {
              destroy: () => {
                try {
                  unmount && unmount(panel);
                } catch {}
              },
            };
            toolTypeRef.current = 'geometry';
          } else if (typeof GeometryCanvas === 'function') {
            toolInstanceRef.current = new GeometryCanvas(panel, {
              spec: payload.geometrySpec,
            });
            toolTypeRef.current = 'geometry';
          }
        }
      } catch (e) {
        console.warn(
          '[tool-panel] failed to mount tool:',
          nextType,
          e?.message || e
        );
      }
    })();

    // Cleanup on unmount or question change
    return () => {
      destroyTool();
    };
  }, [
    enabled,
    currentIndex,
    currentQuestion?.useGraphTool,
    currentQuestion?.useGeometryTool,
    hasGraphData,
    hasGeometryData,
  ]);

  return { needsToolPanel };
}

// Legacy window attachment (will be removed once all consumers use ES modules)
if (typeof window !== 'undefined') {
  window.Hooks = Object.assign(window.Hooks || {}, { useInteractiveToolPanel });
}
