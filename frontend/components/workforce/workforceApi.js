function getApiBase() {
  if (
    typeof window !== 'undefined' &&
    typeof window.API_BASE_URL === 'string'
  ) {
    return window.API_BASE_URL || '';
  }
  return '';
}

export function getWorkforceAuthToken() {
  try {
    return (
      (typeof localStorage !== 'undefined' &&
        (localStorage.getItem('appToken') || localStorage.getItem('token'))) ||
      ''
    );
  } catch {
    return '';
  }
}

export function hasWorkforceAuth() {
  return !!getWorkforceAuthToken();
}

export async function workforceApiFetch(path, options = {}) {
  const token = getWorkforceAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${getApiBase()}${path}`, {
    ...options,
    headers,
  });

  const text = await res.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { text };
    }
  }

  if (!res.ok) {
    const err = new Error(
      data?.error || data?.message || `${path} returned ${res.status}`
    );
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export function fetchWorkforceOverview() {
  return workforceApiFetch('/api/workforce/overview');
}

export function createWorkforcePlan(payload = {}) {
  return workforceApiFetch('/api/workforce/plans', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateWorkforceMilestone(planId, milestoneId, payload = {}) {
  return workforceApiFetch(
    `/api/workforce/plans/${encodeURIComponent(planId)}/milestones/${encodeURIComponent(
      milestoneId
    )}`,
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }
  );
}

export function logWorkforceActivity(payload = {}) {
  return workforceApiFetch('/api/workforce/activity', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
