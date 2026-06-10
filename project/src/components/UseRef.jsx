import { useState, useRef, useEffect } from 'react';

// ---------------------------------------------------------------------------
// Demo 1 — DOM access
//
// useRef gives you a direct handle to a DOM node without going through state.
// React sets ref.current to the element after it mounts.
// ---------------------------------------------------------------------------

export function UseRefDomDemo() {
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  function scrollToBottom() {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div>
      <p>
        Attach a ref to any DOM element with <code>ref={'{'}myRef{'}'}</code>.
        React sets <code>myRef.current</code> to the real DOM node after mount —
        letting you call native DOM APIs directly without touching state.
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        <input
          ref={inputRef}
          placeholder="Click the button to focus me"
          style={{ padding: '0.3rem 0.5rem', flex: 1, minWidth: 180 }}
        />
        <button onClick={focusInput}>Focus input</button>
        <button onClick={scrollToBottom}>Scroll to bottom ↓</button>
      </div>

      {/* Spacer to make scrolling visible */}
      <div style={{ height: 120, overflowY: 'auto', border: '1px solid #eee', borderRadius: 4, padding: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
        {Array.from({ length: 10 }, (_, i) => (
          <p key={i} style={{ margin: '0.2rem 0' }}>Line {i + 1} — scroll down to see the ref target</p>
        ))}
        <p ref={bottomRef} style={{ margin: '0.2rem 0', color: '#0066cc', fontWeight: 600 }}>
          ← This element is the ref target (scrollIntoView)
        </p>
      </div>

      <details style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#555' }}>
        <summary>Node.js analogy</summary>
        <p style={{ marginTop: '0.4rem' }}>
          Think of <code>ref.current</code> like a file descriptor — once you have it
          you can call OS-level operations directly, bypassing the abstraction layer
          (React's virtual DOM).
        </p>
      </details>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Demo 2 — Mutable value that does NOT trigger a re-render
//
// Key insight: changing ref.current is invisible to React.
// Use it when you need to remember a value across renders but don't want
// the component to repaint because of it (e.g., render counters, timers,
// previous-value tracking).
// ---------------------------------------------------------------------------

export function UseRefMutableDemo() {
  const [stateCount, setStateCount] = useState(0);
  const refCount = useRef(0);
  const renderCount = useRef(0);
  renderCount.current += 1;

  function incrementState() {
    setStateCount(c => c + 1); // triggers re-render
  }

  function incrementRef() {
    refCount.current += 1;     // mutates silently — no re-render
    // force a render just to make the new value visible in this demo
  }

  function forceRender() {
    setStateCount(c => c);     // same value → still triggers re-render so we can read refCount
  }

  return (
    <div>
      <p>
        <code>useState</code> schedules a re-render every time you call the setter.
        <code> useRef</code> just mutates a plain object — React never knows it changed,
        so no re-render happens. Click "Increment ref" several times, then click
        "Read ref" to reveal the real count.
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={incrementState}>Increment state</button>
        <button onClick={incrementRef}>Increment ref (silent)</button>
        <button onClick={forceRender} style={{ background: '#f0f0f0' }}>Read ref (force render)</button>
      </div>

      <table style={{ borderCollapse: 'collapse', fontSize: '0.9rem', width: '100%' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th style={{ padding: '0.3rem 0.8rem', textAlign: 'left' }}>Value</th>
            <th style={{ padding: '0.3rem 0.8rem', textAlign: 'left' }}>Source</th>
            <th style={{ padding: '0.3rem 0.8rem', textAlign: 'left' }}>Re-renders?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '0.3rem 0.8rem' }}><strong>{stateCount}</strong></td>
            <td style={{ padding: '0.3rem 0.8rem' }}><code>useState</code></td>
            <td style={{ padding: '0.3rem 0.8rem', color: '#c00' }}>Yes — on every setter call</td>
          </tr>
          <tr style={{ background: '#fafafa' }}>
            <td style={{ padding: '0.3rem 0.8rem' }}><strong>{refCount.current}</strong></td>
            <td style={{ padding: '0.3rem 0.8rem' }}><code>useRef</code></td>
            <td style={{ padding: '0.3rem 0.8rem', color: 'green' }}>No — only visible after next render</td>
          </tr>
          <tr>
            <td style={{ padding: '0.3rem 0.8rem' }}><strong>{renderCount.current}</strong></td>
            <td style={{ padding: '0.3rem 0.8rem' }}>render counter (ref)</td>
            <td style={{ padding: '0.3rem 0.8rem', color: '#666' }}>— (how many times this component rendered)</td>
          </tr>
        </tbody>
      </table>

      <details style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#555' }}>
        <summary>When should I pick ref over state?</summary>
        <ul style={{ marginTop: '0.4rem', paddingLeft: '1.2rem' }}>
          <li>The value is only needed <em>inside event handlers or effects</em>, not in JSX.</li>
          <li>You're storing a timer ID, interval ID, or WebSocket instance.</li>
          <li>You want to track render counts without causing an infinite loop.</li>
          <li>You need the latest value of a prop/state inside a stale closure (see Demo 3).</li>
        </ul>
      </details>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Demo 3 — Stopwatch: interval ID + latest-value ref pattern
//
// Two problems solved with refs:
//   a) Store the interval ID so we can clearInterval on Stop.
//   b) Keep a "latest elapsed" ref so the interval callback always reads the
//      current value instead of a stale closure capture.
// ---------------------------------------------------------------------------

export function UseRefStopwatchDemo() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  // Holds the setInterval return value — changing it must NOT trigger a re-render
  const intervalRef = useRef(null);

  // Always points to the latest elapsed value — avoids stale closures in the interval
  const elapsedRef = useRef(0);

  useEffect(() => {
    elapsedRef.current = elapsed;
  }, [elapsed]);

  function start() {
    if (running) return;
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setElapsed(e => e + 10); // 10 ms per tick
    }, 10);
  }

  function stop() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setRunning(false);
  }

  function reset() {
    stop();
    setElapsed(0);
    elapsedRef.current = 0;
  }

  const ms = elapsed % 1000;
  const s  = Math.floor(elapsed / 1000) % 60;
  const m  = Math.floor(elapsed / 60_000);

  const pad = (n, len = 2) => String(n).padStart(len, '0');

  return (
    <div>
      <p>
        A stopwatch needs to store the <code>setInterval</code> return value so it can
        call <code>clearInterval</code> later. That ID belongs in a ref — storing it in
        state would waste a re-render and could introduce timing bugs.
      </p>

      <div style={{
        fontFamily: 'monospace',
        fontSize: '2.5rem',
        letterSpacing: 2,
        margin: '0.5rem 0 1rem',
        color: running ? '#0066cc' : '#333',
      }}>
        {pad(m)}:{pad(s)}.{pad(ms, 3)}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button onClick={start}  disabled={running}  style={{ minWidth: 70 }}>Start</button>
        <button onClick={stop}   disabled={!running} style={{ minWidth: 70 }}>Stop</button>
        <button onClick={reset}                       style={{ minWidth: 70 }}>Reset</button>
      </div>

      <div style={{ fontSize: '0.85rem', color: '#555', background: '#f8f8f8', padding: '0.6rem 0.8rem', borderRadius: 4 }}>
        <strong>What's in the refs:</strong>
        <ul style={{ margin: '0.3rem 0 0', paddingLeft: '1.2rem' }}>
          <li><code>intervalRef.current</code> = {intervalRef.current === null ? 'null (not running)' : `interval ID ${intervalRef.current}`}</li>
          <li><code>elapsedRef.current</code> = {elapsedRef.current} ms (latest value, updated by useEffect)</li>
        </ul>
      </div>

      <details style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#555' }}>
        <summary>The stale-closure problem this solves</summary>
        <p style={{ marginTop: '0.4rem' }}>
          If the interval callback captured <code>elapsed</code> directly from the
          outer scope, it would always see the value from when the interval was created
          (a "stale closure"). Using <code>setElapsed(e =&gt; e + 10)</code> (functional
          update) or reading <code>elapsedRef.current</code> always gives you the latest
          value — the ref is mutable and shared, so it's never stale.
        </p>
      </details>
    </div>
  );
}
