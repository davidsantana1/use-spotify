export default function Search({ query, onSetQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
      className="input-field"
      type="text"
      placeholder="Search your favorite song"
    />
  );
}
