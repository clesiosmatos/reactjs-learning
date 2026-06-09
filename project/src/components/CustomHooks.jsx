import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useLocalStorage } from '../hooks/useLocalStorage';

// --- Demo 1: useFetch ---
// Shows the same data-fetching logic reused across two independent components
// without copy-pasting useEffect + useState in each one.

function UserCard({ userId }) {
  const { data: user, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  if (loading) return <p>Loading user {userId}…</p>;
  if (error)   return <p style={{ color: 'red' }}>Error: {error}</p>;
  return (
    <div style={{ marginBottom: '0.5rem' }}>
      <strong>{user.name}</strong> — {user.email}
    </div>
  );
}

function PostCard({ postId }) {
  const { data: post, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  if (loading) return <p>Loading post {postId}…</p>;
  if (error)   return <p style={{ color: 'red' }}>Error: {error}</p>;
  return (
    <div style={{ marginBottom: '0.5rem' }}>
      <strong>{post.title}</strong>
      <p style={{ margin: '0.2rem 0 0', color: '#555', fontSize: '0.88rem' }}>
        {post.body.slice(0, 80)}…
      </p>
    </div>
  );
}

export function UseFetchDemo() {
  const [userId, setUserId] = useState(1);
  const [postId, setPostId] = useState(1);

  return (
    <div>
      <p>
        <code>useFetch</code> encapsulates the <code>useState</code> +{' '}
        <code>useEffect</code> data-fetching pattern once. Both components below
        reuse the same hook — no duplication.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label>
            User ID:{' '}
            <select value={userId} onChange={e => setUserId(Number(e.target.value))}>
              {[1, 2, 3].map(n => <option key={n}>{n}</option>)}
            </select>
          </label>
          <div style={{ marginTop: '0.5rem' }}>
            <UserCard userId={userId} />
          </div>
        </div>

        <div>
          <label>
            Post ID:{' '}
            <select value={postId} onChange={e => setPostId(Number(e.target.value))}>
              {[1, 2, 3].map(n => <option key={n}>{n}</option>)}
            </select>
          </label>
          <div style={{ marginTop: '0.5rem' }}>
            <PostCard postId={postId} />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Demo 2: useLocalStorage ---
// useState that also persists to localStorage — value survives page refresh.

export function UseLocalStorageDemo() {
  const [name, setName] = useLocalStorage('lesson9_name', '');
  const [count, setCount] = useLocalStorage('lesson9_count', 0);

  return (
    <div>
      <p>
        <code>useLocalStorage</code> is a drop-in replacement for{' '}
        <code>useState</code> that also persists the value. Reload the page —
        both values survive.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 320 }}>
        <label>
          Persisted name:{' '}
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Type something…"
            style={{ marginLeft: '0.3rem', padding: '0.2rem 0.4rem' }}
          />
        </label>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Persisted count: <strong>{count}</strong></span>
          <button onClick={() => setCount(c => c + 1)}>+1</button>
          <button onClick={() => setCount(0)}>Reset</button>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>
          Stored keys: <code>lesson9_name</code>, <code>lesson9_count</code>
        </p>
      </div>
    </div>
  );
}
