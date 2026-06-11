/**
 * JSX Syntax Demonstration
 * 
 * This component demonstrates various JSX syntax features:
 * - Embedding expressions with {}
 * - Self-closing tags
 * - Nested elements
 * - Attributes (className, htmlFor, etc.)
 * - Conditional rendering
 * - Lists and keys
 * - Inline styles
 * - Event handlers
 */

import { useState } from 'react';

export function JSXSyntaxDemo() {
  const [showDetails, setShowDetails] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // JavaScript expressions can be embedded in JSX
  const userName = "React Developer";
  const currentTime = new Date().toLocaleTimeString();
  
  // Arrays for list rendering
  const fruits = ['Apple', 'Banana', 'Orange', 'Grape'];
  
  // Object for inline styles (camelCase properties)
  const headingStyle = {
    color: '#61dafb',
    fontSize: '24px',
    marginBottom: '20px'
  };

  return (
    <div className="jsx-demo">
      {/* 1. Embedding JavaScript Expressions */}
      <h2 style={headingStyle}>Hello, {userName}!</h2>
      <p>Current time: {currentTime}</p>
      <p>Calculation: 2 + 2 = {2 + 2}</p>
      
      {/* 2. Self-closing tags (must be closed in JSX) */}
      <hr />
      <img 
        src="https://via.placeholder.com/150" 
        alt="Placeholder" 
        style={{ borderRadius: '8px' }}
      />
      <br />
      
      {/* 3. HTML attributes in camelCase */}
      <div className="form-section">
        <label htmlFor="demo-input">Enter something:</label>
        <input 
          id="demo-input"
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type here..."
        />
        {inputValue && <p>You typed: <strong>{inputValue}</strong></p>}
      </div>
      
      {/* 4. Conditional Rendering */}
      <div className="conditional-section">
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Hide' : 'Show'} Details
        </button>
        
        {/* Ternary operator */}
        {showDetails ? (
          <div className="details">
            <h3>Details Section</h3>
            <p>This content is conditionally rendered using a ternary operator.</p>
          </div>
        ) : (
          <p>Click the button to see more details</p>
        )}
        
        {/* Logical AND (&&) operator */}
        {showDetails && (
          <p style={{ color: 'green' }}>
            ✓ Details are currently visible
          </p>
        )}
      </div>
      
      {/* 5. Lists and Keys */}
      <div className="list-section">
        <h3>Fruit List (with keys):</h3>
        <ul>
          {fruits.map((fruit, index) => (
            <li key={index}>
              {fruit} - Index: {index}
            </li>
          ))}
        </ul>
      </div>
      
      {/* 6. Comments in JSX */}
      {/* This is a JSX comment - it must be inside braces */}
      
      {/* 7. Fragments - group elements without adding extra DOM nodes */}
      <>
        <p>This is inside a fragment</p>
        <p>Fragments don't create extra DOM elements</p>
      </>
      
      {/* 8. Event Handlers */}
      <div className="event-section">
        <button onClick={() => alert('Button clicked!')}>
          Click me (inline handler)
        </button>
        <button onClick={handleCustomClick}>
          Custom handler
        </button>
      </div>
    </div>
  );
  
  // Event handler function
  function handleCustomClick() {
    console.log('Custom event handler executed');
    alert('Custom event handler!');
  }
}
