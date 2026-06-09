import ClassName from './components/ClassName'
import SelfClosingTags from './components/SelfClosingTags'
import Expressions from './components/Expressions'
import ConditionalRendering from './components/ConditionalRendering'
import ListRendering from './components/ListRendering'
import FragmentsDemo from './components/FragmentsDemo'
import { UseFetchDemo, UseLocalStorageDemo } from './components/CustomHooks'
import { CounterDemo, SignupFormDemo, ShoppingCartDemo } from './components/UseReducer'
import { UseMemoDemo, UseCallbackDemo } from './components/UseMemoCallback'
import './App.css'

function App() {
  return (
    <div className="app">
      <h1>Lesson 11 — useMemo / useCallback / React.memo</h1>

      <Section title="useMemo — cache an expensive computed value">
        <UseMemoDemo />
      </Section>

      <Section title="useCallback + React.memo — stable function references">
        <UseCallbackDemo />
      </Section>

      <hr style={{ margin: '2rem 0', borderColor: '#ddd' }} />
      <h1 style={{ fontSize: '1.2rem', color: '#888' }}>Lesson 10 — useReducer (prior)</h1>

      <Section title="1. Basic mechanics — reducer, dispatch, action">
        <CounterDemo />
      </Section>

      <Section title="2. Signup form — atomic state transitions">
        <SignupFormDemo />
      </Section>

      <Section title="3. Shopping cart — business logic in one place">
        <ShoppingCartDemo />
      </Section>

      <hr style={{ margin: '2rem 0', borderColor: '#ddd' }} />
      <h1 style={{ fontSize: '1.2rem', color: '#888' }}>Lesson 9 — Custom Hooks (prior)</h1>

      <Section title="useFetch — reusable data-fetching hook">
        <UseFetchDemo />
      </Section>

      <Section title="useLocalStorage — useState that survives page refresh">
        <UseLocalStorageDemo />
      </Section>

      <hr style={{ margin: '2rem 0', borderColor: '#ddd' }} />
      <h1 style={{ fontSize: '1.2rem', color: '#888' }}>Lesson 2 — JSX Fundamentals (prior)</h1>

      <Section title="1. className instead of class">
        <ClassName />
      </Section>

      <Section title="2. Self-closing tags">
        <SelfClosingTags />
      </Section>

      <Section title="3. JavaScript expressions with {}">
        <Expressions />
      </Section>

      <Section title="4. Conditional rendering">
        <ConditionalRendering />
      </Section>

      <Section title="5. List rendering (map + key)">
        <ListRendering />
      </Section>

      <Section title="6. Fragments — no extra wrapper div">
        <FragmentsDemo />
      </Section>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section className="section">
      <h2>{title}</h2>
      <div className="demo">{children}</div>
    </section>
  )
}

export default App
