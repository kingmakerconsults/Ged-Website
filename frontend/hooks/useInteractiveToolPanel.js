/**
 * useInteractiveToolPanel Hook
 *
 * Manages the lifecycle of interactive tool panels (graph and geometry)
 * for quiz questions that require visual aids or interactive graphing answers.
 */

import { useEffect, useRef, useCallback } from 'react';

export function useInteractiveToolPanel({
  enabled,
  currentQuestion,
  toolPanelRef,
  hasGraphData,
  hasGeometryData,
}) {
  const toolInstanceRef = useRef(null);
  const toolTypeRef = useRef(null);
  // Track the question index so we force remount on navigation
  const lastMountedIndex = useRef(-1);

  const currentIndex =
    currentQuestion?.index ?? currentQuestion?.questionNumber ?? -1;

  // Determine if we need to show the tool panel
  const needsToolPanel = enabled && (hasGraphData || hasGeometryData);

  /**
   * Read the student's graph answer from the mounted canvas.
   * Returns { points: [...], lines: [...] } or null if no graph is mounted.
   */
  const getGraphAnswer = useCallback(() => {
    const panel = toolPanelRef?.current;
    if (panel && typeof panel.__getGraphAnswer === 'function') {
      return panel.__getGraphAnswer();
    }
    return null;
  }, [toolPanelRef]);

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
      lastMountedIndex.current = -1;
    };

    // Force remount when question index changes (important for graphPlot —
    // each question needs a fresh graph state with its own spec objects).
    const questionChanged = lastMountedIndex.current !== currentIndex;

    // If same tool type AND same question, skip remounting
    if (toolTypeRef.current === nextType && nextType && !questionChanged) {
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
          const isGraphPlot = currentQ && currentQ.answerType === 'graphPlot';
          const payload = {
            graphSpec:
              (currentQ &&
                (currentQ.graphSpec ||
                  currentQ.graphData ||
                  currentQ.coordinatePlane)) ||
              null,
            quizMode: isGraphPlot,
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
            lastMountedIndex.current = currentIndex;
          } else if (typeof GraphCanvas === 'function') {
            toolInstanceRef.current = new GraphCanvas(panel, {
              spec: payload.graphSpec,
            });
            toolTypeRef.current = 'graph';
            lastMountedIndex.current = currentIndex;
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
            lastMountedIndex.current = currentIndex;
          } else if (typeof GeometryCanvas === 'function') {
            toolInstanceRef.current = new GeometryCanvas(panel, {
              spec: payload.geometrySpec,
            });
            toolTypeRef.current = 'geometry';
            lastMountedIndex.current = currentIndex;
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

  return { needsToolPanel, getGraphAnswer };
}

// Legacy window attachment (will be removed once all consumers use ES modules)
if (typeof window !== 'undefined') {
  window.Hooks = Object.assign(window.Hooks || {}, { useInteractiveToolPanel });
}
