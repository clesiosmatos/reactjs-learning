// Three patterns for showing/hiding UI based on a condition
const isLoggedIn = true
const hasNotifications = false
const role = 'admin'

export default function ConditionalRendering() {
  return (
    <div>
      {/* Pattern 1: ternary — show A or B */}
      <p>Status: {isLoggedIn ? '✅ Logged in' : '❌ Logged out'}</p>

      {/* Pattern 2: && short-circuit — show or show nothing */}
      {hasNotifications && <p>🔔 You have new notifications</p>}
      {!hasNotifications && <p>No new notifications</p>}

      {/* Pattern 3: function / variable — for complex branches */}
      <p>Role badge: {getRoleBadge(role)}</p>
    </div>
  )
}

function getRoleBadge(role) {
  if (role === 'admin') return <span className="badge badge-admin">Admin</span>
  if (role === 'editor') return <span className="badge badge-editor">Editor</span>
  return <span className="badge">Viewer</span>
}
