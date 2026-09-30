import CollectionView from './CollectionView.jsx';

const columns = [
  { key: 'displayName', label: 'Athlete', render: (user) => user.displayName || user.username || '—' },
  { key: 'username', label: 'Username', render: (user) => <span className="user-handle">@{user.username}</span> },
  { key: 'email', label: 'Email' },
];

export default function Users() {
  return <CollectionView title="Athletes" eyebrow="Community" description="People showing up and putting in the work." resource="users" columns={columns} />;
}