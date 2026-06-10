import { useState } from 'react';

// ---------------------------------------------------------------------------
// Demo 1 — The core pattern from the lesson
//
// Display and Controls are siblings. Neither talks to the other.
// The parent owns the single source of truth and passes down:
//   - the value  → to whoever reads it
//   - the setter → to whoever changes it
// ---------------------------------------------------------------------------

function Display({ count }) {
  return (
    <p style={{ fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0', color: '#0066cc' }}>
      Count: {count}
    </p>
  );
}

function Controls({ onIncrement, onDecrement, onReset }) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <button onClick={onDecrement}>−</button>
      <button onClick={onIncrement}>+</button>
      <button onClick={onReset} style={{ background: '#f0f0f0' }}>Reset</button>
    </div>
  );
}

export function SplitCounterDemo() {
  // State lives here — the lowest common ancestor of Display and Controls
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>
        <code>Display</code> and <code>Controls</code> are siblings — they can't
        talk to each other directly. The parent holds the state and passes the
        value down to the reader and the setter down to the writer.
      </p>

      <div style={{ background: '#f9f9f9', border: '1px solid #e0e0e0', borderRadius: 6, padding: '1rem', display: 'inline-block' }}>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', color: '#888', fontFamily: 'monospace' }}>
          &lt;Parent&gt; — owns state
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1rem', borderLeft: '3px solid #cce' }}>
          <div style={{ background: '#eef4ff', borderRadius: 4, padding: '0.5rem 0.75rem', fontSize: '0.8rem', color: '#555', fontFamily: 'monospace' }}>
            &lt;Display count={'{count}'} /&gt;
            <Display count={count} />
          </div>

          <div style={{ background: '#eef4ff', borderRadius: 4, padding: '0.5rem 0.75rem', fontSize: '0.8rem', color: '#555', fontFamily: 'monospace' }}>
            &lt;Controls onIncrement onDecrement onReset /&gt;
            <Controls
              onIncrement={() => setCount(c => c + 1)}
              onDecrement={() => setCount(c => c - 1)}
              onReset={() => setCount(0)}
            />
          </div>
        </div>
      </div>

      <details style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#555' }}>
        <summary>Backend analogy</summary>
        <p style={{ marginTop: '0.4rem' }}>
          Think of the parent as a service layer that owns the database row.
          The child components are route handlers — they can read or update the
          resource, but the data itself lives in one place. Neither handler
          holds a local copy; they go through the service.
        </p>
      </details>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Demo 2 — Problem vs solution: local state causes sibling de-sync
//
// Two "wishlist" panels. In the "broken" version each panel has its own
// local item count — clicking Add in one panel doesn't affect the other,
// even though they're supposed to reflect the same cart.
// In the "fixed" version the count lives in the parent and both panels
// stay in sync.
// ---------------------------------------------------------------------------

function WishlistPanel({ label, count, onAdd, onRemove }) {
  return (
    <div style={{
      border: '1px solid #ddd', borderRadius: 6, padding: '0.75rem',
      flex: 1, minWidth: 140,
    }}>
      <p style={{ margin: '0 0 0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>{label}</p>
      <p style={{ margin: '0 0 0.6rem', fontSize: '1.5rem', fontWeight: 700, color: '#0066cc' }}>
        {count} items
      </p>
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        <button onClick={onAdd}    style={{ fontSize: '0.8rem' }}>Add</button>
        <button onClick={onRemove} style={{ fontSize: '0.8rem' }} disabled={count === 0}>Remove</button>
      </div>
    </div>
  );
}

function BrokenWishlists() {
  // Each panel holds its OWN state — they can never agree
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <WishlistPanel label="Panel A (local)" count={countA}
        onAdd={() => setCountA(c => c + 1)} onRemove={() => setCountA(c => Math.max(0, c - 1))} />
      <WishlistPanel label="Panel B (local)" count={countB}
        onAdd={() => setCountB(c => c + 1)} onRemove={() => setCountB(c => Math.max(0, c - 1))} />
    </div>
  );
}

function FixedWishlists() {
  // ONE count lifted to the parent — both panels always agree
  const [count, setCount] = useState(0);
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <WishlistPanel label="Panel A (lifted)" count={count}
        onAdd={() => setCount(c => c + 1)} onRemove={() => setCount(c => Math.max(0, c - 1))} />
      <WishlistPanel label="Panel B (lifted)" count={count}
        onAdd={() => setCount(c => c + 1)} onRemove={() => setCount(c => Math.max(0, c - 1))} />
    </div>
  );
}

export function LocalVsLiftedDemo() {
  return (
    <div>
      <p>
        When siblings each hold their own copy of the same data, they diverge.
        Lift the state to their common parent and both panels always reflect the
        same truth.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <p style={{ margin: '0 0 0.4rem', fontWeight: 600, color: '#c00', fontSize: '0.9rem' }}>
            Broken — each panel has its own local state
          </p>
          <BrokenWishlists />
          <p style={{ margin: '0.4rem 0 0', fontSize: '0.82rem', color: '#888' }}>
            Add items in Panel A — Panel B doesn't know. They're out of sync.
          </p>
        </div>

        <div>
          <p style={{ margin: '0 0 0.4rem', fontWeight: 600, color: 'green', fontSize: '0.9rem' }}>
            Fixed — state lifted to parent, passed down as props
          </p>
          <FixedWishlists />
          <p style={{ margin: '0.4rem 0 0', fontSize: '0.82rem', color: '#888' }}>
            Both panels read and write the same value — always in sync.
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Demo 3 — Lowest common ancestor rule in a real UI
//
// A search filter shared by a SearchBar and a ResultsList.
// Neither component is an ancestor of the other, so the filter lives in
// their common parent — the smallest scope that covers both.
// ---------------------------------------------------------------------------

const ITEMS = [
  { id: 1, name: 'React', category: 'Frontend' },
  { id: 2, name: 'Node.js', category: 'Backend' },
  { id: 3, name: 'PostgreSQL', category: 'Database' },
  { id: 4, name: 'Redis', category: 'Database' },
  { id: 5, name: 'TypeScript', category: 'Language' },
  { id: 6, name: 'Next.js', category: 'Frontend' },
  { id: 7, name: 'Express', category: 'Backend' },
  { id: 8, name: 'GraphQL', category: 'API' },
];

function SearchBar({ query, onQueryChange }) {
  return (
    <div style={{ marginBottom: '0.5rem' }}>
      <input
        value={query}
        onChange={e => onQueryChange(e.target.value)}
        placeholder="Search technologies…"
        style={{ padding: '0.35rem 0.6rem', width: '100%', boxSizing: 'border-box' }}
      />
      <p style={{ margin: '0.2rem 0 0', fontSize: '0.78rem', color: '#888' }}>
        &lt;SearchBar&gt; — writes the query via onQueryChange prop
      </p>
    </div>
  );
}

function ResultsList({ query }) {
  const results = ITEMS.filter(i =>
    i.name.toLowerCase().includes(query.toLowerCase()) ||
    i.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <p style={{ margin: '0 0 0.3rem', fontSize: '0.78rem', color: '#888' }}>
        &lt;ResultsList&gt; — reads the query via prop, {results.length} result(s)
      </p>
      <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
        {results.map(i => (
          <li key={i.id} style={{ fontSize: '0.9rem' }}>
            {i.name} <span style={{ color: '#888', fontSize: '0.8rem' }}>({i.category})</span>
          </li>
        ))}
        {results.length === 0 && <li style={{ color: '#888' }}>No results</li>}
      </ul>
    </div>
  );
}

export function LowestAncestorDemo() {
  // query lives here — the lowest component that is an ancestor of BOTH SearchBar and ResultsList
  const [query, setQuery] = useState('');

  return (
    <div>
      <p>
        <code>SearchBar</code> writes; <code>ResultsList</code> reads. They're siblings,
        so the <code>query</code> string must live in their common parent — no lower.
        This is the "lowest common ancestor" rule.
      </p>

      <div style={{ border: '1px solid #ddd', borderRadius: 6, padding: '0.75rem' }}>
        <p style={{ margin: '0 0 0.6rem', fontSize: '0.78rem', color: '#888', fontFamily: 'monospace' }}>
          &lt;Parent&gt; — owns query: "{query}"
        </p>
        <SearchBar query={query} onQueryChange={setQuery} />
        <ResultsList query={query} />
      </div>

      <details style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#555' }}>
        <summary>The rule of thumb</summary>
        <p style={{ marginTop: '0.4rem' }}>
          Put state in the <strong>lowest component</strong> that is an ancestor
          of every component that needs it. Too low → siblings can't share it.
          Too high → unrelated components re-render on every change.
        </p>
      </details>
    </div>
  );
}
