// JSX rule: use className, not class (class is a reserved word in JS)
export default function ClassName() {
  return (
    <div>
      {/* JSX comments use this syntax — curly braces wrapping a block comment */}
      <p className="highlight">
        This paragraph uses <code>className="highlight"</code> — not <code>class</code>.
      </p>
      <p>
        In HTML you would write <code>class="highlight"</code>, but since JSX compiles to
        JavaScript, <code>class</code> would clash with the JS <code>class</code> keyword.
      </p>
    </div>
  )
}
