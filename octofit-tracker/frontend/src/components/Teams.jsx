import CollectionView from './CollectionView.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'description', label: 'About', render: (team) => team.description || '—' },
  { key: 'members', label: 'Members', render: (team) => team.members?.length ?? 0 },
];

export default function Teams() {
  return <CollectionView title="Teams" eyebrow="Find your people" description="Groups building momentum together." endpoint={endpoint} columns={columns} />;
}