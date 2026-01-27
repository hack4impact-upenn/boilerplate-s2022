const DEFAULT_BACKEND = 'http://localhost:4000';

export const API_BASE =
  (import.meta.env.VITE_BACKEND_URL as string | undefined) || DEFAULT_BACKEND;

export const API_PREFIX = `${API_BASE}/api`;

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const data = await response.json();
      if (data && typeof data.message === 'string') {
        message = data.message;
      }
    } catch {
      // noop
    }
    throw new Error(message);
  }
  return response.json() as Promise<T>;
}

export async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_PREFIX}/${path}`, {
    credentials: 'include',
  });
  return handleResponse<T>(response);
}

export async function postJson<T>(path: string, payload: unknown): Promise<T> {
  const response = await fetch(`${API_PREFIX}/${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return handleResponse<T>(response);
}
