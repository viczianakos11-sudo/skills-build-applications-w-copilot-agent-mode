import CollectionView from './CollectionView.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

const columns = [
  { key: 'title', label: 'Workout' },
  { key: 'activityType', label: 'Activity', render: (workout) => <span className="activity-type">{workout.activityType}</span> },
  { key: 'level', label: 'Level' },
  { key: 'durationMinutes', label: 'Duration', render: (workout) => `${workout.durationMinutes} min` },
  { key: 'description', label: 'Details', render: (workout) => workout.description || '—' },
];

export default function Workouts() {
  return <CollectionView title="Workouts" eyebrow="Training library" description="A practical starting point for your next session." endpoint={endpoint} columns={columns} />;
}