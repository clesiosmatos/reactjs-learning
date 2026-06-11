import { useState } from 'react'
import { JSXSyntaxDemo } from './components/JSXSyntaxDemo'
import { JSXTranspilationDemo } from './components/JSXTranspilationDemo'
import { JSXRulesDemo } from './components/JSXRulesDemo'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [activeDemo, setActiveDemo] = useState<'syntax' | 'transpilation' | 'rules'>('syntax')

  return (
    <div className="app">
      <header className="app-header">
        <img src={reactLogo} className="react-logo" alt="React logo" />
        <h1>React JSX & Transpilation Demo</h1>
        <p className="subtitle">Understanding Core Concepts: JSX Syntax and Transpilation</p>
      </header>

      <nav className="demo-nav">
        <button 
          className={activeDemo === 'syntax' ? 'active' : ''}
          onClick={() => setActiveDemo('syntax')}
        >
          JSX Syntax
        </button>
        <button 
          className={activeDemo === 'transpilation' ? 'active' : ''}
          onClick={() => setActiveDemo('transpilation')}
        >
          Transpilation
        </button>
        <button 
          className={activeDemo === 'rules' ? 'active' : ''}
          onClick={() => setActiveDemo('rules')}
        >
          Rules & Best Practices
        </button>
      </nav>

      <main className="demo-content">
        {activeDemo === 'syntax' && <JSXSyntaxDemo />}
        {activeDemo === 'transpilation' && <JSXTranspilationDemo />}
        {activeDemo === 'rules' && <JSXRulesDemo />}
      </main>

      <footer className="app-footer">
        <p>Built with React + TypeScript + Vite</p>
        <p>Edit components in <code>src/components/</code> to see changes</p>
      </footer>
    </div>
  )
}

export default App

