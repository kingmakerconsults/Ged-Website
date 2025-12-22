import React, { useEffect, useRef } from 'react';

/**
 * GraphTool - JSXGraph wrapper component for interactive graphing
 *
 * This component initializes a JSXGraph board for plotting points,
 * lines, and other mathematical objects.
 *
 * @param {Object} props
 * @param {string} props.boardId - Unique ID for the JSXGraph board element
 * @param {Object} props.config - JSXGraph board configuration
 * @param {Function} props.onBoardReady - Callback when board is initialized
 */
export default function GraphTool({
  boardId = 'jxgbox',
  config = {},
  onBoardReady = null,
}) {
  const boardRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Check if JSXGraph is loaded
    if (typeof window.JXG === 'undefined') {
      console.warn(
        'JSXGraph library not loaded. Please include JSXGraph script.'
      );
      return;
    }

    // Default board configuration
    const defaultConfig = {
      boundingbox: [-10, 10, 10, -10],
      axis: true,
      showNavigation: true,
      showCopyright: false,
      keepaspectratio: true,
      ...config,
    };

    try {
      // Initialize JSXGraph board
      const board = window.JXG.JSXGraph.initBoard(boardId, defaultConfig);
      boardRef.current = board;

      // Callback when board is ready
      if (onBoardReady && typeof onBoardReady === 'function') {
        onBoardReady(board);
      }
    } catch (error) {
      console.error('Failed to initialize JSXGraph board:', error);
    }

    // Cleanup on unmount
    return () => {
      if (boardRef.current) {
        try {
          window.JXG.JSXGraph.freeBoard(boardRef.current);
        } catch (e) {
          console.warn('Error freeing JSXGraph board:', e);
        }
      }
    };
  }, [boardId, config, onBoardReady]);

  return (
    <div className="graph-tool-container w-full h-full bg-white rounded-lg p-4">
      <h3 className="text-xl font-bold mb-4 text-blue-700">📊 Graphing Tool</h3>
      {typeof window.JXG === 'undefined' && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 font-semibold">
            ⚠️ JSXGraph library not loaded. Please refresh the page.
          </p>
        </div>
      )}
      <div
        id={boardId}
        ref={containerRef}
        className="jxgbox w-full h-full min-h-[400px] rounded border border-slate-300 bg-white"
        role="img"
        aria-label="Interactive graph for plotting mathematical objects"
      />
    </div>
  );
}
