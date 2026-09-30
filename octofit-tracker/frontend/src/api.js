const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export async function fetchCollection(resource, signal) {
  const response = await fetch(`${API_BASE_URL}/${resource}/`, { signal });
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.error || `Request failed (${response.status})`);
  }

  if (Array.isArray(payload)) return payload;

  const collection = [payload?.results, payload?.data, payload?.items].find(Array.isArray);
  return collection || [];
}