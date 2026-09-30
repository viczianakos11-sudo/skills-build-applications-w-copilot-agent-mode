import CollectionView from './CollectionView.jsx';

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'description', label: 'About', render: (team) => team.description || '—' },
  { key: 'members', label: 'Members', render: (team) => team.members?.length ?? 0 },
];

export default function Teams() {
  return <CollectionView title="Teams" eyebrow="Find your people" description="Groups building momentum together." resource="teams" columns={columns} />;
}