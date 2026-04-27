import React, { useCallback, useEffect, useRef, useState } from 'react';

/**
 * NotificationBell — bell icon with unread badge + dropdown of recent
 * notifications. Polls /api/notifications/unread-count every 60s.
 */

function getApiBase() {
  if (
    typeof window !== 'undefined' &&
    typeof window.API_BASE_URL === 'string'
  ) {
    return window.API_BASE_URL || '';
  }
  return '';
}

function getAuthToken() {
  try {
    return (
      (typeof localStorage !== 'undefined' &&
        localStorage.getItem('appToken')) ||
      ''
    );
  } catch {
    return '';
  }
}

async function apiFetch(path, options = {}) {
  const token = getAuthToken();
  if (!token) throw new Error('not_authenticated');
  const res = await fetch(`${getApiBase()}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function timeAgo(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const sec = Math.max(1, Math.round((Date.now() - d.getTime()) / 1000));
  if (sec < 60) return `${sec}s ago`;
  const min = Math.round(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.round(hr / 24);
  if (day < 7) return `${day}d ago`;
  return d.toLocaleDateString();
}

export default function NotificationBell({ pollIntervalMs = 60000 }) {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef(null);

  const refreshCount = useCallback(async () => {
    try {
      const data = await apiFetch('/api/notifications/unread-count');
      setCount(data?.count || 0);
    } catch {
      // silent
    }
  }, []);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/api/notifications?limit=30');
      setItems(Array.isArray(data?.notifications) ? data.notifications : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Polling for unread count
  useEffect(() => {
    refreshCount();
    const t = setInterval(refreshCount, Math.max(15000, pollIntervalMs));
    return () => clearInterval(t);
  }, [refreshCount, pollIntervalMs]);

  // Click-outside handler
  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) loadItems();
  };

  const markAllRead = async () => {
    try {
      await apiFetch('/api/notifications/mark-read', {
        method: 'POST',
        body: JSON.stringify({ all: true }),
      });
      setItems((prev) =>
        prev.map((n) => ({
          ...n,
          read_at: n.read_at || new Date().toISOString(),
        }))
      );
      setCount(0);
    } catch {
      // ignore
    }
  };

  const markOne = async (id) => {
    try {
      await apiFetch('/api/notifications/mark-read', {
        method: 'POST',
        body: JSON.stringify({ ids: [id] }),
      });
      setItems((prev) =>
        prev.map((n) =>
          n.id === id && !n.read_at
            ? { ...n, read_at: new Date().toISOString() }
            : n
        )
      );
      setCount((c) => Math.max(0, c - 1));
    } catch {
      // ignore
    }
  };

  return (
    <div
      ref={wrapRef}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <button
        type="button"
        onClick={toggle}
        title="Notifications"
        style={{
          position: 'relative',
          background: 'transparent',
          border: '1px solid #cbd5e1',
          borderRadius: 999,
          padding: '6px 10px',
          cursor: 'pointer',
          fontSize: 16,
          color: '#0f172a',
        }}
      >
        <span aria-hidden="true">🔔</span>
        {count > 0 && (
          <span
            style={{
              position: 'absolute',
              top: -4,
              right: -4,
              background: '#dc2626',
              color: '#ffffff',
              fontSize: 11,
              fontWeight: 700,
              minWidth: 18,
              height: 18,
              borderRadius: 999,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 5px',
            }}
          >
            {count > 99 ? '99+' : count}
          </span>
        )}
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: 360,
            maxHeight: 480,
            overflowY: 'auto',
            background: '#ffffff',
            color: '#0f172a',
            border: '1px solid #cbd5e1',
            borderRadius: 12,
            boxShadow: '0 12px 36px rgba(15,23,42,0.18)',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderBottom: '1px solid #e2e8f0',
            }}
          >
            <strong style={{ fontSize: 14 }}>Notifications</strong>
            <button
              type="button"
              onClick={markAllRead}
              disabled={count === 0}
              style={{
                background: 'transparent',
                border: 'none',
                color: count === 0 ? '#94a3b8' : '#0ea5e9',
                cursor: count === 0 ? 'default' : 'pointer',
                fontSize: 12,
                padding: 0,
                textDecoration: 'underline',
              }}
            >
              Mark all read
            </button>
          </div>
          {loading ? (
            <div style={{ padding: 16, color: '#64748b', fontSize: 13 }}>
              Loading…
            </div>
          ) : items.length === 0 ? (
            <div style={{ padding: 16, color: '#64748b', fontSize: 13 }}>
              No notifications yet.
            </div>
          ) : (
            items.map((n) => {
              const unread = !n.read_at;
              return (
                <div
                  key={n.id}
                  onClick={() => unread && markOne(n.id)}
                  style={{
                    display: 'block',
                    padding: '10px 14px',
                    borderBottom: '1px solid #f1f5f9',
                    background: unread ? '#eff6ff' : '#ffffff',
                    cursor: unread ? 'pointer' : 'default',
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{n.title}</div>
                  {n.body && (
                    <div
                      style={{ fontSize: 12, color: '#475569', marginTop: 2 }}
                    >
                      {n.body}
                    </div>
                  )}
                  <div
                    style={{
                      fontSize: 11,
                      color: '#94a3b8',
                      marginTop: 4,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{n.type?.replace(/_/g, ' ') || ''}</span>
                    <span>{timeAgo(n.created_at)}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
