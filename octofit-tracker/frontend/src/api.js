export async function fetchCollection(endpoint, signal) {
  const response = await fetch(endpoint, { signal });
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.error || `Request failed (${response.status})`);
  }

  if (Array.isArray(payload)) return payload;

  const collection = [payload?.results, payload?.data, payload?.items].find(Array.isArray);
  return collection || [];
}