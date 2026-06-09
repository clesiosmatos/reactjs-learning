// A component must return a single root element.
// Fragment (<> </>) lets you group elements without adding a real DOM node.
export default function FragmentsDemo() {
  return (
    <>
      <p>
        Both paragraphs below are siblings with <strong>no wrapper div</strong> in the DOM.
        Open DevTools → Elements to confirm.
      </p>
      <p>
        This matters when the parent is a <code>&lt;table&gt;</code>, <code>&lt;ul&gt;</code>,
        or any context where an extra <code>&lt;div&gt;</code> would break the HTML structure.
      </p>
      {/* Long-form syntax: <React.Fragment key={...}> — needed when you must pass a key */}
    </>
  )
}
