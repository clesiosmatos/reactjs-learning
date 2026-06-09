import { useReducer } from 'react';

// ---------------------------------------------------------------------------
// Demo 1 — Basic counter
// Shows the mechanics: reducer, dispatch, action shape
// ---------------------------------------------------------------------------

const counterInitial = { count: 0, step: 1 };

function counterReducer(state, action) {
  switch (action.type) {
    case 'increment': return { ...state, count: state.count + state.step };
    case 'decrement': return { ...state, count: state.count - state.step };
    case 'setStep':   return { ...state, step: action.payload };
    case 'reset':     return counterInitial;
    default: throw new Error(`Unknown action: ${action.type}`);
  }
}

export function CounterDemo() {
  const [state, dispatch] = useReducer(counterReducer, counterInitial);

  return (
    <div>
      <p>
        The reducer is a <strong>pure function</strong> outside the component —
        it takes current state + an action and returns next state. The component
        only calls <code>dispatch</code>.
      </p>

      <p style={{ fontSize: '1.1rem', margin: '0.75rem 0' }}>
        Count: <strong>{state.count}</strong> &nbsp;(step: {state.step})
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button onClick={() => dispatch({ type: 'increment' })}>+ increment</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>− decrement</button>
        {[1, 5, 10].map(n => (
          <button key={n} onClick={() => dispatch({ type: 'setStep', payload: n })}>
            step = {n}
          </button>
        ))}
        <button onClick={() => dispatch({ type: 'reset' })}>reset</button>
      </div>

      <details style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#555' }}>
        <summary>Node.js analogy</summary>
        <p style={{ marginTop: '0.5rem' }}>
          This is the <strong>event sourcing / command pattern</strong>. An
          action is an event, the reducer is the handler, and the state is what
          gets updated. If you've worked with a message queue or Redux, this is
          exactly the same mental model.
        </p>
      </details>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Demo 2 — Signup form
// Problem solved: atomic state transitions.
// loading: true AND error: null must happen in one render, not two setState calls.
// ---------------------------------------------------------------------------

const formInitial = { name: '', email: '', loading: false, error: null, submitted: false };

function formReducer(state, action) {
  switch (action.type) {
    case 'setField':
      return { ...state, [action.field]: action.value };
    case 'submit':
      return { ...state, loading: true, error: null };
    case 'success':
      return { ...formInitial, submitted: true };
    case 'error':
      return { ...state, loading: false, error: action.message };
    default: throw new Error(`Unknown action: ${action.type}`);
  }
}

function fakeApiSignup(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!data.email.includes('@')) reject(new Error('Invalid email address'));
      else resolve();
    }, 800);
  });
}

export function SignupFormDemo() {
  const [state, dispatch] = useReducer(formReducer, formInitial);

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: 'submit' });
    try {
      await fakeApiSignup(state);
      dispatch({ type: 'success' });
    } catch (err) {
      dispatch({ type: 'error', message: err.message });
    }
  }

  if (state.submitted) {
    return (
      <div>
        <p style={{ color: 'green' }}>Signed up successfully!</p>
        <button onClick={() => dispatch({ type: 'reset' })}>Try again</button>
      </div>
    );
  }

  return (
    <div>
      <p>
        With plain <code>useState</code> you'd have 5 separate setters that can
        get out of sync. Here, one <code>dispatch</code> atomically transitions
        all fields together — one render, no flash of stale state.
      </p>
      <p style={{ fontSize: '0.85rem', color: '#666', margin: '0 0 0.75rem' }}>
        Use an invalid email (no @) to trigger the error path.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: 320 }}>
        <input
          placeholder="Name"
          value={state.name}
          onChange={e => dispatch({ type: 'setField', field: 'name', value: e.target.value })}
          style={{ padding: '0.3rem 0.5rem' }}
        />
        <input
          placeholder="Email"
          value={state.email}
          onChange={e => dispatch({ type: 'setField', field: 'email', value: e.target.value })}
          style={{ padding: '0.3rem 0.5rem' }}
        />
        {state.error && <p style={{ color: 'red', margin: 0, fontSize: '0.9rem' }}>{state.error}</p>}
        <button type="submit" disabled={state.loading} style={{ padding: '0.4rem' }}>
          {state.loading ? 'Saving…' : 'Sign up'}
        </button>
      </form>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Demo 3 — Shopping cart
// Problem solved: business logic in one place.
// "If item already exists, increment qty" lives in the reducer, not the component.
// ---------------------------------------------------------------------------

const PRODUCTS = [
  { id: 1, name: 'React T-Shirt', price: 25 },
  { id: 2, name: 'Node.js Mug',   price: 15 },
  { id: 3, name: 'TypeScript Cap', price: 20 },
];

function cartReducer(state, action) {
  switch (action.type) {
    case 'addItem': {
      const exists = state.find(i => i.id === action.item.id);
      if (exists) {
        return state.map(i =>
          i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...state, { ...action.item, qty: 1 }];
    }
    case 'removeItem':
      return state.filter(i => i.id !== action.id);
    case 'clearCart':
      return [];
    default: throw new Error(`Unknown action: ${action.type}`);
  }
}

export function ShoppingCartDemo() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div>
      <p>
        The "if item exists, increment qty; else add it" logic lives entirely in
        the reducer. Any component that dispatches <code>addItem</code> gets the
        exact same behavior — no duplication.
      </p>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ minWidth: 200 }}>
          <strong>Products</strong>
          {PRODUCTS.map(p => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
              <span>{p.name} — ${p.price}</span>
              <button onClick={() => dispatch({ type: 'addItem', item: p })} style={{ marginLeft: '0.5rem' }}>
                Add
              </button>
            </div>
          ))}
        </div>

        <div style={{ minWidth: 220 }}>
          <strong>Cart</strong>
          {cart.length === 0 && <p style={{ color: '#888', margin: '0.4rem 0 0' }}>Empty</p>}
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
              <span>{item.name} × {item.qty}</span>
              <button onClick={() => dispatch({ type: 'removeItem', id: item.id })} style={{ marginLeft: '0.5rem' }}>
                Remove
              </button>
            </div>
          ))}
          {cart.length > 0 && (
            <div style={{ marginTop: '0.75rem', borderTop: '1px solid #ddd', paddingTop: '0.5rem' }}>
              <strong>Total: ${total}</strong>
              <button onClick={() => dispatch({ type: 'clearCart' })} style={{ marginLeft: '1rem' }}>
                Clear cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
