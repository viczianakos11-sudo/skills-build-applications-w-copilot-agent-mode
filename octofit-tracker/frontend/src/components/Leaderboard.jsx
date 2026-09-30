import CollectionView from './CollectionView.jsx';
import { displayName } from './format.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

const columns = [
  { key: 'rank', label: 'Rank', render: (_entry, index) => String(index + 1).padStart(2, '0') },
  { key: 'athlete', label: 'Athlete', render: (entry) => displayName(entry.userId) },
  { key: 'period', label: 'Period', render: (entry) => entry.period || 'All time' },
  { key: 'points', label: 'Points', render: (entry) => <strong className="score-value">{entry.points ?? 0}</strong> },
];

export default function Leaderboard() {
  return <CollectionView title="Leaderboard" eyebrow="Community standings" description="Points earned by athletes for the selected scoring period." endpoint={endpoint} columns={columns} />;
}