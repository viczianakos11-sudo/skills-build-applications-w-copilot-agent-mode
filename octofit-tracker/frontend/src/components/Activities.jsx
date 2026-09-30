import CollectionView from './CollectionView.jsx';
import { displayName, formatDate } from './format.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

const columns = [
  { key: 'user', label: 'Athlete', render: (activity) => displayName(activity.userId) },
  { key: 'type', label: 'Activity', render: (activity) => <span className="activity-type">{activity.type}</span> },
  { key: 'duration', label: 'Duration', render: (activity) => `${activity.durationMinutes} min` },
  { key: 'distance', label: 'Distance', render: (activity) => activity.distanceKm ? `${activity.distanceKm} km` : '—' },
  { key: 'points', label: 'Points', render: (activity) => <strong>{activity.points ?? 0}</strong> },
  { key: 'date', label: 'Date', render: (activity) => formatDate(activity.occurredAt) },
];

export default function Activities() {
  return <CollectionView title="Activities" eyebrow="Movement log" description="Recent training sessions across your community." endpoint={endpoint} columns={columns} />;
}