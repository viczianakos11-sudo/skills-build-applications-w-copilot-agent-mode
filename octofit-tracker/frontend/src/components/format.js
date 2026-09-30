export function displayName(value) {
  if (!value) return '—';
  if (typeof value === 'object') return value.displayName || value.username || value.name || '—';
  return value;
}

export function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? '—'
    : new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}