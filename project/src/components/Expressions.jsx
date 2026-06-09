// {} lets you embed any JS expression inside JSX
const user = { name: 'Alice', role: 'Engineer' }
const price = 49.9
const items = ['React', 'Vite', 'JSX']

export default function Expressions() {
  const now = new Date().toLocaleTimeString()

  return (
    <div>
      {/* Variables */}
      <p>User: <strong>{user.name}</strong> — {user.role}</p>

      {/* Arithmetic */}
      <p>Price with 10% tax: <strong>${(price * 1.1).toFixed(2)}</strong></p>

      {/* Function call */}
      <p>Current time: <strong>{now}</strong></p>

      {/* Template string */}
      <p>{`${items.length} items: ${items.join(', ')}`}</p>

      {/* Ternary — the only "if" that works inline in JSX */}
      <p>Is price over $50? <strong>{price > 50 ? 'Yes' : 'No'}</strong></p>
    </div>
  )
}
