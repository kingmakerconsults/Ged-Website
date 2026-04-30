// frontend/components/collab/useCollabSocket.js
import { useEffect, useRef, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { getApiBaseUrl } from '../../src/utils/apiBase.js';

/**
 * useCollabSocket
 * Connects to the /collab namespace, joins a room (if roomCode given),
 * tracks room state, participants, and provides emit() helper.
 *
 * Returns: { socket, connected, roomState, participants, lastReveal, lastEvent, emit, joinRoom, leaveRoom }
 */
export default function useCollabSocket({
  roomCode = null,
  autoJoin = true,
} = {}) {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [roomState, setRoomState] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [lastReveal, setLastReveal] = useState(null);
  const [lastEvent, setLastEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token =
      (typeof window !== 'undefined' &&
        (localStorage.getItem('token') || localStorage.getItem('appToken'))) ||
      null;
    if (!token) {
      setError('Not authenticated');
      return undefined;
    }
    const apiBase = getApiBaseUrl();
    const url = `${apiBase || window.location.origin}/collab`;
    const sock = io(url, {
      transports: ['websocket', 'polling'],
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
    });
    socketRef.current = sock;

    sock.on('connect', () => {
      setConnected(true);
      setError(null);
      if (autoJoin && roomCode) {
        sock.emit('room:join', { roomCode }, (resp) => {
          if (resp && resp.error) setError(resp.error);
        });
      }
    });
    sock.on('disconnect', () => setConnected(false));
    sock.on('connect_error', (err) => {
      setError(err?.message || 'Connection failed');
    });

    sock.on('room:state', (state) => {
      setRoomState(state);
      setParticipants(state.participants || []);
    });
    sock.on('participant:joined', (p) => {
      setLastEvent({ type: 'participant:joined', data: p });
    });
    sock.on('participant:left', (p) => {
      setLastEvent({ type: 'participant:left', data: p });
    });
    sock.on('session:started', (d) => {
      setLastEvent({ type: 'session:started', data: d });
    });
    sock.on('session:ended', (d) => {
      setLastEvent({ type: 'session:ended', data: d });
    });
    sock.on('question:changed', (d) => {
      setLastEvent({ type: 'question:changed', data: d });
      setRoomState((s) =>
        s ? { ...s, state: { ...s.state, currentQuestion: d.index } } : s
      );
    });
    sock.on('mode:changed', (d) => {
      setRoomState((s) =>
        s ? { ...s, state: { ...s.state, paceMode: d.paceMode } } : s
      );
    });
    sock.on('join_lock:changed', (d) => {
      setRoomState((s) =>
        s ? { ...s, state: { ...s.state, joinLocked: !!d.joinLocked } } : s
      );
      setLastEvent({ type: 'join_lock:changed', data: d });
    });
    sock.on('answer:revealed', (d) => {
      setLastReveal(d);
      setRoomState((s) => {
        if (!s) return s;
        const revealed = Array.from(
          new Set([...(s.state?.revealedQuestions || []), d.questionIndex])
        );
        return { ...s, state: { ...s.state, revealedQuestions: revealed } };
      });
    });
    sock.on('participant:answered', (d) => {
      setLastEvent({ type: 'participant:answered', data: d });
    });
    sock.on('essay:content_changed', (d) => {
      setRoomState((s) =>
        s
          ? {
              ...s,
              state: {
                ...s.state,
                essayContent: d.content,
                ...(d.draft !== undefined
                  ? { currentParagraphDraft: d.draft }
                  : {}),
              },
            }
          : s
      );
      setLastEvent({ type: 'essay:content_changed', data: d });
    });
    sock.on('essay:slot_updated', (d) => {
      setRoomState((s) => {
        if (!s) return s;
        const jig = s.state?.essayJigsaw;
        if (!jig || !Array.isArray(jig.slots)) return s;
        const slots = jig.slots.map((slot) =>
          slot.key === d.slotKey ? { ...slot, content: d.content } : slot
        );
        return {
          ...s,
          state: {
            ...s.state,
            essayJigsaw: { ...jig, slots },
            essayContent: d.stitched ?? s.state.essayContent,
          },
        };
      });
      setLastEvent({ type: 'essay:slot_updated', data: d });
    });
    sock.on('essay:turn_changed', (d) => {
      setRoomState((s) =>
        s
          ? {
              ...s,
              state: {
                ...s.state,
                essayTurn: d.nextUserId,
                essayTimer: {
                  ...(s.state?.essayTimer || {}),
                  turnDeadline:
                    d.turnDeadline !== undefined
                      ? d.turnDeadline
                      : s.state?.essayTimer?.turnDeadline,
                },
              },
            }
          : s
      );
      setLastEvent({ type: 'essay:turn_changed', data: d });
    });
    sock.on('essay:started', (d) => {
      setRoomState((s) =>
        s
          ? {
              ...s,
              status: 'active',
              state: {
                ...s.state,
                essayMode: d.mode,
                essayJigsaw: d.jigsaw || s.state?.essayJigsaw,
                essayTurn:
                  d.essayTurn !== undefined ? d.essayTurn : s.state?.essayTurn,
                essayTimer: {
                  ...(s.state?.essayTimer || {}),
                  turnDeadline: d.turnDeadline,
                  sessionDeadline: d.sessionDeadline,
                },
              },
            }
          : s
      );
      setLastEvent({ type: 'essay:started', data: d });
    });
    sock.on('essay:turn_timeout', (d) => {
      setLastEvent({ type: 'essay:turn_timeout', data: d });
    });
    sock.on('essay:session_timeout', (d) => {
      setLastEvent({ type: 'essay:session_timeout', data: d });
    });
    sock.on('essay:submitted', (d) => {
      setLastEvent({ type: 'essay:submitted', data: d });
    });
    sock.on('essay:ai_review_ready', (d) => {
      setRoomState((s) =>
        s ? { ...s, state: { ...s.state, aiReview: d.aiReview } } : s
      );
      setLastEvent({ type: 'essay:ai_review_ready', data: d });
    });
    sock.on('matchmaking:matched', (d) => {
      setLastEvent({ type: 'matchmaking:matched', data: d });
    });

    return () => {
      try {
        sock.emit('room:leave');
      } catch (_) {}
      sock.disconnect();
      socketRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomCode]);

  const emit = useCallback((event, payload, ack) => {
    if (!socketRef.current) return;
    if (ack) {
      socketRef.current.emit(event, payload, ack);
    } else {
      socketRef.current.emit(event, payload);
    }
  }, []);

  const joinRoom = useCallback((code) => {
    if (!socketRef.current) return;
    socketRef.current.emit('room:join', { roomCode: code });
  }, []);

  const leaveRoom = useCallback(() => {
    if (!socketRef.current) return;
    socketRef.current.emit('room:leave');
  }, []);

  return {
    socket: socketRef.current,
    connected,
    roomState,
    participants,
    lastReveal,
    lastEvent,
    error,
    emit,
    joinRoom,
    leaveRoom,
  };
}
