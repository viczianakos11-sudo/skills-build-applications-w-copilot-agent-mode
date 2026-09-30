import { useCollection } from './useCollection.js';

export default function CollectionView({ title, eyebrow, description, endpoint, columns }) {
  const { items, loading, error } = useCollection(endpoint);

  return (
    <section className="collection-page" aria-labelledby="page-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 id="page-title">{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <div className="record-count" aria-live="polite">
          <span className="count-number">{loading ? '…' : items.length}</span>
          <span>records</span>
        </div>
      </div>

      <div className="table-frame">
        {loading && <p className="table-message" role="status">Loading {title.toLowerCase()}…</p>}
        {error && <p className="table-message error-message" role="alert">{error}</p>}
        {!loading && !error && items.length === 0 && (
          <p className="table-message">No {title.toLowerCase()} to show yet.</p>
        )}
        {!loading && !error && items.length > 0 && (
          <div className="table-responsive">
            <table className="table align-middle mb-0 data-table">
              <thead>
                <tr>{columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}</tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item._id || item.id || `${endpoint}-${index}`}>
                    {columns.map((column) => (
                      <td key={column.key}>{column.render ? column.render(item, index) : item[column.key] || '—'}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}