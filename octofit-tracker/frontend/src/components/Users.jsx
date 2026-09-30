import CollectionView from './CollectionView.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

const columns = [
  { key: 'displayName', label: 'Athlete', render: (user) => user.displayName || user.username || '—' },
  { key: 'username', label: 'Username', render: (user) => <span className="user-handle">@{user.username}</span> },
  { key: 'email', label: 'Email' },
];

export default function Users() {
  return <CollectionView title="Athletes" eyebrow="Community" description="People showing up and putting in the work." endpoint={endpoint} columns={columns} />;
}