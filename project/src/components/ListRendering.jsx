// .map() turns an array into JSX — each item needs a unique key prop
const languages = [
  { id: 1, name: 'JavaScript', year: 1995 },
  { id: 2, name: 'Python',     year: 1991 },
  { id: 3, name: 'Rust',       year: 2010 },
]

export default function ListRendering() {
  return (
    <div>
      <p>
        <strong>key</strong> is required — React uses it to track which item changed,
        was added, or was removed. Use a stable unique ID, not the array index.
      </p>
      <ul>
        {languages.map(lang => (
          // key goes on the outermost element returned by map
          <li key={lang.id}>
            <strong>{lang.name}</strong> — created in {lang.year}
          </li>
        ))}
      </ul>
    </div>
  )
}
