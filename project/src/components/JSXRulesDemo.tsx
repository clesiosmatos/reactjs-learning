/**
 * JSX Rules and Gotchas
 * 
 * This component demonstrates important JSX rules and common pitfalls
 */

export function JSXRulesDemo() {
  return (
    <div className="jsx-rules-demo">
      <h2>JSX Rules & Best Practices</h2>

      <div className="rule-section">
        <h3>1. Single Root Element</h3>
        <div className="explanation">
          <p>✅ Valid: JSX must return a single root element</p>
          <pre><code>{`// Good
return (
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
);

// Also good - using Fragment
return (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
);`}</code></pre>
          
          <p>❌ Invalid: Multiple root elements</p>
          <pre><code>{`// Bad - won't compile
return (
  <h1>Title</h1>
  <p>Content</p>
);`}</code></pre>
        </div>
      </div>

      <div className="rule-section">
        <h3>2. Close All Tags</h3>
        <div className="explanation">
          <p>All tags must be properly closed, including self-closing tags</p>
          <pre><code>{`// ✅ Correct
<img src="photo.jpg" />
<input type="text" />
<br />

// ❌ Wrong (HTML-style)
<img src="photo.jpg">
<input type="text">
<br>`}</code></pre>
        </div>
      </div>

      <div className="rule-section">
        <h3>3. camelCase Attributes</h3>
        <div className="explanation">
          <p>HTML attributes use camelCase in JSX</p>
          <pre><code>{`// ✅ Correct JSX attributes
<div className="container">
<label htmlFor="input-id">
<button onClick={handler}>
<div tabIndex={0}>
<svg viewBox="0 0 100 100">

// ❌ Wrong (HTML-style)
<div class="container">
<label for="input-id">
<button onclick={handler}>
<div tabindex={0}>
<svg viewbox="0 0 100 100">`}</code></pre>
        </div>
      </div>

      <div className="rule-section">
        <h3>4. Inline Styles as Objects</h3>
        <div className="explanation">
          <p>Inline styles must be JavaScript objects with camelCase properties</p>
          <pre><code>{`// ✅ Correct
<div style={{ 
  backgroundColor: 'blue',
  fontSize: '16px',
  marginTop: '10px'
}}>

// ❌ Wrong
<div style="background-color: blue; font-size: 16px;">`}</code></pre>
        </div>
      </div>

      <div className="rule-section">
        <h3>5. JavaScript Expressions in Braces</h3>
        <div className="explanation">
          <pre><code>{`// ✅ Use curly braces for JavaScript
<div>{variableName}</div>
<div>{2 + 2}</div>
<div>{condition ? 'Yes' : 'No'}</div>
<div>{array.map(item => <li key={item.id}>{item.name}</li>)}</div>

// ❌ Wrong - trying to use JS without braces
<div>variableName</div>
<div>2 + 2</div>`}</code></pre>
        </div>
      </div>

      <div className="rule-section">
        <h3>6. Reserved Words</h3>
        <div className="explanation">
          <p>Some HTML attributes are reserved JavaScript keywords</p>
          <pre><code>{`// ✅ Use JSX alternatives
className (not class)
htmlFor (not for)

// Example:
<div className="container">
  <label htmlFor="username">Username</label>
  <input id="username" />
</div>`}</code></pre>
        </div>
      </div>

      <div className="rule-section">
        <h3>7. Boolean Attributes</h3>
        <div className="explanation">
          <pre><code>{`// ✅ Correct ways to set boolean attributes
<input disabled />
<input disabled={true} />
<input disabled={someCondition} />

// To set to false (attribute absent):
<input disabled={false} />

// ❌ Wrong
<input disabled="true" />
<input disabled="disabled" />`}</code></pre>
        </div>
      </div>

      <div className="rule-section">
        <h3>8. Comments in JSX</h3>
        <div className="explanation">
          <pre><code>{`return (
  <div>
    {/* This is a comment in JSX */}
    {/* 
      Multi-line comment
      in JSX
    */}
    <h1>Content</h1>
    
    {/* ❌ Wrong - won't work:
      // This doesn't work
      /* Neither does this */
    }
  </div>
);`}</code></pre>
        </div>
      </div>

      <div className="rule-section">
        <h3>9. Special Characters</h3>
        <div className="explanation">
          <pre><code>{`// ✅ For special characters, use:
// - JavaScript strings in {}
// - HTML entities
// - Unicode

<div>{"<"} Less than</div>
<div>&lt; Less than</div>
<div>{"\u00A9"} Copyright</div>
<div>&copy; Copyright</div>`}</code></pre>
        </div>
      </div>

      <div className="rule-section">
        <h3>10. Keys in Lists</h3>
        <div className="explanation">
          <pre><code>{`// ✅ Use stable, unique keys
items.map(item => (
  <li key={item.id}>{item.name}</li>
))

// ⚠️ Avoid index as key (unless list is static)
items.map((item, index) => (
  <li key={index}>{item.name}</li>
))

// ❌ Never omit keys in lists
items.map(item => (
  <li>{item.name}</li>  // Warning!
))`}</code></pre>
        </div>
      </div>
    </div>
  );
}
