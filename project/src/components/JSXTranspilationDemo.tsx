/**
 * JSX Transpilation Demonstration
 * 
 * This component shows how JSX is transpiled to JavaScript.
 * JSX is syntactic sugar for React.createElement() calls.
 * 
 * Build tools like Vite (using esbuild/Babel) transform JSX to plain JavaScript.
 */

import { useState } from 'react';

export function JSXTranspilationDemo() {
  const [activeTab, setActiveTab] = useState<'jsx' | 'transpiled'>('jsx');

  return (
    <div className="transpilation-demo">
      <h2>JSX Transpilation Examples</h2>
      
      <div className="tab-buttons">
        <button 
          className={activeTab === 'jsx' ? 'active' : ''}
          onClick={() => setActiveTab('jsx')}
        >
          JSX Code
        </button>
        <button 
          className={activeTab === 'transpiled' ? 'active' : ''}
          onClick={() => setActiveTab('transpiled')}
        >
          Transpiled JavaScript
        </button>
      </div>

      <div className="examples">
        {/* Example 1: Simple Element */}
        <div className="example">
          <h3>Example 1: Simple Element</h3>
          {activeTab === 'jsx' ? (
            <pre><code>{`// JSX:
<div>Hello World</div>`}</code></pre>
          ) : (
            <pre><code>{`// Transpiled JavaScript:
React.createElement('div', null, 'Hello World')`}</code></pre>
          )}
        </div>

        {/* Example 2: Element with Props */}
        <div className="example">
          <h3>Example 2: Element with Props</h3>
          {activeTab === 'jsx' ? (
            <pre><code>{`// JSX:
<div className="container" id="main">
  Content
</div>`}</code></pre>
          ) : (
            <pre><code>{`// Transpiled JavaScript:
React.createElement(
  'div',
  { className: 'container', id: 'main' },
  'Content'
)`}</code></pre>
          )}
        </div>

        {/* Example 3: Nested Elements */}
        <div className="example">
          <h3>Example 3: Nested Elements</h3>
          {activeTab === 'jsx' ? (
            <pre><code>{`// JSX:
<div>
  <h1>Title</h1>
  <p>Paragraph</p>
</div>`}</code></pre>
          ) : (
            <pre><code>{`// Transpiled JavaScript:
React.createElement(
  'div',
  null,
  React.createElement('h1', null, 'Title'),
  React.createElement('p', null, 'Paragraph')
)`}</code></pre>
          )}
        </div>

        {/* Example 4: Component with Props */}
        <div className="example">
          <h3>Example 4: Component with Props and Children</h3>
          {activeTab === 'jsx' ? (
            <pre><code>{`// JSX:
<CustomButton 
  color="blue" 
  onClick={handleClick}
>
  Click me
</CustomButton>`}</code></pre>
          ) : (
            <pre><code>{`// Transpiled JavaScript:
React.createElement(
  CustomButton,
  { 
    color: 'blue', 
    onClick: handleClick 
  },
  'Click me'
)`}</code></pre>
          )}
        </div>

        {/* Example 5: Expression Interpolation */}
        <div className="example">
          <h3>Example 5: Expression Interpolation</h3>
          {activeTab === 'jsx' ? (
            <pre><code>{`// JSX:
const name = "Alice";
<div>Hello, {name}!</div>`}</code></pre>
          ) : (
            <pre><code>{`// Transpiled JavaScript:
const name = "Alice";
React.createElement(
  'div',
  null,
  'Hello, ',
  name,
  '!'
)`}</code></pre>
          )}
        </div>

        {/* Example 6: Self-Closing Tags */}
        <div className="example">
          <h3>Example 6: Self-Closing Tags</h3>
          {activeTab === 'jsx' ? (
            <pre><code>{`// JSX:
<input type="text" />
<img src="photo.jpg" alt="Photo" />`}</code></pre>
          ) : (
            <pre><code>{`// Transpiled JavaScript:
React.createElement('input', { type: 'text' })
React.createElement('img', { 
  src: 'photo.jpg', 
  alt: 'Photo' 
})`}</code></pre>
          )}
        </div>

        {/* Example 7: Fragments */}
        <div className="example">
          <h3>Example 7: Fragments</h3>
          {activeTab === 'jsx' ? (
            <pre><code>{`// JSX:
<>
  <div>First</div>
  <div>Second</div>
</>`}</code></pre>
          ) : (
            <pre><code>{`// Transpiled JavaScript:
React.createElement(
  React.Fragment,
  null,
  React.createElement('div', null, 'First'),
  React.createElement('div', null, 'Second')
)`}</code></pre>
          )}
        </div>
      </div>

      <div className="info-section">
        <h3>How Transpilation Works</h3>
        <ul>
          <li>
            <strong>Build Step:</strong> Vite uses esbuild to transform JSX to JavaScript during development and build
          </li>
          <li>
            <strong>React.createElement():</strong> Each JSX element becomes a function call
          </li>
          <li>
            <strong>Arguments:</strong>
            <ol>
              <li>Element type (string for HTML tags, function/class for components)</li>
              <li>Props object (null if no props)</li>
              <li>Children (can be multiple arguments)</li>
            </ol>
          </li>
          <li>
            <strong>Runtime:</strong> React.createElement returns a React element (plain JavaScript object)
          </li>
          <li>
            <strong>Virtual DOM:</strong> These objects are used to build and update the virtual DOM
          </li>
        </ul>
      </div>

      <div className="live-demo">
        <h3>Live Example</h3>
        <p>This component itself uses JSX. Inspect the source to see the JSX code!</p>
        <DemoComponent name="React Learner" />
      </div>
    </div>
  );
}

// Simple component for demonstration
function DemoComponent({ name }: { name: string }) {
  return (
    <div className="demo-component">
      <p>Welcome, <strong>{name}</strong>!</p>
      <p>This component was created using JSX and transpiled to JavaScript.</p>
    </div>
  );
}
