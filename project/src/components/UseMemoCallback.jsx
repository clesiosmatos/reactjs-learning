import { useState, useMemo, useCallback, memo, useRef } from 'react';

// ---------------------------------------------------------------------------
// Shared data
// ---------------------------------------------------------------------------
const PRODUCTS = Array.from({ length: 2_000 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Math.floor(((i * 37 + 13) % 90) + 10),
  inStock: i % 3 !== 0,
}));

// ---------------------------------------------------------------------------
// Render counter helper — shows how many times a component has re-rendered
// ---------------------------------------------------------------------------
function useRenderCount(label) {
  const count = useRef(0);
  count.current += 1;
  return count.current;
}

// ---------------------------------------------------------------------------
// Demo 1 — useMemo
//
// Parent re-renders on every clock tick.
// Without useMemo: the expensive filter+sort runs on every tick.
// With useMemo: it only runs when `query` or `onlyInStock` changes.
// ---------------------------------------------------------------------------

function expensiveFilter(products, query, onlyInStock) {
  // Simulate heavy computation — iterate twice to make the cost visible
  let result = products.filter(p =>
    (!onlyInStock || p.inStock) &&
    p.name.toLowerCase().includes(query.toLowerCase())
  );
  result = result.sort((a, b) => a.price - b.price);
  return result;
}

export function UseMemoDemo() {
  const [query, setQuery] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [tick, setTick] = useState(0);     // simulates an unrelated parent re-render
  const [memoOn, setMemoOn] = useState(true);

  // Track how many times the filter actually ran
  const filterRunCount = useRef(0);

  const filteredWithMemo = useMemo(() => {
    if (memoOn) filterRunCount.current += 1;
    return expensiveFilter(PRODUCTS, query, onlyInStock);
  }, [query, onlyInStock, memoOn]);

  const filteredWithout = (() => {
    if (!memoOn) filterRunCount.current += 1;
    return expensiveFilter(PRODUCTS, query, onlyInStock);
  })();

  const filtered = memoOn ? filteredWithMemo : filteredWithout;

  return (
    <div>
      <p>
        The parent re-renders every time you click "Force re-render". Without{' '}
        <code>useMemo</code>, the filter over {PRODUCTS.length.toLocaleString()}{' '}
        products runs on every re-render even when the search didn't change.
        Toggle it off and click the button to feel the difference.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem', alignItems: 'center' }}>
        <input
          value={query}
          onChange={e => { filterRunCount.current = 0; setQuery(e.target.value); }}
          placeholder="Search products…"
          style={{ padding: '0.3rem 0.5rem' }}
        />
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <input type="checkbox" checked={onlyInStock} onChange={e => setOnlyInStock(e.target.checked)} />
          In stock only
        </label>
        <button onClick={() => setTick(t => t + 1)}>
          Force re-render ({tick})
        </button>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <input type="checkbox" checked={memoOn} onChange={e => { filterRunCount.current = 0; setMemoOn(e.target.checked); }} />
          <code>useMemo</code> on
        </label>
      </div>

      <p style={{ fontSize: '0.85rem', color: memoOn ? 'green' : '#c00', margin: '0 0 0.5rem' }}>
        Filter ran <strong>{filterRunCount.current}</strong> time(s) since last reset.
        {memoOn
          ? ' ✓ Only runs when query or checkbox changes.'
          : ' ✗ Runs on every re-render, including unrelated ticks.'}
      </p>

      <p style={{ margin: '0 0 0.4rem', fontSize: '0.85rem' }}>
        Showing <strong>{filtered.length}</strong> results
      </p>
      <ul style={{ maxHeight: 140, overflowY: 'auto', padding: '0 0 0 1.2rem', margin: 0 }}>
        {filtered.slice(0, 30).map(p => (
          <li key={p.id}>{p.name} — ${p.price} {p.inStock ? '' : '(out of stock)'}</li>
        ))}
        {filtered.length > 30 && <li style={{ color: '#888' }}>…and {filtered.length - 30} more</li>}
      </ul>

      <details style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#555' }}>
        <summary>Node.js analogy</summary>
        <p style={{ marginTop: '0.4rem' }}>
          <code>useMemo</code> is like module-level caching — compute once, reuse
          until the inputs change. The dependency array is the cache key.
        </p>
      </details>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Demo 2 — useCallback + React.memo
//
// Shows why a new function reference on every render breaks React.memo,
// and how useCallback fixes it.
// ---------------------------------------------------------------------------

// Memoised child — only re-renders when its props change
const ProductRow = memo(function ProductRow({ product, onAdd }) {
  const renders = useRenderCount();
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0.2rem 0', borderBottom: '1px solid #f0f0f0',
      background: renders > 1 ? `rgba(255,200,0,${Math.min((renders - 1) * 0.12, 0.5)})` : 'transparent',
      transition: 'background 0.3s',
    }}>
      <span style={{ fontSize: '0.88rem' }}>{product.name} — ${product.price}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.75rem', color: '#888' }}>renders: {renders}</span>
        <button onClick={() => onAdd(product)} style={{ fontSize: '0.8rem', padding: '0.1rem 0.4rem' }}>
          Add
        </button>
      </span>
    </div>
  );
});

export function UseCallbackDemo() {
  const [cart, setCart] = useState([]);
  const [tick, setTick] = useState(0);
  const [callbackOn, setCallbackOn] = useState(true);

  // With useCallback: stable reference — ProductRow never re-renders due to this
  const handleAddMemo = useCallback((product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  }, []); // empty deps — setCart is stable, never changes

  // Without useCallback: new function on every render — breaks React.memo
  const handleAddPlain = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleAdd = callbackOn ? handleAddMemo : handleAddPlain;
  const displayed = PRODUCTS.slice(0, 8);

  return (
    <div>
      <p>
        Each row is wrapped in <code>React.memo</code> — it should only re-render
        when its own props change. But if the parent passes a{' '}
        <strong>new function reference</strong> every render, <code>React.memo</code>{' '}
        sees a changed prop and re-renders anyway.{' '}
        <code>useCallback</code> keeps the reference stable.
      </p>
      <p style={{ fontSize: '0.85rem', color: '#666', margin: '0 0 0.75rem' }}>
        Yellow rows re-rendered. Toggle <code>useCallback</code> off, then click
        "Force re-render" to see all rows light up.
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem', alignItems: 'center' }}>
        <button onClick={() => setTick(t => t + 1)}>Force re-render ({tick})</button>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <input type="checkbox" checked={callbackOn} onChange={e => setCallbackOn(e.target.checked)} />
          <code>useCallback</code> on
        </label>
        {callbackOn
          ? <span style={{ fontSize: '0.85rem', color: 'green' }}>✓ Stable reference — rows skip re-render</span>
          : <span style={{ fontSize: '0.85rem', color: '#c00' }}>✗ New function each render — rows always re-render</span>
        }
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        {displayed.map(p => (
          <ProductRow key={p.id} product={p} onAdd={handleAdd} />
        ))}
      </div>

      {cart.length > 0 && (
        <div style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}>
          <strong>Cart:</strong>{' '}
          {cart.map(i => `${i.name} ×${i.qty}`).join(', ')}
        </div>
      )}

      <details style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#555' }}>
        <summary>The full picture — when does this actually matter?</summary>
        <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '0.5rem' }}>
          <thead>
            <tr style={{ background: '#f0f0f0' }}>
              <th style={{ padding: '0.3rem 0.6rem', textAlign: 'left' }}>Situation</th>
              <th style={{ padding: '0.3rem 0.6rem', textAlign: 'left' }}>Use it?</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['List with ~10 items, simple render', 'No — overhead not worth it'],
              ['List with 100+ items or heavy DOM', 'Yes — useMemo + React.memo'],
              ['Function passed to React.memo child', 'Yes — useCallback'],
              ['Function in useEffect deps array', 'Yes — avoids infinite loops'],
              ['Everything, "just in case"', 'No — memoisation has its own cost'],
            ].map(([s, u], i) => (
              <tr key={i} style={{ background: i % 2 ? '#fafafa' : 'white' }}>
                <td style={{ padding: '0.3rem 0.6rem' }}>{s}</td>
                <td style={{ padding: '0.3rem 0.6rem' }}>{u}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ marginTop: '0.5rem' }}>
          React team's guidance: <strong>profile first, optimise second.</strong>
        </p>
      </details>
    </div>
  );
}
