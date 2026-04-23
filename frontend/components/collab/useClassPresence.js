// useClassPresence: thin global socket connection that subscribes to all
// classes the current user is enrolled in (or teaches) and surfaces live
// "class:session_started" / "class:session_ended" events so the app can
// render a "Now teaching" join banner. Keeps a single socket alive while
// the hook is mounted (typically in App shell).
import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { getApiBaseUrl } from '../../src/utils/apiBase.js';

export default function useClassPresence({ enabled = true } = {}) {
  const [activeSessions, setActiveSessions] = useState({}); // classId -> {roomCode,title,subject,instructorName,curriculumItemId}
  const socketRef = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;
    const token =
      (typeof window !== 'undefined' &&
        (localStorage.getItem('token') || localStorage.getItem('appToken'))) ||
      null;
    if (!token) return undefined;

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
      sock.emit('class:subscribe', {}, () => {});
    });
    sock.on('class:session_started', (data) => {
      if (!data?.classId) return;
      // Skip if user has dismissed this specific session for this tab.
      try {
        const dismissed = sessionStorage.getItem(
          `nowTeachingDismissed:${data.sessionId}`
        );
        if (dismissed) return;
      } catch (_) {}
      setActiveSessions((s) => ({
        ...s,
        [data.classId]: {
          roomCode: data.roomCode,
          sessionId: data.sessionId,
          title: data.title,
          subject: data.subject,
          instructorName: data.instructorName,
          curriculumItemId: data.curriculumItemId || null,
        },
      }));
    });
    sock.on('class:session_ended', (data) => {
      if (!data?.classId) return;
      setActiveSessions((s) => {
        const cur = s[data.classId];
        if (!cur || cur.sessionId !== data.sessionId) return s;
        const next = { ...s };
        delete next[data.classId];
        return next;
      });
    });

    return () => {
      try {
        sock.disconnect();
      } catch (_) {}
      socketRef.current = null;
    };
  }, [enabled]);

  const dismiss = (classId) => {
    setActiveSessions((s) => {
      const cur = s[classId];
      if (cur) {
        try {
          sessionStorage.setItem(`nowTeachingDismissed:${cur.sessionId}`, '1');
        } catch (_) {}
      }
      const next = { ...s };
      delete next[classId];
      return next;
    });
  };

  return { activeSessions, dismiss };
}
